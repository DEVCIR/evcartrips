"use client"

import { useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LeafletMap() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mapRef = useRef(null)
  const routeLayerRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    let mounted = true

    const initMap = async () => {
      try {
        // Dynamic imports to prevent SSR issues
        const L = (await import("leaflet")).default
        await import("leaflet/dist/leaflet.css")

        // Import marker images
        const markerIcon = (await import("leaflet/dist/images/marker-icon.png")).default
        const markerShadow = (await import("leaflet/dist/images/marker-shadow.png")).default

        if (!mounted || !mapRef.current) return

        // Fix for default marker icons
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          iconUrl: markerIcon.src || markerIcon,
          shadowUrl: markerShadow.src || markerShadow,
        })

        // Define DefaultIcon after L is available
        const DefaultIcon = L.icon({
          iconUrl: markerIcon.src || markerIcon,
          shadowUrl: markerShadow.src || markerShadow,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })

        // Initialize map
        const map = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
        }).setView([51.505, -0.09], 5)

        mapInstanceRef.current = map

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map)

        // Create a layer group for the route
        routeLayerRef.current = L.layerGroup().addTo(map)

        // Get data from URL parameters
        const from = searchParams.get("from")
        const to = searchParams.get("to")
        const stops = []

        // Collect all stops from parameters
        let i = 1
        while (searchParams.get(`stop${i}`)) {
          stops.push(searchParams.get(`stop${i}`))
          i++
        }

        // Function to geocode locations
        const geocodeLocation = async (location) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
            )
            const data = await response.json()
            if (data.length > 0) {
              return [Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon)]
            }
            return null
          } catch (error) {
            console.error("Geocoding error:", error)
            return null
          }
        }

        // Plot route with stops
        const plotRoute = async () => {
          if (!mounted) return

          const locations = [from, ...stops, to].filter(Boolean)
          const coordinates = []

          // Geocode all locations
          for (const location of locations) {
            if (!mounted) return
            const coords = await geocodeLocation(location)
            if (coords) {
              coordinates.push(coords)
            }
          }

          if (!mounted || !routeLayerRef.current) return

          // Add markers for each location
          coordinates.forEach((coord, index) => {
            const marker = L.marker(coord, {
              icon: DefaultIcon,
              riseOnHover: true,
            }).addTo(routeLayerRef.current)

            let popupText = ""
            if (index === 0) {
              popupText = `Start: ${from?.split(",")[0] || "Start"}`
            } else if (index === coordinates.length - 1) {
              popupText = `Destination: ${to?.split(",")[0] || "Destination"}`
            } else {
              popupText = `Stop ${index}: ${stops[index - 1]?.split(",")[0]}`
            }

            marker.bindPopup(popupText)
          })

          // Draw lines between points
          if (coordinates.length > 1) {
            L.polyline(coordinates, {
              color: "#F96C41",
              weight: 4,
              opacity: 0.9,
              dashArray: "5, 5",
              lineCap: "round",
            }).addTo(routeLayerRef.current)
          }

          // Fit map to show all markers with padding
          if (coordinates.length > 0 && mounted) {
            const bounds = L.latLngBounds(coordinates)
            map.fitBounds(bounds, { padding: [50, 50] })
          }
        }

        await plotRoute()
      } catch (error) {
        console.error("Map initialization failed:", error)
      }
    }

    initMap()

    // Cleanup function
    return () => {
      mounted = false
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [searchParams])

  const handleViewFullMap = () => {
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const stops = []

    let i = 1
    while (searchParams.get(`stop${i}`)) {
      stops.push(searchParams.get(`stop${i}`))
      i++
    }

    const params = new URLSearchParams()
    if (from) params.set("from", from)
    if (to) params.set("to", to)

    // Add all stops
    stops.forEach((stop, index) => {
      params.set(`stop${index + 1}`, stop)
    })

    // Add other parameters if needed
    const otherParams = ["maxDistance", "autonomy", "needHotel", "travellers", "startDate"]
    otherParams.forEach((param) => {
      const value = searchParams.get(param)
      if (value) params.set(param, value)
    })

    router.push(`/fullmap?${params.toString()}`)
  }

  return (
    <div className="mt-0">
      <div className="relative bg-white max-md:rounded-2xl overflow-hidden shadow-lg">
        <div ref={mapRef} className="relative h-56 sm:h-64 md:h-72 xl:h-[540px]">
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-100 to-blue-200 opacity-30 pointer-events-none"></div>

          {/* View Full Map button */}
          <button
            className="absolute top-3 right-3 cursor-pointer bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 px-6 py-3 rounded-lg shadow-md z-[1000]"
            onClick={handleViewFullMap}
          >
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19S2 15.194 2 10.5 5.806 2 10.5 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700">VIEW FULL MAP</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
