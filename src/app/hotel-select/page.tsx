"use client";

import Image from "next/image";
import {
redirect,
// useSearchParams,
useRouter
} from "next/navigation";
// import { useEffect, useState } from "react";
import CarDiv from "../../common_components/cardiv/page";
import Rentals from "../../common_components/rentals/page";
import Footer from "../../components/ui/footer";
import Navbar from "../../common_components/navbar/page";
import { FormField } from "./components/FormField";
import { RoomCard } from "./components/RoomCard";
import { StarRating } from "./components/StarRating";
import { CalendarIcon, UserIcon, RoomIcon } from "./components/Icons";
import type { Room, FormField as FormFieldType } from "./types/hotel";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import Error from "next/error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CenteredContentInterface {
  width?: string;
  text?: string;
  className?: string;
  children: React.ReactNode;
}
const CenteredContent: React.FC<CenteredContentInterface> = ({
  width = "w-11/12  md:w-10/12 lg:w-8/12",
  text,
  className,
  children,
}) => <div className={`mx-auto ${width} ${text} ${className}`}>{children}</div>;

// Helper to format date from 'YYYYMMDD' to 'YYYY-MM-DD'
function formatDateString(dateStr?: string) {
  if (!dateStr || dateStr.length !== 8) return dateStr || '';
  return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
}

export default function HotelBooking() {
  // const searchParams = useSearchParams();
  const [hotelData, setHotelData] = useLocalStorage('selectedHotel', null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isContinueLoading, setIsContinueLoading] = useState(false);

  useEffect(() => {
    if (hotelData !== null) {
      setLoading(false);
    }
  }, [hotelData]);

  // Dynamically create rooms array from hotelData
  let rooms: Room[] = [];
  if (hotelData && hotelData.roomName) {
    rooms = [
      {
        id: hotelData.roomName.replace(/\s+/g, '-').toLowerCase() || 'room-1',
        name: hotelData.roomName || 'Room',
        image: hotelData.roomImage,
        sleeps: hotelData.sleeps || 2,
        bedType: hotelData.bedType || 'Double',
        mealPlan: hotelData.mealPlan || 'Bread and Breakfast BB',
        price: hotelData.price || 0,
      }
    ];
  }

  // Set check-in date from tripCities if city matches
  useEffect(() => {
    if (!hotelData?.city)
      {
          router.push('/');
          return; 
      }
    try {
      const tripCitiesRaw = JSON.parse(localStorage.getItem('tripCities') || '{}');
      if (!tripCitiesRaw || Object.keys(tripCitiesRaw).length === 0) {
        router.push('/');
        return;
      }
      const tripCities = tripCitiesRaw;
      if (!Array.isArray(tripCities)) return;
      const found = tripCities.find(
        (c) => c.city && c.city.toLowerCase() === hotelData.city.toLowerCase()
      );
      if (found && found.date) {
        // Convert to YYYY-MM-DD for input type="date"
        const dateObj = new Date(found.date);
        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const formatted = `${yyyy}-${mm}-${dd}`;
        let newHotelData = { ...hotelData };
        if (hotelData.checkin !== formatted) {
          newHotelData.checkin = formatted;
        }
        // Set checkout to +1 day from checkin
        if (formatted) {
          const checkoutDateObj = new Date(formatted);
          checkoutDateObj.setDate(checkoutDateObj.getDate() + 1);
          const coutY = checkoutDateObj.getFullYear();
          const coutM = String(checkoutDateObj.getMonth() + 1).padStart(2, '0');
          const coutD = String(checkoutDateObj.getDate()).padStart(2, '0');
          const coutFormatted = `${coutY}-${coutM}-${coutD}`;
          if (hotelData.checkout !== coutFormatted) {
            newHotelData.checkout = coutFormatted;
          }
        }
        setHotelData(newHotelData);
      }
    } catch (e) {
      // Ignore errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelData?.city]);
  
  
  let guestsValue = "1 Guest";
  let roomsValue = "1 Room";
  if(typeof window !== "undefined")
  {
  const url = localStorage.getItem('recommendedHotelsUrl');
  if (url) {
    // Parse the URL and its query parameters
    const urlObj = new URL(url);
    const searchParams = urlObj.searchParams;
  
    const travellers = parseInt(searchParams.get("travellers")?.split(" ")[0]) || 1;
    const rooms = parseInt(searchParams.get("travellers")?.split(",")[1]?.split(" ")[1]) || 1;
    guestsValue = travellers > 1 ? `${travellers} Guests` : `${travellers} Guest`;
    roomsValue = rooms > 1 ? `${rooms} Rooms` : `${rooms} Room`;
  }}
  // Form fields data
  const formFields: FormFieldType[] = [
    {
      id: "checkin",
      label: "Check in",
      icon: <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />,
      type: "date",
      value: formatDateString(hotelData?.checkin),
    },
    {
      id: "checkout",
      label: "Check out",
      icon: <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />,
      type: "date",
      value: formatDateString(hotelData?.checkout),
    },
    {
      id: "guests",
      label: "Guest",
      icon: <UserIcon className="w-4 h-4 mr-1 text-gray-400" />,
      type: "select",
      value: `${hotelData?.travelers || 1} Guest${hotelData?.travelers > 1 ? 's' : ''}`,
      options: [guestsValue],
    },
    {
      id: "rooms",
      label: "Room",
      icon: <RoomIcon className="w-4 h-4 mr-1 text-gray-400" />,
      type: "select",
      value: `${hotelData?.nights || 1} Room${hotelData?.nights > 1 ? 's' : ''}`,
      options: [roomsValue],
    },
  ];

  const handleFieldChange = (fieldId: string, value: string) => {
    console.log(`Field ${fieldId} changed to:`, value);
    // Handle form field changes here
  };

  const handleRoomSelect = (roomId: string) => {
    
    const selectedRoom = rooms.find(room => room.id === roomId);
    if (selectedRoom) {
      // Use city name as stop key (lowercase, no spaces)
      const stopKey = (hotelData?.city || 'final').toLowerCase().replace(/\s+/g, '_');
      // Get existing selections
      const allSelections = JSON.parse(localStorage.getItem('reservationDetailsByStop') || '{}');
      // Update only this stop
      allSelections[stopKey] = {
        ...hotelData,
        selectedRoom,
      };
      localStorage.setItem('reservationDetailsByStop', JSON.stringify(allSelections));
      // Dispatch event for real-time cart update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('reservationDetailsUpdated'));
      }
      toast.success('Item added to cart', { autoClose: 2000 });
    setTimeout(() => {
      setIsContinueLoading(true);
    }, 2000);
      setTimeout(() => {
        redirect('/reservationDetails');
      }, 4000);
    }
  };

  if(isContinueLoading)
  {
    return (
          <div className="min-h-screen bg-transparent flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F96C41] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading</p>
          </div>
        </div>
        )
  }

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F96C41] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading</p>
        </div>
      </div>
      ) : (
        <>
          <div className="bg-black z-[9999]">
            <Navbar />
          </div>
          {/* Hotel Header */}
          <section className="bg-black text-white px-4 py-6 md:py-8 z-[9999]">
            <CenteredContent>
              <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-1">
                {hotelData?.name || "Hotel"}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">
                {hotelData?.city || "City"}
              </h2>
            </CenteredContent>
          </section>
          <CenteredContent className="z-[9999] w-full">
            {/* Hotel Image Section */}
            <div className="px-4 py-4 z-1">
              <div className="absolute top-0 left-0 z-[-1] bg-black rounded-b-4xl h-[37.5vh] lg:h-[50vh] w-screen"></div>
              <div className="relative w-full rounded-[20px] overflow-hidden">
                <div className="relative w-full aspect-video">
                  <Image
                    src={hotelData?.image}
                    alt={hotelData?.name || "Hotel"}
                    quality={100}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* FREE 25KWH Badge */}
                  <div className="absolute top-4 right-4 md:top-6 md:right-6">
                    <Image
                      src="/images/icons/discount.png"
                      alt="Gratis 25kWh 1night"
                      width={80}
                      height={80}
                      className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] object-contain"
                      quality={100}
                    />
                  </div>

                  {/* Hotel Info Card */}
                  <div className="absolute bottom-2 left-2 md:bottom-6 md:left-6 bg-white rounded-xl p-3 md:p-5 shadow-lg  max-w-[40vw] sm:max-w-[320px] md:max-w-[40vw] max-sm:h-20">
                    <h3 className="font-bold text-[8px]  md:text-xl md:mb-1 leading-tight">
                      {hotelData?.name || "Hotel Name"}
                    </h3>
                    <p className="text-gray-600 text-[8px] sm:text-xs md:text-base mb-1">
                      {hotelData?.city || "City"}
                    </p>
                    <p className="text-gray-600 text-[8px] sm:text-xs md:text-base mb-1 sm:mb-2 md:mb-3 leading-tight">
                      {hotelData?.address || "Hotel Address"}
                    </p>
                    <div className="flex items-center">
                      <StarRating rating={hotelData?.rating || 0} className="w-3 h-3 md:w-5 md:h-5" />
                      <span className="text-xs md:text-base text-gray-600 ml-1">
                        {hotelData?.rating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="px-4 py-6 space-y-8">
              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-4">
                {formFields.slice(0, 2).map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    onChange={(value) => handleFieldChange(field.id, value)}
                  />
                ))}
              </div>

              {/* Guest and Room Selection */}
              <div className="grid grid-cols-2 gap-4">
                {formFields.slice(2, 4).map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    onChange={(value) => handleFieldChange(field.id, value)}
                  />
                ))}
              </div>
            </div>

            {/* Room Selection */}
            <div className="px-4">
              <h3 className="text-lg font-bold mb-4 text-gray-700">
                ROOM SELECTION
              </h3>

              {/* Room Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} onSelect={handleRoomSelect} />
                ))}
              </div>

              {/* Continue Button */}
              <div className="flex justify-center mx-auto mb-8">
                <button className="btn-gradient text-white px-12 py-3 rounded-lg font-medium  text-lg">
                  CONTINUE
                </button>
              </div>
            </div>

          </CenteredContent>
          <ToastContainer position="top-right" />
          <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 ">
            <div className=" max-w-full mx-auto xl:w-[1290px]">
              <CarDiv />
            </div>
          </div>
          <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 ">
            <div className=" max-w-full mx-auto xl:w-[1196px]">
              <Rentals />
            </div>
          </div>
          <div className="bg-black">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
