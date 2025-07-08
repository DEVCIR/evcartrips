"use client"

import Navbar1 from "../../common_components/navbar1/page"
import RouteOverview from "../../common_components/route_overview/page"
import Iternary from "../../common_components/iternary/page"
import CarDiv from "../../common_components/cardiv/page"
import Navbar from "../../common_components/navbar/page"
import { Edit } from "lucide-react"
import Rentals from "../../common_components/rentals/page"
import { useSearchParams,useRouter  } from "next/navigation"
import React, { Suspense , useEffect, useState} from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"

import dynamic from "next/dynamic"
import Footer from "../../components/ui/footer"
const MapComponent = dynamic(() => import("../../common_components/map/page"), {
  ssr: false,
})

export default function PageWrapper() {
  return (
    <Suspense
      fallback={
        <motion.div
          className="text-white text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Loading...
        </motion.div>
      }
    >
      <Page />
    </Suspense>
  )
}

function Page() {
  const searchParams = useSearchParams()
   const router = useRouter()
  const [routeInfo, setRouteInfo] = useState({ distance: '', duration: '' })


  // Check if required parameters exist
  useEffect(() => {
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    
    if (!from || !to) {
      router.push("/") // Redirect to home if required params are missing
    }
  }, [searchParams, router])

  // If params are missing, return null (will redirect)
  if (!searchParams.get("from") || !searchParams.get("to")) {
    return null
  }

  // Refs for scroll animations
  const mapRef = useRef(null)
  const routeOverviewRef = useRef(null)
  const iternaryRef = useRef(null)
  const carDivRef = useRef(null)
  const rentalsRef = useRef(null)
  const footerRef = useRef(null)

  // useInView hooks for scroll-triggered animations
  const isMapInView = useInView(mapRef, { once: true, amount: 0.3 })
  const isRouteOverviewInView = useInView(routeOverviewRef, { once: true, amount: 0.05, margin: "0px 0px -200px 0px" })
  const isIternaryInView = useInView(iternaryRef, { once: true, amount: 0.3 })
  const isCarDivInView = useInView(carDivRef, { once: true, amount: 0.3 })
  const isRentalsInView = useInView(rentalsRef, { once: true, amount: 0.3 })
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.3 })

  // Debug logging for Route Overview scroll animation
  // console.log("Route Overview in view:", isRouteOverviewInView)

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

  const maxDistance = searchParams.get("maxDistance") || "500 KM"
  const autonomy = searchParams.get("autonomy") || "500 KM"
  const needHotel = searchParams.get("needHotel") === "true"
  const travellers = searchParams.get("travellers") || "3 Travellers, 1 Room"
  const startDate = searchParams.get("startDate") ? new Date(searchParams.get("startDate")) : new Date()

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get just the city name (before comma if exists)
  const getCityName = (location) => {
    return location?.split(",")[0]?.trim() || location
  }

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section with Animation */}
      <motion.div
        className="bg-black px-3 sm:px-4 md:px-6 lg:px-8 xl:px-14 pt-4 pb-12 min-h-[60vh] md:min-h-[40vh] flex flex-col justify-start rounded-b-[24px] sm:rounded-b-[32px] md:rounded-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="xl:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Navbar1 />
        </motion.div>
        <motion.div
          className="max-xl:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Navbar />
        </motion.div>

        <motion.div
          className="mt-2 xl:mt-16 px-4 max-w-[80%]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h2
            className="text-gray-400 text-[10px] font-medium md:font-bold md:text-[16px] xl:text-[29px] mb-4 md:-tracking-[0.69px] xl:-tracking-[1.19px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            TRIP INFO
          </motion.h2>

          {/* Dynamic Trip Route Display */}
          <motion.div
            className="flex items-center gap-1 sm:gap-2 md:gap-5 xl:gap-10 flex-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <motion.span
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold xl:-tracking-[1.43px] whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
            >
              {getCityName(from)}
            </motion.span>

            <motion.svg
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 w-[20px] h-[21px] md:w-[36px] md:h-[36px] xl:w-[62px] xl:h-[62px]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
            >
              <path
                d="M14.8959 15.9673L20.2291 11.0209L14.8959 6.07446L13.7599 7.29652L16.8768 10.1871H1.64035V11.8547H16.8768L13.7599 14.7455L14.8959 15.9673Z"
                fill="white"
                fillOpacity="0.5"
              />
            </motion.svg>

            {stops.length > 0 && (
              stops.map((stop, index) => (
                <React.Fragment key={`stop-${index}`}>
                  <motion.span
                    className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold xl:-tracking-[1.43px] whitespace-nowrap"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6, type: "spring" }}
                  >
                    {getCityName(stop)}
                  </motion.span>

                  <motion.svg
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 w-[20px] h-[21px] md:w-[36px] md:h-[36px] xl:w-[62px] xl:h-[62px]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5, type: "spring" }}
                  >
                    <path
                      d="M14.8959 15.9673L20.2291 11.0209L14.8959 6.07446L13.7599 7.29652L16.8768 10.1871H1.64035V11.8547H16.8768L13.7599 14.7455L14.8959 15.9673Z"
                      fill="white"
                      fillOpacity="0.5"
                    />
                  </motion.svg>
                </React.Fragment>
              ))
            )}

            <motion.span
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold xl:-tracking-[1.43px] whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + stops.length * 0.1, duration: 0.6, type: "spring" }}
            >
              {getCityName(to)}
            </motion.span>
          </motion.div>

          <motion.div
            className="max-md:hidden absolute right-28 top-32 xl:right-36 xl:top-52 bg-[#323232] rounded-md w-[49px] h-[46px] xl:w-[80px] xl:h-[75px]"
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1, duration: 0.6, type: "spring" }}
          >
            <Edit className="w-5 h-5 xl:w-8 xl:h-8 z-10 text-[#F96C41] mx-auto my-3 xl:my-5" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Main Content with Scroll Animations */}
      <div className="max-md:w-[98%] mx-auto items-center justify-center">
        {/* Map Component */}
        <motion.div
          ref={mapRef}
          className="max-md:px-8 max-md:-mt-42 pb-2"
          initial={{ opacity: 0, y: 50 }}
          animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <MapComponent onRouteInfoChange={(distance, duration) => setRouteInfo({ distance, duration })} />
        </motion.div>

        {/* Route Overview Component */}
        <motion.div
          ref={routeOverviewRef}
          className="px-8 mt-4 pb-8 mx-0 xl:px-40 xl:mt-10 xl:pb-14"
          initial={{ opacity: 0, y: 150 }}
          animate={isRouteOverviewInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 150 }}
          transition={{ duration: 1, type: "spring", stiffness: 80, damping: 15 }}
        >
          <div className="">
            <RouteOverview
              from={from}
              to={to}
              stops={stops}
              startDate={startDate}
              maxDistance={maxDistance}
              autonomy={autonomy}
              needHotel={needHotel}
              travellers={travellers}
              distance={routeInfo.distance}
              duration={routeInfo.duration}
            />
          </div>
        </motion.div>

        {/* Iternary Component */}
        <motion.div
          ref={iternaryRef}
          className="flex justify-center pb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isIternaryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="">
            <Iternary
              from={from}
              to={to}
              stops={stops}
              startDate={startDate}
              maxDistance={maxDistance}
              needHotel={needHotel}
              travellers={travellers}
            />
          </div>
        </motion.div>

        {/* Car Div Component */}
        <motion.div
          ref={carDivRef}
          className="px-8 mt-4 pb-8 xl:px-40"
          initial={{ opacity: 0, y: 50 }}
          animate={isCarDivInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-full mx-auto">
            <CarDiv />
          </div>
        </motion.div>

        {/* Rentals Component */}
        <motion.div
          ref={rentalsRef}
          className="px-8 mt-4 pb-8 xl:px-40"
          initial={{ opacity: 0, y: 50 }}
          animate={isRentalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-full mx-auto">
            <Rentals />
          </div>
        </motion.div>
      </div>
      
      {/* Footer with Animation */}
      <motion.div
        ref={footerRef}
        className="max-md:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  )
}
