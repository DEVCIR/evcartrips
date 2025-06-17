"use client"

import dynamic from "next/dynamic"
import Navbar1 from "../common_components/navbar1/page"
import CarDiv from "../common_components/cardiv/page"
import Navbar from "../common_components/navbar/page"
import { Edit } from "lucide-react"
import Rentals from "../common_components/rentals/page"
import { useSearchParams } from "next/navigation"
import React, { Suspense } from "react"

export default function PageWrapper() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <Page />
    </Suspense>
  )
}

// Dynamically import MapComplete with SSR disabled
const MapComplete = dynamic(() => import("../common_components/mapcomplete/page"), {
  ssr: false,
  loading: () => (
    <div className="h-[55rem] sm:h-[40rem] md:h-[85rem] lg:h-[56rem] xl:h-[146rem] bg-gray-200 animate-pulse rounded-2xl" />
  ),
})

function Page() {
  const searchParams = useSearchParams()

  // Get data from URL parameters
  const from = searchParams.get("from") || "Barcelona"
  const to = searchParams.get("to") || "Kiel"
  const stops = []

  // Collect all stops from parameters
  let i = 1
  while (searchParams.get(`stop${i}`)) {
    stops.push(searchParams.get(`stop${i}`))
    i++
  }

  // Format city names (remove country if exists)
  const formatCityName = (location) => location?.split(",")[0]?.trim() || location

  return (
    <div className="min-h-screen bg-white" data-aos="fade-in">
      {/* Header Section */}
      <div className="bg-black px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 pt-4 pb-12 sm:pb-16 min-h-[54vh] md:min-h-[40vh] flex flex-col justify-start rounded-b-[24px] sm:rounded-b-[32px] md:rounded-none">
        <div className="xl:hidden">
          <Navbar1 />
        </div>
        <div className="max-xl:hidden">
          <Navbar />
        </div>

        <div className="mt-2 max-xl:leading-4 xl:mt-16 px-4 max-w-[80%]">
          <h2
            className="text-gray-400 text-[10px] font-medium md:font-bold md:text-[16px] xl:text-[29px] mb-4 md:-tracking-[0.69px] xl:-tracking-[1.19px]"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            TRIP INFO
          </h2>

          {/* Dynamic Route Display */}
          <div
            className="flex items-center gap-1 sm:gap-2 md:gap-5 xl:gap-10 flex-wrap"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold xl:-tracking-[1.43px] whitespace-nowrap">
              {formatCityName(from)}
            </span>

            {stops.length > 0 ? (
              stops.map((stop, index) => (
                <React.Fragment key={index}>
                  <ArrowIcon />
                  <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold xl:-tracking-[1.43px] whitespace-nowrap">
                    {formatCityName(stop)}
                  </span>
                </React.Fragment>
              ))
            ) : (
              <ArrowIcon />
            )}

            <ArrowIcon />
            <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold xl:-tracking-[1.43px] whitespace-nowrap">
              {formatCityName(to)}
            </span>
          </div>

          <div
            className="max-md:hidden absolute right-28 top-32 xl:right-36 xl:top-52 bg-[#323232] rounded-md w-[49px] h-[46px] xl:w-[80px] xl:h-[75px]"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <Edit className="w-5 h-5 xl:w-8 xl:h-8 z-10 text-[#F96C41] mx-auto my-3 xl:my-5" />
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="max-md:px-8 max-md:-mt-32 pb-8">
        <div className="max-w-full mx-auto" data-aos="zoom-in" data-aos-delay="400">
          <MapComplete from={from} to={to} stops={stops} />
        </div>
      </div>

      {/* Other Sections */}
      <div className="px-8 mt-4 pb-8 xl:px-32" data-aos="fade-up" data-aos-delay="700">
        <CarDiv />
      </div>

      <div className="px-8 mt-4 pb-8 xl:px-32 max-md:hidden" data-aos="fade-up" data-aos-delay="800">
        <Rentals />
      </div>
    </div>
  )
}

// Reusable Arrow Icon Component
const ArrowIcon = () => (
  <svg
    viewBox="0 0 22 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0 w-[20px] h-[21px] md:w-[36px] md:h-[36px] xl:w-[62px] xl:h-[62px]"
  >
    <path
      d="M14.8959 15.9673L20.2291 11.0209L14.8959 6.07446L13.7599 7.29652L16.8768 10.1871H1.64035V11.8547H16.8768L13.7599 14.7455L14.8959 15.9673Z"
      fill="white"
      fillOpacity="0.5"
    />
  </svg>
)
