"use client"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"

export default function PageWrapper() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <Iternary />
    </Suspense>
  )
}

function Iternary({
  stops = [],
  startDate,
  maxDistance = "500 KM",
  needHotel = true,
  travellers = "1 Traveller, 1 Room",
  from, // ✅ Remove default values here
  to, // ✅ Remove default values here
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // ✅ ALWAYS extract from URL first, then use props as fallback
  const actualFrom = searchParams.get("from") || from || "Barcelona"
  const actualTo = searchParams.get("to") || to || "Kiel"

  // ✅ Extract other params from URL too
  const actualStartDate = searchParams.get("startDate")
    ? new Date(searchParams.get("startDate"))
    : startDate || new Date()
  const actualMaxDistance = searchParams.get("maxDistance") || maxDistance || "500 KM"
  const actualNeedHotel = searchParams.get("needHotel") === "true" || needHotel
  const actualTravellers = searchParams.get("travellers") || travellers || "1 Traveller, 1 Room"

  // ✅ Extract stops from URL
  const actualStops = (() => {
    const urlStops = []
    let i = 1
    while (searchParams.get(`stop${i}`)) {
      urlStops.push(searchParams.get(`stop${i}`))
      i++
    }
    return urlStops.length > 0 ? urlStops : stops
  })()

  // ✅ DEBUG LOGS
  console.log("🔍 URL Parameters:", Object.fromEntries(searchParams.entries()))
  console.log("🔍 Extracted Data:", {
    actualFrom,
    actualTo,
    actualStops,
    actualStartDate,
    actualMaxDistance,
    actualNeedHotel,
    actualTravellers,
  })

  const handleContinue = () => {
    const params = new URLSearchParams(searchParams.toString())
    router.push(`/recommendedHotels?${params.toString()}`)
  }

  // Parse numeric values
  const dailyLimit = Number.parseInt(actualMaxDistance) || 500
  const [travellerCount] = actualTravellers.split(" ")

  // ✅ SAFE HELPER FUNCTION
  const getCityName = (location) => {
    if (!location) return "Unknown"
    return location.split(",")[0]?.trim() || location
  }

  // Generate itinerary days dynamically
  const generateItinerary = () => {
    const itinerary = []
    const allStops = [...actualStops]
    const currentDate = new Date(actualStartDate)

    console.log("🚀 Generating Itinerary:", {
      from: actualFrom,
      to: actualTo,
      stops: allStops,
      stopsCount: allStops.length,
    })

    // ✅ NULL CHECKS
    if (!actualFrom || !actualTo) {
      console.log("❌ Missing actual from or to:", { actualFrom, actualTo })
      return []
    }

    // ✅ EMPTY STOPS CASE - Direct route
    if (allStops.length === 0) {
      console.log("📍 No stops - creating direct route")
      itinerary.push({
        day: 1,
        date: currentDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        from: getCityName(actualFrom),
        to: getCityName(actualTo),
        distance: `${dailyLimit}KM`,
        chargingStop: `Around ${getMidpoint(actualFrom, actualTo)}`,
        ...(actualNeedHotel && generateHotelDetails(actualTo, 1)),
      })
      return itinerary
    }

    // ✅ WITH STOPS - Multi-day route
    console.log("🗺️ Creating multi-day route with", allStops.length, "stops")

    // First day: actualFrom → first stop
    allStops.forEach((stop, index) => {
      const dayNumber = index + 1
      currentDate.setDate(currentDate.getDate() + (index === 0 ? 0 : 1))

      itinerary.push({
        day: dayNumber,
        date: currentDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        from: index === 0 ? getCityName(actualFrom) : getCityName(allStops[index - 1]), // ✅ Use actualFrom
        to: getCityName(stop),
        distance: `${dailyLimit}KM`,
        chargingStop: `Around ${getMidpoint(allStops[index - 1] || actualFrom, stop)}`,
        ...(actualNeedHotel && generateHotelDetails(stop, dayNumber)),
      })
    })

    // ✅ Final day: last stop → actualTo
    if (allStops.length > 0) {
      const finalDay = allStops.length + 1
      currentDate.setDate(currentDate.getDate() + 1)

      itinerary.push({
        day: finalDay,
        date: currentDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        from: getCityName(allStops[allStops.length - 1]),
        to: getCityName(actualTo), // ✅ Use actualTo
        distance: `${dailyLimit}KM`,
        chargingStop: `Around ${getMidpoint(allStops[allStops.length - 1], actualTo)}`,
        ...(actualNeedHotel && generateHotelDetails(actualTo, finalDay)),
      })
    }

    return itinerary
  }

  // Helper functions
  const getMidpoint = (from, to) => {
    return `${getCityName(from)} → ${getCityName(to)}`
  }

  const generateHotelDetails = (location, day) => {
    return {
      hotel: {
        name: `Recommended Hotel in ${getCityName(location)}`,
        description: `Centrally located with ${travellerCount} room(s) and EV charging`,
        savings: "Gratis 25KWh/night",
      },
    }
  }

  const ArrowIcon = () => (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 sm:w-5 sm:h-5 md:w-10 md:h-10 xl:w-[69px] xl:h-[69px]"
    >
      <path
        d="M14.8959 15.8496L20.2291 10.9032L14.8959 5.95679L13.7599 7.17885L16.8768 10.0694H1.64035V11.737H16.8768L13.7599 14.6278L14.8959 15.8496Z"
        fill="#222222"
        fillOpacity="0.5"
      />
    </svg>
  )

  const itineraryData = generateItinerary()
  // console.log("✅ Final Itinerary Data:", itineraryData)

  return (
    <div className="w-full">

      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="relative">
          {itineraryData.map((item, index) => (
            <div key={item.day} className="relative">
              {/* Timeline Line */}
              <div
                className={`absolute left-4 sm:left-5 top-10 sm:top-12 w-0.5 h-[80%] z-0 ${index === 0 ? "bg-[#5AB1FF]" : "bg-[#17C19B]"}`}
              ></div>

              <div className="flex gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
                {/* Day Number Circle */}
                <div
                  className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold z-10 relative ${index === 0 ? "bg-[#5AB1FF]" : "bg-[#17C19B]"}`}
                >
                  {item.day}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Day Title with Arrow */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap max-w-[80%]">
                    <h3 className="text-base sm:text-lg md:text-3xl xl:text-[50px] font-bold text-gray-900">
                      DAY {item.day}: {item.from}
                    </h3>
                    <ArrowIcon />
                    <span className="text-base sm:text-lg md:text-3xl xl:text-[50px] font-bold text-gray-900">
                      {item.to}
                    </span>
                    <span className="text-sm sm:text-base md:text-3xl xl:text-[45px] text-gray-900 font-bold">
                      (~{item.distance})
                    </span>
                  </div>

                  {/* Trip Details */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 xl:mt-4 flex-shrink-0"></div>
                      <div className="text-[10px] sm:text-base md:text-lg xl:text-3xl">
                        <span className="font-medium text-gray-900">
                          {index === 0 ? "Departure:" : "Overnight Stay:"}
                        </span>
                        <span className="text-gray-800 ml-1 font-[400]">{item.date}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 xl:mt-4 flex-shrink-0"></div>
                      <div className="text-[10px] sm:text-base">
                        <span className="font-medium text-gray-900 md:text-lg xl:text-3xl">Midway Charging Stop:</span>
                        <span className="text-[10px] font-[400] text-gray-700 ml-1 md:text-lg xl:text-3xl">
                          {item.chargingStop}
                        </span>
                      </div>
                    </div>

                    {actualNeedHotel && (
                      <div className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 xl:mt-4 flex-shrink-0"></div>
                        <div className="text-[10px] sm:text-base md:text-lg">
                          <span className="font-medium text-gray-900 xl:text-3xl">Hotel Recommendation:</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {actualNeedHotel && item.hotel && (
                    <div className="bg-white w-[311px] md:w-[584px] xl:w-[1005px] h-auto rounded-lg px-4 py-4 sm:p-5 border-2 border-gray-200 relative">
                      <div className="absolute -top-5 right-4 md:-top-12 md:right-8 xl:right-8 xl:-top-22 w-[36px] h-[36px] md:w-[68px] md:h-[68px] xl:w-[117px] xl:h-[117px] flex items-center justify-center">
                        <img src="images/icons/discount2.png" alt="discount" className="w-full h-auto" />
                      </div>
                      <div className="flex flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-[10px] md:text-lg sm:text-base xl:text-3xl mb-1 sm:mb-2 md:mb-0">
                            {item.hotel.name}
                          </h4>
                          <p className="text-[8px] font-[400] md:text-base sm:text-sm xl:text-2xl text-gray-600 leading-relaxed">
                            {item.hotel.description}
                          </p>
                        </div>
                        <Button className="bg-[#F96C41] hover:bg-[#e55f38] cursor-pointer text-white text-xs font-medium rounded-sm flex-shrink-0 self-center w-[50px] h-[21px] md:w-24 md:h-10 xl:w-36 xl:h-[50px] md:rounded-lg">
                          <div className="flex items-center justify-center w-full gap-x-1 md:gap-x-2">
                            <h1 className="text-[6px] font-[600] md:text-[11px] xl:text-xl">More Info</h1>
                            <img
                              src="images/icons/more.png"
                              alt="MORE"
                              className="w-2 h-2 md:w-3 md:h-3 xl:w-4 xl:h-4"
                            />
                          </div>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="md:flex md:justify-center">
            <Button
              onClick={handleContinue}
              className="w-full md:w-[381px] xl:w-[656px] bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:from-[#AA3916] hover:to-[#F96C41] text-white font-semibold py-3 md:py-4 rounded-lg h-12 md:h-10 xl:h-[75px] text-base md:text-sm xl:text-lg mt-3 md:mt-0 uppercase cursor-pointer"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
