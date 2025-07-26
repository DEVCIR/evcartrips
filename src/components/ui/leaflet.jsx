"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDmeFbM5UZEg91Nt6GSLbsLAOdP11RYDlk";

const containerStyle = {
  width: "100%",
  height: "400px", // h-56
  maxWidth: "100%",
};

export default function GoogleMapsComponent({ onRouteInfoChange }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  // Get data from URL parameters
  const stops = useMemo(() => {
    const stopsArray = [];
    let i = 1;
    while (searchParams.get(`stop${i}`)) {
      stopsArray.push(searchParams.get(`stop${i}`));
      i++;
    }
    return stopsArray;
  }, [searchParams]);

  // Compose all locations
  const locations = useMemo(
    () => [from, ...stops, to].filter(Boolean),
    [from, stops, to]
  );

  // State for directions
  const [directions, setDirections] = useState(null);
  const [routeInfo, setRouteInfo] = useState({ distance: "", duration: "" });

  // Only for initial center/zoom
  const [initialCenter, setInitialCenter] = useState({
    lat: 25.276987,
    lng: 55.296249,
  }); // Dubai fallback
  const initialZoom = 12;
  const mapRef = useRef(null);

  // Load Google Maps script
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Geocode first location for initial center (only on first load)
  useEffect(() => {
    console.log("useeffect 1");

    if (!from) return;
    async function geocodeFirst() {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          from
        )}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await resp.json();
      if (data.results && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setInitialCenter({ lat, lng });
      }
    }
    geocodeFirst();
    // eslint-disable-next-line
  }, [from]);

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

  useEffect(() => {
    if (
      routeInfo.distance &&
      routeInfo.duration &&
      typeof onRouteInfoChange === "function"
    ) {
      onRouteInfoChange(routeInfo.distance, routeInfo.duration);
    }
  }, [routeInfo, onRouteInfoChange]);

  const handleViewFullMap = useCallback(() => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    stops.forEach((stop, index) => {
      params.set(`stop${index + 1}`, stop);
    });
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
    router.push(`/fullmap?${params.toString()}`);
  }, [from, to, stops, searchParams, router]);

  return (
    <div className="mt-0 ">
      <div className="relative bg-white max-md:rounded-2xl fhd:h-[600px] overflow-hidden shadow-lg">
        <div
          className="relative "
          style={{ height: `400px`, minHeight: 300, width: "100%" }}
        >
          {isLoaded ? (
            <GoogleMap
            
              mapContainerStyle={{
                ...containerStyle,
                height: `400px`,
                minHeight: 300,
                width: "100%",
              }}
              
              defaultCenter={initialCenter}
              defaultZoom={initialZoom}
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
              }
              }
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
          {/* View Full Map button */}
          <button
            className="absolute top-3 right-3 cursor-pointer bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 px-6 py-3 rounded-lg shadow-md z-[1000]"
            onClick={handleViewFullMap}
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
                  d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700">
                VIEW FULL MAP
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
