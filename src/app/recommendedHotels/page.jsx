"use client"
import Navbar from "../../common_components/navbar/page"
import { Button } from "../../components/ui/button"
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import Navbar1 from "../../common_components/navbar1/page"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense , useEffect, useState } from "react"
import CarDiv from "../../common_components/cardiv/page"
import Rentals from "../../common_components/rentals/page"
import Footer from "../../components/ui/footer"
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
  const [locations, setLocations] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGeoLocations = async () => {
      try {
        // Get all search parameters
        const params = new URLSearchParams(searchParams.toString());
        
        // Get destination (required)
        const to = params.get("to");
        if (!to) return;
        
        // Get all stops (stop1, stop2, stop3, etc.)
        const stops = [];
        for (const [key, value] of params.entries()) {
          if (key.startsWith("stop") && value) {
            stops.push(value);
          }
        }
        
        // Function to fetch and process a single location
        const processLocation = async (locationName, type) => {
          if (!locationName) return null;
          
          try {
            const response = await fetch(
              `https://cp.militaryfares.com/api.php?input=${encodeURIComponent(locationName)}&method=geocode`
            );
            const data = await response.json();
            
            if (data.status === "OK" && data.response.length > 0) {
              const firstResult = data.response[0];
              return {
                name: locationName,
                type,
                geo: firstResult.geo,
                city: firstResult.city || firstResult.main_text
              };
            }
            return null;
          } catch (error) {
            console.error(`Error fetching geo data for ${locationName}:`, error);
            return null;
          }
        };
        
        // Prepare promises for all stops and destination
        const locationPromises = [
          ...stops.map((stop, index) => processLocation(stop, `stop${index + 1}`)),
          processLocation(to, "destination")
        ];
        
        const results = await Promise.all(locationPromises);
        
        // Filter out null results
        const validLocations = results.filter(loc => loc !== null);
        setLocations(validLocations);
        
        // Now fetch hotels for each location
        const hotelPromises = validLocations.map(location => 
          fetchHotelsForLocation(location)
        );
        
        const hotelResults = await Promise.all(hotelPromises);
        // hotelResults is an array: one entry per city, each entry is an array of hotels (or null)
        const formattedHotels = [];
        hotelResults.forEach((hotelArr, idx) => {
          if (Array.isArray(hotelArr) && hotelArr.length > 0) {
            const hotel = hotelArr[0]; // Only the first hotel per city
            let mainImage = hotel.image || hotel.thumbnail || (hotel.images && Array.isArray(hotel.images) && hotel.images[0]) || null;
            let thumbnails = [];
            if (Array.isArray(hotel.images)) {
              thumbnails = hotel.images;
            } else if (typeof hotel.images === 'string') {
              thumbnails = [hotel.images];
            } else if (hotel.thumbnail) {
              thumbnails = [hotel.thumbnail];
            } else if (mainImage) {
              thumbnails = [mainImage];
            }
            formattedHotels.push({
              id: idx + 1,
              name: hotel.name,
              location: hotel.location?.city || hotel.name,
              image: mainImage,
              thumbnails,
              checkIn: "Saturday, 10 May 2025", // You might want to make this dynamic
              checkOut: "Sunday, 11 May 2025",  // You might want to make this dynamic
              description: hotel.desc || "Comfortable accommodation with great amenities",
              badge: idx % 2 === 0 ? "Gratis 25kWh" : "30% OFF",
              badgeSubtext: idx % 2 === 0 ? "/ night" : "Limited time",
              originalData: hotel // Keep original data if needed
            });
          }
        });
        setHotels(formattedHotels);
        
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchHotelsForLocation = async (location) => {
      try {
        // Extract latitude and longitude from geo string
        const [lat, lon] = location.geo.split(';');
        
        // Format dates (you might want to make these dynamic)
        const checkInDate = '20250915'; // YYYYMMDD format
        const checkOutDate = '20250918'; // YYYYMMDD format
        
        const response = await fetch(
          `https://gimmonixapi.militaryfares.com/?a=evtrips&method=search&_q=${lat};${lon}|${checkInDate}|${checkOutDate}|1|2:0|25|1||US|hotel&lang=en&curr=USD`
        );
        
        const data = await response.json();
        
        if (data.status === "OK" && data.response && data.response.length > 0) {
          // Return first 4 hotels or all available if less than 4
          return data.response.slice(0, 4).map(hotel => ({
            ...hotel,
            locationCity: location.city // Add city name to hotel data
          }));
        }
        return null;
      } catch (error) {
        console.error(`Error fetching hotels for ${location.name}:`, error);
        return null;
      }
    };
    
    // Only fetch if we have the required params
    if (searchParams.get("to")) {
      fetchGeoLocations();
    }
  }, [searchParams]);

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

  const handleHotelClick = (hotel) => {
    // Create URLSearchParams to preserve all current parameters
    const params = new URLSearchParams(searchParams.toString())
  
    // Find the location data for the clicked hotel
    const hotelLocation = locations.find(loc => 
      hotel.originalData?.locationCity === loc.city || 
      hotel.location === loc.city ||
      hotel.name.includes(loc.city)
    )
  
    // Set the city parameter
    params.set('city', hotelLocation?.city || hotel.location)
  
    // If we have geo data for this location, set it in the params
    if (hotelLocation?.geo) {
      // Ensure the geo string is in "lat;lon" format
      const geoParts = hotelLocation.geo.split(';')
      if (geoParts.length === 2) {
        params.set('geo', hotelLocation.geo) // Set the raw "lat;lon" string
      }
    }
  
    // Build the URL with all parameters
    const url = `/frankfurt?${params.toString()}`
  
    router.push(url)
  }

  const handleContinue = () => {
    if (!locations.length) return;
    const lastLocation = locations[locations.length - 1];
    const params = new URLSearchParams(searchParams.toString());

    if (lastLocation?.city) params.set('city', lastLocation.city);
    if (lastLocation?.geo) params.set('geo', lastLocation.geo);

    const url = `/frankfurt?${params.toString()}`;
    router.push(url);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading hotels...</div>
      </div>
    )
  }

  console.log( "hotels", hotels.length);

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
          <div className="mx-auto w-full space-y-4 md:space-y-16 xl:space-y-22 px-4">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                className="bg-white rounded-[20px] p-4 xl:p-8 shadow-xl relative w-[365px] md:w-[693px] xl:w-[1200px] xl:rounded-[50px] mx-auto cursor-pointer"
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
                onClick={() => handleHotelClick(hotel)}
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
                      <div className={`flex ${hotel.thumbnails.length === 4 ? 'justify-center' : 'justify-start'}`}>
                        {hotel.thumbnails.map((thumb, thumbIndex) => (
                          <Image
                            key={thumbIndex}
                            src={thumb}
                            alt={`${hotel.name} thumbnail ${thumbIndex + 1}`}
                            width={50}
                            height={50}
                            className={` ${hotel.thumbnails.length === 4 ? 'mx-auto' : ''} rounded-lg xl:rounded-2xl object-cover w-[37px] h-auto md:w-[73px] md:h-[71px] xl:w-[127px] xl:h-[124px] cursor-pointer hover:opacity-80 transition-opacity`}
                          />
                        ))}
                      </div>

                      {/* Navigation Arrows */}
                      <button 
                        className="absolute left-1.5 top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </button>
                      <button 
                        className="absolute right-1.5 top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column - All Text and Buttons */}
                  <div className="flex flex-col justify-between space-y-2 min-h-0">
                    <div className="space-y-2 flex-1">
                      <div className="space-y-0.5 xl:-space-y-5">
                        <h3 className="font-bold text-gray-800 text-[12px] md:text-[27px] md:-tracking-[0.81px] xl:text-[48px] xl:-tracking-[1.41px] -tracking-[0.41px] break-words">
                          {hotel.name}
                        </h3>
                        <p className="font-medium text-gray-600 text-[14px] -tracking-[0.41px] md:text-[27px] md:-tracking-[0.81px] xl:text-[48px] xl:-tracking-[1.41px] break-words">
                          {hotel.location}
                        </p>
                      </div>

                      <div className="flex items-center">
                        <p className="text-gray-700 font-[400] text-[8px] -tracking-[0.41px] md:text-[16px] md:-tracking-[0.81px] xl:text-[28px] xl:-tracking-[1.41px]">
                          {hotel.description}
                        </p>
                        <button 
                          className="text-red-500 cursor-pointer bg-red-50 hover:bg-red-100 px-2 py-1 md:py-2 rounded text-[6px] md:text-[9px] xl:text-[16px] font-medium transition-colors shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                        <button 
                          className="text-red-500 hover:text-red-600 text-[8px] md:text-[11px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.41px] -tracking-[0.41px] font-medium transition-colors flex mx-auto items-center gap-0.5 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                      <div 
                        className="w-[141px] h-[20px] md:w-[281px] md:h-[39px] xl:w-[486px] xl:h-[68px]"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                      <button 
                        className="w-[141px] h-[20px] md:w-[281px] md:h-[39px] xl:w-[486px] xl:h-[68px] cursor-pointer flex items-center justify-center gap-1.5 border border-red-200 hover:bg-red-50 text-red-500 rounded-md py-2.5 sm:py-2.5 text-[8px] md:text-[11px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.41px] -tracking-[0.41px] sm:text-sm font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                  className="cursor-pointer mt-4 md:mt-8 lg:mt-12 w-full md:w-[381px] bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:from-[#AA3916] hover:to-[#F96C41] text-white font-semibold py-3 md:py-4 rounded-lg h-12 md:h-14 text-base md:text-lg"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="px-8 mt-4 pb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="z-10 max-w-full mx-auto xl:w-[1200px]">
              <CarDiv />
            </div>
          </motion.div>

          <motion.div
            className="px-8 mt-4 pb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-full mx-auto xl:w-[1196px]">
              <Rentals />
            </div>
          </motion.div>

          <motion.div
            className="max-md:hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Footer />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
