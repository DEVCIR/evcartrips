"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDmeFbM5UZEg91Nt6GSLbsLAOdP11RYDlk";

export default function MapCompleteGoogleMaps({ from, to, stops }) {
  const mapRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [directions, setDirections] = useState(null);
  const [routeInfo, setRouteInfo] = useState({ distance: "", duration: "" });

  // Load Google Maps script
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Calculate directions
  useEffect(() => {
    if (!isLoaded || !from || !to) return;

    const timerId = setTimeout(() => {
      const google = window.google;
      const DirectionsService = new google.maps.DirectionsService();
      const waypoints = stops
        .filter(Boolean)
        .map((stop) => ({ location: stop, stopover: true }));
      DirectionsService.route(
        {
          origin: from,
          destination: to,
          waypoints: waypoints,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            if (result.routes[0] && result.routes[0].legs[0]) {
              let totalDistance = 0;
              let totalDuration = 0;
              result.routes[0].legs.forEach((leg) => {
                totalDistance += leg.distance.value;
                totalDuration += leg.duration.value;
              });
              const newDistance = (totalDistance / 1000).toFixed(1) + " km";
              const hours = Math.floor(totalDuration / 3600);
              const minutes = Math.round((totalDuration % 3600) / 60);
              const newDuration =
                (hours > 0 ? hours + " hr " : "") +
                (minutes > 0 ? minutes + " min" : "");

              setRouteInfo({ distance: newDistance, duration: newDuration });
            }
          } else {
            setDirections(null);
            setRouteInfo({ distance: "", duration: "" });
          }
        }
      );
    }, 300);

    return () => clearTimeout(timerId);
  }, [isLoaded, from, to, stops]);

  const handleContinue = () => {
    // Create URLSearchParams to preserve all current parameters
    const params = new URLSearchParams(searchParams.toString());
    router.push(`/recommendedHotels?${params.toString()}`);
  };

  const handleMinimizeMap = () => {
    const params = new URLSearchParams();
    params.set("from", from || "");
    params.set("to", to || "");

    // Add all stops
    stops.forEach((stop, index) => {
      params.set(`stop${index + 1}`, stop);
    });

    // Add other parameters from URL
    const otherParams = [
      "maxDistance",
      "autonomy",
      "needHotel",
      "travellers",
      "startDate",
    ];
    otherParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) params.set(param, value);
    });

    router.push(`/rentbio?${params.toString()}`);
  };

  return (
    <div className="mt-0">
      <div className="relative bg-white max-md:rounded-2xl shadow-lg overflow-hidden">
        <div className="relative h-[55rem] sm:h-[40rem] md:h-[85rem] lg:h-[56rem] xl:h-[146rem]">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              center={{ lat: 25.276987, lng: 55.296249 }} // Dubai fallback
              zoom={7}
              onLoad={(map) => {
                mapRef.current = map;
              }}
              options={{
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                scrollwheel: true,
                draggable: true,
                gestureHandling: "auto",
              }}
            >
              {/* Directions route */}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    suppressMarkers: false,
                    polylineOptions: {
                      strokeColor: "#F96C41",
                      strokeWeight: 5,
                    },
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <div className="relative h-full flex items-center justify-center bg-gray-100">
              <div className="text-gray-500">Loading map...</div>
            </div>
          )}
          {/* Minimize Map Button */}
          <button
            className="absolute top-3 right-3 cursor-pointer bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 px-6 py-3 rounded-lg shadow-md z-[1000]"
            onClick={handleMinimizeMap}
          >
            <div className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 15L12 9L18 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700">
                MINIMIZE MAP
              </span>
            </div>
          </button>
        </div>
      </div>

      <div className="md:flex md:justify-center">
        <Button
          onClick={handleContinue}
          className="cursor-pointer mt-4 md:mt-8 lg:mt-12 w-full md:w-[381px] fhd:w-[650px] 2k:w-[866px] 4k:w-[1100px] btn-gradient text-white font-semibold py-3 md:py-4 fhd:py-9 2k:py-10 4k:py-20 rounded-lg fhd:rounded-xl 2k:rounded-2xl 4k:rounded-3xl h-12 md:h-14 2k:h-[110px] 4k:h-[130px] text-base md:text-lg fhd:text-3xl 2k:text-4xl 4k:text-6xl"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}