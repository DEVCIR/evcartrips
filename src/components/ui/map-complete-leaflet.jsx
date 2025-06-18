"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

export default function MapCompleteLeaflet({ from, to, stops }) {
  const mapRef = useRef(null)
  const routeLayerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleContinue = () => {
    // Create URLSearchParams to preserve all current parameters
    const params = new URLSearchParams(searchParams.toString())
    router.push(`/recommendedHotels?${params.toString()}`)
  }

  useEffect(() => {
    let mounted = true

    const initMap = async () => {
      try {
        // Dynamic imports to prevent SSR issues
        const L = (await import("leaflet")).default
        await import("leaflet/dist/leaflet.css")

        if (!mounted || !mapRef.current) return

        // Fix for default marker icons
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        })

        // Initialize map
        const map = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
          minZoom: 3,
          maxZoom: 10,
        }).setView([51.505, 10], 5)

        mapInstanceRef.current = map

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
        }).addTo(map)

        // Create layer group
        routeLayerRef.current = L.layerGroup().addTo(map)

        // Geocode function
        const geocodeLocation = async (location) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
            )
            const data = await response.json()
            return data.length > 0 ? [Number.parseFloat(data[0].lat), Number.parseFloat(data[0].lon)] : null
          } catch (error) {
            console.error("Geocoding error:", error)
            return null
          }
        }

        // Plot route
        const plotRoute = async () => {
          if (!mounted) return

          const locations = [from, ...stops, to].filter(Boolean)
          const coordinates = []

          // Get coordinates for all locations
          for (const location of locations) {
            if (!mounted) return
            const coords = await geocodeLocation(location)
            if (coords) coordinates.push(coords)
          }

          if (!mounted || !routeLayerRef.current) return

          // Add markers
          coordinates.forEach((coord, index) => {
            const isFirst = index === 0
            const isLast = index === coordinates.length - 1
            const marker = L.marker(coord).addTo(routeLayerRef.current)

            const popupText = isFirst
              ? `Start: ${from}`
              : isLast
                ? `Destination: ${to}`
                : `Stop ${index}: ${stops[index - 1]}`

            marker.bindPopup(popupText)
          })

          // Draw route line
          if (coordinates.length > 1) {
            L.polyline(coordinates, {
              color: "#F96C41",
              weight: 4,
              opacity: 0.9,
              dashArray: "5, 5",
              lineCap: "round",
            }).addTo(routeLayerRef.current)
          }

          // Fit bounds
          if (coordinates.length > 0 && mounted) {
            map.fitBounds(L.latLngBounds(coordinates), { padding: [50, 50] })
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
  }, [from, to, stops])

  const handleMinimizeMap = () => {
    const params = new URLSearchParams()
    params.set("from", from || "")
    params.set("to", to || "")

    // Add all stops
    stops.forEach((stop, index) => {
      params.set(`stop${index + 1}`, stop)
    })

    // Add other parameters from URL
    const otherParams = ["maxDistance", "autonomy", "needHotel", "travellers", "startDate"]
    otherParams.forEach((param) => {
      const value = searchParams.get(param)
      if (value) params.set(param, value)
    })

    router.push(`/rentbio?${params.toString()}`)
  }

  return (
    <div className="mt-0">
      <div className="relative bg-white max-md:rounded-2xl shadow-lg overflow-hidden">
        <div ref={mapRef} className="relative h-[55rem] sm:h-[40rem] md:h-[85rem] lg:h-[56rem] xl:h-[146rem]">
          {/* Minimize Map Button */}
          <button
            className="absolute top-3 right-3 cursor-pointer bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 px-6 py-3 rounded-lg shadow-md z-[1000]"
            onClick={handleMinimizeMap}
          >
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 15L12 9L18 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700">MINIMIZE MAP</span>
            </div>
          </button>
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
  )
}
