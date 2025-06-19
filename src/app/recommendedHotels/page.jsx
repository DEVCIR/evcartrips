"use client"
import Navbar from "../common_components/navbar/page"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import Navbar1 from "../common_components/navbar1/page"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense , useEffect } from "react"
import CarDiv from "../common_components/cardiv/page"
import Rentals from "../common_components/rentals/page"
import Footer from "@/components/ui/footer"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function PageWrapper() {
  return (
    <Suspense fallback={
      <motion.div
        className="text-white text-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        Loading...
      </motion.div>
    }>
      <Page />
    </Suspense>
  )
}

function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const hotels = [
    {
      id: 1,
      name: "NH Collection",
      location: "frankfurt city",
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
      thumbnails: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=120&h=120&fit=crop",
      ],
      checkIn: "Saturday, 10 May 2025",
      checkOut: "Sunday, 11 May 2025",
      description: "Where comfort meets sustainability. Recharge",
      badge: "Gratis 25kWh",
      badgeSubtext: "/ night",
    },
    {
      id: 2,
      name: "Scandic Berlin",
      location: "Postdamer plats",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      thumbnails: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=120&h=120&fit=crop",
      ],
      checkIn: "Saturday, 10 May 2025",
      checkOut: "Sunday, 11 May 2025",
      description: "Eco friendly hotel with on site EV charging and more",
      badge: "Gratis 25kWh",
      badgeSubtext: "1 night",
    },
    {
      id: 3,
      name: "Marriott Hotel",
      location: "Munich center",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      thumbnails: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=120&h=120&fit=crop",
      ],
      checkIn: "Sunday, 11 May 2025",
      checkOut: "Monday, 12 May 2025",
      description: "Luxury accommodation in the heart of Munich",
      badge: "30% OFF",
      badgeSubtext: "Limited time",
    },
    {
      id: 4,
      name: "Hilton Garden Inn",
      location: "Hamburg port",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      thumbnails: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=120&h=120&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&h=120&fit=crop",
      ],
      checkIn: "Monday, 12 May 2025",
      checkOut: "Tuesday, 13 May 2025",
      description: "Modern hotel with harbor views and amenities",
      badge: "Free WiFi",
      badgeSubtext: "+ Breakfast",
    },
  ]

  
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
  const carDivRef = useRef(null)
  const rentalsRef = useRef(null)
  const footerRef = useRef(null)

  // useInView hooks for scroll-triggered animations
  const isCarDivInView = useInView(carDivRef, { once: true, amount: 0.3 })
  const isRentalsInView = useInView(rentalsRef, { once: true, amount: 0.3 })
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.3 })

  const handleContinue = () => {
    // Create URLSearchParams to preserve all current parameters
    const params = new URLSearchParams(searchParams.toString())

    // Add any additional parameters you want to pass to the recommended page
    // params.set('someParam', 'someValue');

    router.push(`/frankfurt?${params.toString()}`)
  }

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-black px-4 pt-4 pb-32 relative min-h-[50vh] md:min-h-[70vh] flex flex-col justify-start rounded-b-[18px]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="xl:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Navbar1 />
        </motion.div>
        <motion.div
          className="max-xl:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Navbar />
        </motion.div>
        <motion.div
          className="max-w-lg mx-auto w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-center mb-6 md:mt-4">
            <motion.p
              className="text-[#FFFFFF99] text-sm md:text-[20px] font-medium md:font-bold tracking-wider"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
            >
              Recommended Hotels
            </motion.p>
          </div>
        </motion.div>

        {/* Hotel Cards Container */}
        <motion.div
          className="absolute left-0 right-0 top-[40%]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="mx-auto w-full space-y-4 md:space-y-16 xl:space-y-22  px-4">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                className="bg-white rounded-[20px] p-4 xl:p-8 shadow-xl relative w-[365px] h-[230px] md:w-[693px] md:h-[390px] xl:w-[1200px] xl:h-[630px] xl:rounded-[50px] mx-auto"
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.6 + index * 0.2,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Badge */}
                <div className="absolute -top-2 -right-2 md:-top-12 md:-right-8 xl:-top-20 xl:-right-14 z-20">
                  <img
                    src="images/icons/discount2.png"
                    alt="discount"
                    className="w-[61px] h-[61px] md:w-[114px] md:h-[114px] xl:w-[197px] xl:h-[197px]"
                  />
                </div>

                {/* Horizontal Layout for All Screen Sizes */}
                <div className="flex gap-4 relative">
                  {/* Left Column - Full Height Main Image */}
                  <div className="w-[163px] h-[187px] md:w-[324px] md:h-[400px] xl:w-[562px] xl:h-[644px] flex-shrink-0 relative">
                    {/* Main Hotel Image with Navigation Arrows */}
                    <div className="relative rounded-xl overflow-hidden space-y-3">
                      <Image
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        width={300}
                        height={300}
                        className="w-full h-auto object-cover rounded-xl xl:rounded-4xl"
                      />

                      {/* Thumbnail Images */}
                      <div className="flex">
                        {hotel.thumbnails.map((thumb, thumbIndex) => (
                          <Image
                            key={thumbIndex}
                            src={thumb || "/placeholder.svg"}
                            alt={`${hotel.name} thumbnail ${thumbIndex + 1}`}
                            width={50}
                            height={50}
                            className="mx-auto rounded-lg xl:rounded-2xl object-cover w-[37px] h-[36px] md:w-[73px] md:h-[71px] xl:w-[127px] xl:h-[124px] cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </div>

                      {/* Navigation Arrows */}
                      <button className="absolute left-1.5 top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md">
                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </button>
                      <button className="absolute right-1.5 top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md">
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column - All Text and Buttons */}
                  <div className="flex flex-col justify-between space-y-2">
                    <div className="space-y-2">
                      <div className="space-y-0.5 xl:-space-y-5">
                        <h3 className="font-bold text-gray-800 text-[14px] md:text-[27px] md:-tracking-[0.81px] xl:text-[48px] xl:-tracking-[1.41px] -tracking-[0.41px]">
                          {hotel.name}
                        </h3>
                        <p className="font-medium text-gray-600 text-[14px] -tracking-[0.41px] md:text-[27px] md:-tracking-[0.81px] xl:text-[48px] xl:-tracking-[1.41px]">
                          {hotel.location}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <p className="text-gray-700 font-[400] text-[8px] -tracking-[0.41px] md:text-[16px] md:-tracking-[0.81px] xl:text-[28px] xl:-tracking-[1.41px]">
                          {hotel.description}
                        </p>
                        <button className="text-red-500 cursor-pointer bg-red-50 hover:bg-red-100 px-2 py-1 md:py-2 rounded text-[6px] md:text-[9px] xl:text-[16px] font-medium transition-colors shrink-0">
                          More details
                        </button>
                      </div>

                      {/* Check-in/Check-out */}
                      <div className="space-y-0.5">
                        <div className="text-[7.4px] md:text-[14px] xl:text-[25px] text-gray-700">
                          <span className="font-medium">Check-in:</span>{" "}
                          <span className="text-gray-600 font-[400]">{hotel.checkIn}</span>
                        </div>
                        <div className="text-[7.4px] md:text-[14px] xl:text-[25px] text-gray-700">
                          <span className="font-medium">Check-out:</span>{" "}
                          <span className="text-gray-600 font-[400]">{hotel.checkOut}</span>
                        </div>
                      </div>

                      <div className="flex items-center md:my-2 xl:my-4">
                        <button className="text-red-500 hover:text-red-600 text-[8px] md:text-[11px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.41px] -tracking-[0.41px] font-medium transition-colors flex mx-auto items-center gap-0.5 cursor-pointer">
                          Show more deals <ChevronDown className="w-2 h-2 md:w-3 md:h-3 xl:w-6 xl:h-6" />
                        </button>
                      </div>
                    </div>

                    {/* Stopover Section */}
                    <div className="space-y-2 md:space-y-3 mt-auto md:mb-20 xl:mb-36">
                      <p className="text-gray-700 font-medium text-[6px] md:text-[11px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.41px]">
                        I change this stop and would like to overnight on:
                      </p>

                      {/* Date Dropdown */}
                      <div className="w-[141px] h-[20px] md:w-[281px] md:h-[39px] xl:w-[486px] xl:h-[68px]">
                        <div className="flex items-center gap-x-2 border border-gray-200 rounded-md px-2 py-1 sm:p-2.5 bg-white hover:border-gray-300 transition-colors cursor-pointer">
                          <div className="bg-red-500 p-1 rounded">
                            <Calendar className="w-2 h-2 md:w-4 md:h-4 xl:w-8 xl:h-8 text-white" />
                          </div>
                          <span className="text-[7px] md:text-[10px] md:-tracking-[-0.36px] xl:text-[15px] xl:-tracking-[0.63px] font-medium text-[#00000075] flex-1">
                            Monday, 12 May, 2025
                          </span>
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4 xl:w-6 xl:h-6 text-gray-400" />
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button className="w-[141px] h-[20px] md:w-[281px] md:h-[39px] xl:w-[486px] xl:h-[68px] cursor-pointer flex items-center justify-center gap-1.5 border border-red-200 hover:bg-red-50 text-red-500 rounded-md py-2.5 sm:py-2.5 text-[8px] md:text-[11px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.41px] -tracking-[0.41px] sm:text-sm font-medium transition-colors">
                        <X className="w-2 h-2 md:w-4 md:h-4 xl:w-6 xl:h-6" />
                        Delete this stopover
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Continue Button */}
            <motion.div
              className="pt-4 pb-8 xl:flex xl:justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleContinue}
                  className="cursor-pointer mt-4 md:mt-8 lg:mt-12 w-full md:w-[381px] bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:from-[#AA3916] hover:to-[#F96C41] text-white font-semibold py-3 md:py-4 rounded-lg h-12 md:h-14 text-base md:text-lg"
                >
                  Continue
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            ref={carDivRef}
            className="px-8 mt-4 pb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isCarDivInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="z-10 max-w-full mx-auto xl:w-[1200px]">
              <CarDiv />
            </div>
          </motion.div>

          <motion.div
            ref={rentalsRef}
            className="px-8 mt-4 pb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={isRentalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-full mx-auto xl:w-[1196px]">
              <Rentals />
            </div>
          </motion.div>

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
      </motion.div>
    </motion.div>
  )
}
