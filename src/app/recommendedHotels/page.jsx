"use client"
import Navbar from "../../common_components/navbar/page"
import { Button } from "../../components/ui/button"
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import Navbar1 from "../../common_components/navbar1/page"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState, useCallback } from "react"
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
  const [locations, setLocations] = useState([])
  const [amenity, setAmenity] = useState([])
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [openAmenitiesIndex, setOpenAmenitiesIndex] = useState(null); // <-- add this line
  const searchParams = useSearchParams()
  const travellers = parseInt(searchParams.get("travellers")?.split(" ")[0]) || 1
  const rooms = parseInt(searchParams.get("travellers")?.split(",")[1]?.split(" ")[1]) || 1
  const [isContinueLoading, setIsContinueLoading] = useState(false);

  useEffect(() => {
    const from = searchParams.get("from")
    const to = searchParams.get("to")

    if (!from || !to) {
      router.push("/") // Redirect to home if required params are missing
    }
  }, [searchParams, router])

  useEffect(() => {
    console.log("amenity", amenity);
  }, [amenity])
  useEffect(() => {
    // Save the current full URL to localStorage on mount
    if (typeof window !== 'undefined') {
      localStorage.setItem('recommendedHotelsUrl', window.location.href);
    }

    const fetchHotelsFromItinerary = async () => {
      setLoading(true);
      try {
        // 1. Get fullItinerary from localStorage (client-side only)
        let itineraryStr = null;
        if (typeof window !== 'undefined') {
          itineraryStr = localStorage.getItem("fullItinerary");
        }
        if (!itineraryStr) return setLoading(false);

        const itinerary = JSON.parse(itineraryStr);
        if (!Array.isArray(itinerary) || itinerary.length === 0) return setLoading(false);

        const startDateParam = searchParams.get("startDate");
        let currentDate = startDateParam ? new Date(startDateParam.split("T")[0]) : new Date();

        // Function to format date as YYYYMMDD for API
        const formatAPIDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}${month}${day}`;
        };

        // Function to format date for display
        const formatDisplayDate = (date) => {
          return date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "2-digit",
            month: "short",
            year: "numeric"
          });
        };

        // 2. Extract all 'to' cities
        const cities = itinerary.map(item => item.to).filter(Boolean);

        // 3. Function to fetch and process a single location
        const processLocation = async (locationName) => {
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

        // 4. Prepare promises for all cities
        const locationPromises = cities.map(city => processLocation(city));
        const results = await Promise.all(locationPromises);
        const validLocations = results.filter(loc => loc !== null);
        setLocations(validLocations);

        // 5. Fetch hotels for each location
        const fetchHotelsForLocation = async (location) => {
          try {
            const [lat, lon] = location.geo.split(';');
            // Use a static date for now, or you can use itinerary date if needed
            const { checkInDate, checkOutDate } = getDatesForAPI()

            const response = await fetch(
              `https://gimmonixapi.militaryfares.com/?a=evtrips&method=search&_q=${lat};${lon}|${checkInDate}|${checkOutDate}|${rooms}|${travellers}:0|25|1||US|hotel&lang=en&curr=USD`
            );
            const data = await response.json();
            if (data.status === "OK" && data.response && data.response.length > 0) {
              setAmenity(data.ResultFilter.Amenity);
              return data.response.slice(0, 4).map(hotel => ({
                ...hotel,
                locationCity: location.city
              }));
            }
            return null;
          } catch (error) {
            console.error(`Error fetching hotels for ${location.name}:`, error);
            return null;
          }
        };

        const hotelPromises = validLocations.map(location => fetchHotelsForLocation(location));
        const hotelResults = await Promise.all(hotelPromises);
        const formattedHotels = [];
        hotelResults.forEach((hotelArr, idx) => {
          if (Array.isArray(hotelArr) && hotelArr.length > 0) {
            // Only match hotels where location.city exactly matches the 'to' value (case-insensitive)
            const cityName = cities[idx];
            let hotel = hotelArr.find(h => h.location && h.location.city && h.location.city.toLowerCase() === cityName.toLowerCase());
            if (!hotel) {
              console.log("andar ayaaa---");
              hotel = hotelArr[0]; // fallback to first hotel
            }
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
            const { checkInDate, checkOutDate } = getDatesForAPI();
            formattedHotels.push({
              id: idx + 1,
              name: hotel.name,
              location: hotel.location?.city || hotel.name,
              image: mainImage,
              thumbnails,
              checkIn: hotel.checkIn,
              checkOut: hotel.checkOut,// You might want to make this dynamic
              description: hotel.desc || "Comfortable accommodation with great amenities",
              badge: idx % 2 === 0 ? "Gratis 25kWh" : "30% OFF",
              badgeSubtext: idx % 2 === 0 ? "/ night" : "Limited time",
              originalData: hotel // Keep original data if needed
            });
          }
        });
        setHotels(formattedHotels);

        console.log(formattedHotels);
      } catch (error) {
        console.error("Error fetching hotels from itinerary:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotelsFromItinerary();
  }, []);

  const formatDisplayDate = (dateString) => {
    // dateString: "20250915"
    if (!dateString || dateString.length !== 8) return "";
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const dateObj = new Date(`${year}-${month}-${day}T00:00:00`);
    // Format: Saturday, 10 May 2025
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const getDatesForAPI = useCallback(() => {
    // Get startDate from params, or use today if missing
    const startDateParam = searchParams.get("startDate");
    let startDate;
    if (startDateParam) {
      // Only use the date part (YYYY-MM-DD)
      const dateOnly = startDateParam.split("T")[0];
      startDate = new Date(dateOnly + "T00:00:00");
    } else {
      startDate = new Date();
    }

    // Format as YYYYMMDD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const checkInDate = formatDate(startDate);

    // Add 1 day for check-out
    const checkOut = new Date(startDate);
    checkOut.setDate(checkOut.getDate() + 1);
    const checkOutDate = formatDate(checkOut);

    return { checkInDate, checkOutDate };
  }, [searchParams]);

  // Remove all code related to searchParams, stops, and 'to' parameter

  const handleHotelClick = (hotel) => {

    const params = new URLSearchParams(searchParams.toString());

    // Find the location data for the clicked hotel
    const hotelLocation = locations.find(loc =>
      hotel.originalData?.locationCity === loc.city ||
      hotel.location === loc.city ||
      hotel.name.includes(loc.city)
    )
    params.set('city', hotelLocation?.city || hotel.location);

    if (hotelLocation?.geo) {
      const geoParts = hotelLocation.geo.split(';');
      if (geoParts.length === 2) {
        params.set('geo', hotelLocation.geo);
      }
    }

    const url = `/frankfurt?${params.toString()}`;
    router.push(url);
  }

  const handleContinue = () => {
    if (!locations.length) return;
    setIsContinueLoading(true);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F96C41] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading</p>
        </div>
      </div>
    )
  }


  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-black px-2 pt-4 pb-32 relative min-h-[50vh] md:min-h-[70vh] flex flex-col justify-start rounded-b-[18px]"
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
          <div className="text-center mb-6 mt-4">
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
                className="bg-white rounded-[20px] p-4 xl:p-8 shadow-2xl relative w-full sm:w-[500px] md:w-[693px] xl:w-[1200px] xl:rounded-[50px] h-auto mx-auto cursor-pointer"
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
                <div className="flex max-md:flex-col md:flex-row max-md:mx-auto gap-4 relative">
                  {/* Left Column - Full Height Main Image */}
                  <div className="w-full  md:w-[324px]  xl:w-[562px]  flex-shrink-0 relative">
                    {/* Main Hotel Image with Navigation Arrows */}
                    <div className="max-md:flex max-md:items-start max-md:gap-x-2 md:relative rounded-xl overflow-hidden md:space-y-3">
                      <Image
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        width={300}
                        height={300}
                        className="w-[80%] h-[210px] sm:w-full sm:h-[210px] md:h-[270px] order-2 xl:h-[430px] object-cover rounded-xl xl:rounded-4xl"
                      />

                      <div className={`max-md:w-[20%] flex max-md:gap-y-1 max-md:flex-col md:flex-row order-1 ${hotel.thumbnails.length === 4 ? 'justify-center' : 'justify-start'}`}>
                        {/* Thumbnail Images */}
                        {hotel.thumbnails.map((thumb, thumbIndex) => (
                          <Image
                            key={thumbIndex}
                            src={thumb}
                            alt={`${hotel.name} thumbnail ${thumbIndex + 1}`}
                            width={50}
                            height={50}
                            className={` ${hotel.thumbnails.length === 4 ? 'md:mx-auto' : ''}  rounded-lg xl:rounded-2xl object-cover w-full h-[50px] sm:w-[73px] sm:h-[50px] md:w-[73px] md:h-[71px] xl:w-[127px] xl:h-[124px] cursor-pointer hover:opacity-80 transition-opacity`}
                          />
                        ))}
                      </div>

                      {/* Navigation Arrows */}
                      <button
                        className="absolute left-[24%] sm:left-23 md:left-1.5 top-[50%] md:top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </button>
                      <button
                        className="absolute right-1.5 top-[50%] md:top-[40%] -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column - All Text and Buttons */}
                  <div className={`flex flex-col justify-between space-y-2 min-h-0 ${openAmenitiesIndex === index ? "h-auto" : 'md:h-[400px]'} ${openAmenitiesIndex === index ? "h-auto" : 'xl:h-[630px]'} `}>
                    <div className="space-y-2 flex-1">
                      <div className="space-y-0.5 xl:-space-y-5">
                        <h3 className="font-bold text-gray-800 text-[16px] md:text-[27px] md:-tracking-[0.81px] xl:text-[48px] xl:-tracking-[1.41px] -tracking-[0.41px] break-words">
                          {hotel.name.slice(0, 30)}{hotel.name.length > 30 ? '...' : ''}
                        </h3>
                        <p className="font-medium text-gray-600 text-[16px] -tracking-[0.41px] md:text-[27px] md:-tracking-[0.81px] xl:text-[48px] xl:-tracking-[1.41px] break-words">
                          {hotel.location}
                        </p>
                      </div>

                      <div className="flex gap-3 items-center">
                        <p className="text-gray-700 font-[400] text-[12px] -tracking-[0.41px] md:text-[16px] md:-tracking-[0.81px] xl:text-[28px] xl:-tracking-[1.41px]">
                          {hotel.description}
                        </p>
                        <button
                          className="text-red-500 cursor-pointer bg-red-50 hover:bg-red-100 px-2 py-1 md:py-2 rounded text-[9px] md:text-[9px] xl:text-[16px] font-medium
                           transition-colors shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          More details
                        </button>
                      </div>

                      {/* Check-in/Check-out */}
                      <div className="space-y-0.5">
                        <div className="text-[12px] md:text-[14px] xl:text-[25px] text-gray-700">
                          <span className="font-medium">Check-in:</span>{" "}
                          <span className="text-gray-600 font-[400]">{hotel.checkIn}</span>
                        </div>
                        <div className="text-[12px] md:text-[14px] xl:text-[25px] text-gray-700">
                          <span className="font-medium">Check-out:</span>{" "}
                          <span className="text-gray-600 font-[400]">{hotel.checkOut}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start t md:my-2 xl:my-4">
                        <button
                          className="text-red-500 hover:text-red-600 text-[10px] md:text-[11px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.41px] -tracking-[0.41px] font-medium transition-colors flex  items-center  gap-0.5 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenAmenitiesIndex(openAmenitiesIndex === index ? null : index);
                          }}
                        >
                          Show more deals <ChevronDown className="w-2 h-2 md:w-3 md:h-3 xl:w-6 xl:h-6" />
                        </button>
                        {openAmenitiesIndex === index && amenity && Array.isArray(amenity) && (
                          <div className="mt-2 p-2 bg-gray-50 rounded">
                            <h4 className="font-semibold mb-1">Amenities:</h4>
                            <ul className="flex flex-wrap gap-2">
                              {amenity.map((a, i) => (
                                <li key={i} className="bg-white border px-2 py-1 rounded text-xs">
                                  {a.Name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stopover Section */}
                    <div className="space-y-3 md:space-y-3 mt-auto md:mb-20 xl:mb-36">
                      <p className="text-gray-700 font-medium text-[10px] md:text-[11px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.41px]">
                        I change this stop and would like to overnight on:
                      </p>

                      {/* Date Dropdown */}
                      <div
                        className="w-full h-auto md:w-[281px] md:h-[39px] xl:w-[486px] xl:h-[68px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-x-2 border border-gray-200 rounded-md px-2 py-2.5 sm:p-2.5 max-md:border-spacing-12 bg-white hover:border-gray-300 transition-colors cursor-pointer">
                          <div className="bg-red-500 p-1 rounded">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4 xl:w-8 xl:h-8 text-white" />
                          </div>
                          <span className="text-[10px] md:text-[10px] md:-tracking-[-0.36px] xl:text-[15px] xl:-tracking-[0.63px] font-medium text-[#00000075] flex-1">
                            Monday, 12 May, 2025
                          </span>
                          <ChevronDown className="w-3 h-3 md:w-4 md:h-4 xl:w-6 xl:h-6 text-gray-400" />
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button
                        className="w-full h-auto md:w-[281px] md:h-[39px] xl:w-[486px] xl:h-[68px] cursor-pointer flex items-center justify-center gap-1.5 border border-red-200 hover:bg-red-50 text-red-500 rounded-md py-2.5 sm:py-2.5 text-[10px] md:text-[11px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.41px] -tracking-[0.41px] sm:text-sm font-medium transition-colors"
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
              className="pt-2 pb-8 sm:flex sm:justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="cursor-pointer mt-4 md:mt-7 lg:mt-5 w-full sm:w-[250px] md:w-[381px] btn-gradient text-white font-semibold py-3 md:py-4 rounded-lg h-12 md:h-14 text-base md:text-lg"
                  onClick={handleContinue}
                  disabled={isContinueLoading}
                >
                  {isContinueLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                      Loading...
                    </span>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="z-10 max-w-full mx-auto xl:w-[1200px]">
              <CarDiv />
            </div>
          </motion.div>

          <motion.div
            className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48"
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
