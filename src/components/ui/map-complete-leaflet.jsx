"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "../../components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDmeFbM5UZEg91Nt6GSLbsLAOdP11RYDlk";

export default function MapCompleteGoogleMaps({ from, to, stops }) {
  const mapRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [directions, setDirections] = useState(null);
  const [routeInfo, setRouteInfo] = useState({ distance: "", duration: "" });
  const [chargingStations, setChargingStations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [initialCenter, setInitialCenter] = useState({
    lat: 25.276987,
    lng: 55.296249,
  });
  // Load Google Maps script
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
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
            findPlacesAlongRoute(
              result.routes[0],
              "vehicle_charging_station",
              setChargingStations
            );
            findPlacesAlongRoute(result.routes[0], "lodging", setHotels);
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
    if(typeof window !== "undefined")
      {
        localStorage.setItem('setForm' , "false");
        localStorage.removeItem('formData');
      }
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

  const findPlacesAlongRoute = useCallback((route, type, setter) => {
    if (!route || !window.google) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const path = route.overview_path;
    const step = Math.max(1, Math.floor(path.length / 10));
    const allPlaces = [];

    for (let i = 0; i < path.length; i += step) {
      const point = path[i];

      service.nearbySearch(
        {
          location: point,
          radius: 10000,
          type: type,
        },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place) => {
              // Filter out permanently closed businesses using business_status
              if (
                place.business_status === "OPERATIONAL" &&
                place.types &&
                place.types.includes(type) &&
                !allPlaces.some((p) => p.place_id === place.place_id)
              ) {
                allPlaces.push({
                  ...place,
                  position: place.geometry.location,
                });
              }
            });

            setter((prev) => {
              const newPlaces = [...allPlaces];
              return newPlaces.filter(
                (place, index, self) =>
                  index === self.findIndex((p) => p.place_id === place.place_id)
              );
            });
          }
        }
      );
    }
  }, []);

  const purplePinSVG = (name) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 24 24">
    <path fill="#9C27B0" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    <text x="12" y="22" font-family="Arial" font-size="8" font-weight="bold" text-anchor="middle" fill="white">${name.substring(
    0,
    8
  )}</text>
  </svg>
`;

  const bluePinSVG = (name) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 24 24">
    <path fill="#4CAF50" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    <text x="12" y="22" font-family="Arial" font-size="8" font-weight="bold" text-anchor="middle" fill="white">${name.substring(
    0,
    8
  )}</text>
  </svg>
`;

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
              defaultCenter={initialCenter}
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
                restriction: {
                  latLngBounds: {
                    north: 85,
                    south: -85,
                    east: 180,
                    west: -180,
                  },
                  strictBounds: true,
                },
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

              {chargingStations.map((station, index) => (
                <Marker
                  key={`${station.place_id}_${index}`}
                  position={station.position}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      bluePinSVG(station.name)
                    )}`,
                    scaledSize: new window.google.maps.Size(40, 50),
                    anchor: new window.google.maps.Point(20, 50),
                  }}
                  title={station.name}
                >
                  
                </Marker>
              ))}

              {hotels.map((hotel, index) => (
                <Marker
                  key={`hotel_${hotel.place_id}_${index}`}
                  position={hotel.position}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      purplePinSVG(hotel.name)
                    )}`,
                    scaledSize: new window.google.maps.Size(40, 50),
                    anchor: new window.google.maps.Point(20, 50),
                  }}
                  title={`Hotel: ${hotel.name}`}
                >
                 
                </Marker>
              ))}
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

          <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-lg shadow-md z-[1000] px-4 py-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#9C27B0]"></div>
                <span className="text-xs font-medium">Hotels</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#4CAF50]"></div>
                <span className="text-xs font-medium">Charging Stations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#F96C41]"></div>
                <span className="text-xs font-medium">Route</span>
              </div>
            </div>
          </div>

          <div className="absolute left-3 mt-3" style={{ top: "94px" }}>
            <div className="bg-white bg-opacity-90 rounded-lg shadow-md z-[1000] px-4 py-3">
              <div className="flex flex-col gap-1">
                <div className="text-xs font-medium">
                  <span className="font-semibold">From:</span> {from || "-"}
                </div>
                {stops.length > 0 && (
                  <div className="flex flex-col gap-0.5">
                    {stops.map((stop, idx) => (
                      <div key={idx} className="text-xs font-medium">
                        <span className="font-semibold">Stop {idx + 1}:</span>{" "}
                        {stop}
                      </div>
                    ))}
                  </div>
                )}
                <div className="text-xs font-medium">
                  <span className="font-semibold">To:</span> {to || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex md:justify-center">
        <Button
          onClick={handleContinue}
          className="cursor-pointer mt-4 md:mt-8 lg:mt-12 w-full md:w-[381px] bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:from-[#AA3916] hover:to-[#F96C41] text-white font-semibold py-3 md:py-4 rounded-lg h-12 md:h-14 text-base md:text-lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
