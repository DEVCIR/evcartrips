"use client"
import { Star, MapPin, Moon, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const HotelCard = ({ 
  id, 
  name, 
  rating, 
  address, 
  nights, 
  travelers, 
  price, 
  image, 
  roomImage, 
  index = 0,
  distance,
  amenities,
  chain,
  roomType,
  refundable,
  city,
  geo,
  checkin,
  checkout
}) => {
  const router = useRouter()

  const handleChooseRoom = () => {
    // Prepare hotel and room details for hotel-select
    const hotelData = {
      name,
      image: image,
      roomImage: roomImage,
      city: city || '',
      address: address || '',
      rating: rating || 0,
      // Room details placeholders (to be replaced with real data if available)
      roomName: roomType || 'Double room',
      sleeps: travelers || 2,
      bedType: 'Double', // Placeholder, update if available
      mealPlan: 'Bread and Breakfast BB', // Placeholder, update if available
      price: price || 0,
      refundable: refundable || false,
      cancellation: 'Free cancellation', // Placeholder, update if available
      moreDetails: '', // Placeholder, update if available
      checkin: checkin,
      checkout: checkout
    };
    localStorage.setItem('selectedHotel', JSON.stringify(hotelData));
    // Navigate to hotel-select page
    router.push('/hotel-select');
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Generate star rating
 
  return (
    <motion.div
      className="w-[348px] md:w-[692px] xl:w-[900px] h-auto bg-white rounded-3xl shadow-lg overflow-hidden mb-8 p-4 md:p-6 mx-auto"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex flex-row">
        <div
          className="w-[163px] h-[160px] md:w-[324px] md:h-[284px] xl:w-[560px] xl:h-[400px]"
          
        >
          <img
            src={image || "images/1.jpg"}
            alt={name}
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        <div className="pl-4 flex flex-col justify-between w-2/5 md:w-3/5 text-black">
          <div>
            <motion.h2
              className="font-semibold text-[14px] -tracking-[0.44px] md:text-[29px] md:-tracking-[0.87px] xl:text-[40px] xl:-tracking-[1.5px] xl:leading-[50px] mb-1 md:mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              {name}
            </motion.h2>

            <motion.div
              className="flex items-center mb-1 md:mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center">
                {/* Full stars */}
                {[...Array(fullStars)].map((_, i) => (
                  <motion.div
                    key={`full-${i}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    <Star className="w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 text-orange-400 fill-orange-400" />
                  </motion.div>
                ))}
                
                {/* Half star */}
                {hasHalfStar && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.5 + fullStars * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    <Star className="w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 text-orange-400 fill-orange-400" />
                  </motion.div>
                )}
                
                {/* Empty stars */}
                {[...Array(emptyStars)].map((_, i) => (
                  <motion.div
                    key={`empty-${i}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.5 + (fullStars + (hasHalfStar ? 1 : 0) + i * 0.1),
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                  >
                    <Star className="w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 text-gray-300" />
                  </motion.div>
                ))}
                
                <span className="ml-1 text-[8px] md:text-[16px] xl:text-[24px] font-medium text-gray-600">
                {rating.toFixed(1)}
                </span>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center mb-1 md:mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <MapPin className="w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 mr-1 md:mr-2 text-blue-500" />
              <span className="text-blue-500 font-normal text-[8px] -tracking-[0.44px] md:text-[16px] md:-tracking-[0.87px] xl:text-[29px] xl:-tracking-[1.5px]">
                {address}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center text-gray-600 mb-1 md:mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <Moon className="w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 mr-1 md:mr-2 text-gray-500" />
              <span className="font-normal text-[8px] -tracking-[0.44px] md:text-[16px] md:-tracking-[0.87px] xl:text-[29px] xl:-tracking-[1.5px]">
                Nights: {nights}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center text-gray-600 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              whileHover={{ x: 5 }}
            >
              <Users className="w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 mr-1 md:mr-2 text-gray-500" />
              <span className="font-normal text-[8px] -tracking-[0.44px] md:text-[16px] md:-tracking-[0.87px] xl:text-[29px] xl:-tracking-[1.5px]">
                Travler(s): {travelers}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="flex justify-between items-center md:pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
      >
        <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <motion.p
            className="font-semibold text-[15px] -tracking-[0.44px] md:text-[29px] md:-tracking-[0.87px] xl:text-4xl xl:font-bold text-gray-900"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.9 + index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            USD ${price}
          </motion.p>
          <p className="font-semibold text-[6px] -tracking-[0.44px] md:text-[11px] md:-tracking-[0.87px] text-gray-500">
            Inclusive taxes
          </p>
        </motion.div>

        <motion.button
          onClick={handleChooseRoom}
          className="px-4 py-2 md:px-8 md:py-4 rounded-md md:rounded-lg cursor-pointer btn-gradient text-white shadow-lg flex items-center font-bold text-[8px] -tracking-[0.41px] md:text-[11px] md:-tracking-[0.81px]"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(249, 108, 65, 0.4)",
            background: "linear-gradient(to left, #ea580c, #dc2626)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
        >
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 + index * 0.1 }}>
            CHOOSE ROOM
          </motion.span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3 h-3 md:w-5 md:h-5 ml-1 md:ml-2"
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
            whileHover={{ x: 3 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default HotelCard
