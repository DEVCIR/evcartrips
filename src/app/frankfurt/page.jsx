"use client"
import { ListFilter, X } from "lucide-react"
import HotelCard from "@/components/ui/hotel-card"
import Navbar from "../common_components/navbar/page"
import HotelFilters from "../common_components/hotel-filters/page"
import { useState, useEffect } from "react"
import { useSearchParams , useRouter} from "next/navigation"
import { Suspense} from "react"
import Footer from "@/components/ui/footer"
import Rentals from "../common_components/rentals/page"
import CarDiv from "../common_components/cardiv/page"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"
import Navbar1 from "../common_components/navbar1/page"

export default function PageWrapper() {
  return (
    <Suspense
      fallback={
        <motion.div
          className="text-gray-800 text-center mt-10"
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
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    selectedRatings: [],
    minRating: 0,
    maxDistance: 100,
    amenities: [],
    chains: [],
    roomTypes: [],
    refundableOnly: false,
    name: "",
  })
  const [sortOption, setSortOption] = useState("recommended")
  const [allHotels, setAllHotels] = useState([])
  const [filteredHotels, setFilteredHotels] = useState([])
  const [sortedHotels, setSortedHotels] = useState([])

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
  const isCarDivInView = useInView(carDivRef, { once: true, amount: 0.1, margin: "0px 0px -100px 0px" })
  const isRentalsInView = useInView(rentalsRef, { once: true, amount: 0.3 })
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.3 })

  const fromCity = searchParams.get("from")?.split(",")[0]
  const toCity = searchParams.get("to")?.split(",")[0]
  const travellers = searchParams.get("travellers")
  const stops = [
    searchParams.get("stop1")?.split(",")[0],
    searchParams.get("stop2")?.split(",")[0],
    searchParams.get("stop3")?.split(",")[0],
  ].filter(Boolean)

  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  // Generate dynamic hotels array based on cities
  useEffect(() => {
    const cities = [fromCity, ...stops, toCity]
    const dynamicHotels = cities.map((city, index) => ({
      id: index + 1,
      name: `Best Hotels in ${city}`,
      rating: Math.floor(seededRandom(index) * 5) + 1,
      address: `${city} City Center`,
      nights: 1,
      travelers: travellers,
      price: Math.floor(seededRandom(index + 1) * 200) + 100,
      image: "/images/1.jpg",
      distance: (index + 1) * 10,
      amenities: ["Air conditioning", "WiFi", "Parking"],
      chain: "Local Chain",
      roomType: "Standard",
      refundable: true,
    }))

    setAllHotels(dynamicHotels)
    setFilteredHotels(dynamicHotels)
    setSortedHotels(dynamicHotels)
  }, [fromCity, toCity, stops, travellers])

  // Filter hotels
  useEffect(() => {
    const filtered = allHotels.filter((hotel) => {
      if (filters.name && !hotel.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false
      }
      if (filters.selectedRatings.length > 0 && !filters.selectedRatings.includes(hotel.rating)) {
        return false
      }
      if (hotel.distance > filters.maxDistance) {
        return false
      }
      if (filters.amenities.length > 0 && !filters.amenities.every((amenity) => hotel.amenities.includes(amenity))) {
        return false
      }
      if (filters.chains.length > 0 && !filters.chains.includes(hotel.chain)) {
        return false
      }
      if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(hotel.roomType)) {
        return false
      }
      if (filters.refundableOnly && !hotel.refundable) {
        return false
      }
      return true
    })
    setFilteredHotels(filtered)
  }, [filters, allHotels])

  // Apply sorting
  useEffect(() => {
    const sorted = [...filteredHotels]
    switch (sortOption) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    setSortedHotels(sorted)
  }, [filteredHotels, sortOption])

  const applyFilters = (newFilters) => {
    setFilters(newFilters)
    setShowFilters(false)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Filter Overlay with Enhanced Animations */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0  bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleFilters}
            />

            {/* Filter Panel with Enhanced Slide Animation */}
            <motion.div
              className="absolute left-0 top-0 h-full w-full max-w-sm bg-white text-black overflow-y-auto shadow-2xl"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
            >
              <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <motion.h2
                    className="text-xl font-bold"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Filters
                  </motion.h2>
                  <motion.button
                    onClick={toggleFilters}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <HotelFilters initialFilters={filters} onApply={applyFilters} onCancel={toggleFilters} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header/Navbar Section with Dark Background */}
      <motion.div
        className="bg-black min-h-[65vh] md:min-h-[80vh] text-white rounded-b-[40px]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div className="md:px-8 max-xl:hidden">
          <Navbar />
        </div>
        <div className="md:px-8 xl:hidden">
          <Navbar1 />
        </div>

        <div className="container mx-auto py-8">
          <motion.section
            className="my-8 px-8 md:px-14"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.h1
              className="text-[10px] md:text-[20px] md:-tracking-[0.81px] xl:text-[34px] xl:-tracking-[1.4px] -tracking-[0.41px] font-bold mb-6 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            >
              Hotels in Frankfurt
            </motion.h1>

            <motion.div
              className="flex justify-between items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.p
                className="font-bold text-[10px] -tracking-[0.41px] md:text-[12px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.4px] text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                Showing results {filteredHotels.length} of {allHotels.length}
              </motion.p>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="appearance-none bg-transparent text-white cursor-pointer pr-0 font-semibold text-[10px] md:text-[15px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.4px] focus:outline-none"
                >
                  <option value="recommended" className="text-black">
                    Recommended
                  </option>
                  <option value="price-low" className="text-black">
                    Price: Low to High
                  </option>
                  <option value="price-high" className="text-black">
                    Price: High to Low
                  </option>
                  <option value="rating" className="text-black">
                    Rating
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-3.5 -right-3 md:inset-y-0 md:-right-2 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.button
                onClick={toggleFilters}
                className="flex items-center justify-center px-10 py-3 rounded-full bg-gradient-to-b to-[#AA3916] from-[#F96C41] cursor-pointer hover:bg-gradient-to-l hover:from-[#AA3916] hover:to-[#F96C41] text-white font-semibold shadow-lg w-full max-w-3xl text-[10px] md:text-[14px] xl:text-[20px] xl:-tracking-[1.4px]"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(249, 108, 65, 0.4)",
                  background: "linear-gradient(to left, #AA3916, #F96C41)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                  <ListFilter className="w-2 h-2 md:w-4 md:h-4 xl:w-5 xl:h-5 mr-1 md:mr-3" />
                </motion.div>
                Filters
              </motion.button>
            </motion.div>
          </motion.section>
        </div>
      </motion.div>

      {/* Main Content Section with White Background */}
      <motion.main
        className="-mt-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="container mx-auto py-8">
          <motion.section
            className="grid grid-cols-1 gap-y-4 md:gap-y-8 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {sortedHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <HotelCard {...hotel} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.section>
        </div>
      </motion.main>

      <motion.div
        ref={carDivRef}
        className="px-8 mt-4 pb-8 xl:px-40"
        initial={{ opacity: 0, y: 100 }}
        animate={isCarDivInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
      >
        <div className="max-w-full mx-auto">
          <CarDiv />
        </div>
      </motion.div>

      <motion.div
        ref={rentalsRef}
        className="px-8 mt-4 pb-8 xl:px-40"
        initial={{ opacity: 0, y: 50 }}
        animate={isRentalsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-full mx-auto">
          <Rentals />
        </div>
      </motion.div>

      <motion.div
        ref={footerRef}
        className="max-md:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isFooterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <Footer />
      </motion.div>
    </motion.div>
  )
}
