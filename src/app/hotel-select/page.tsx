"use client";

import Image from "next/image";
import {
  redirect,
  // useSearchParams,
  // useRouter
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
import {ChevronDown } from "lucide-react";
import type { Room, FormField as FormFieldType } from "./types/hotel";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import Error from "next/error";

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

  // const [hotelData, setHotelData] = useState<any>(null)

  // // Load from localStorage on mount
  // useEffect(() => {
  //   const raw:string = localStorage.getItem( "selectedHotel" ) || "";
  //   try {
  //     setHotelData(raw?.startsWith("eyJ") ? raw : JSON.parse(raw))
  //   } catch (error){
  //     console.log(error)
  //     setHotelData(null)
  //   }
  // }, [])

  // // Save to localStorage whenever hotelData changes
  // useEffect(() => {
  //   if (hotelData === null) return
  //   try {
  //     const toStore =
  //       typeof hotelData === "string" && hotelData.startsWith("eyJ")
  //         ? hotelData
  //         : JSON.stringify(hotelData)
  //     localStorage.setItem("selectedHotel", toStore)
  //   } catch(error)
  //   {
  //     console.log(error);
  //   }
  // }, [hotelData])

  // const router = useRouter();

  // useEffect(() => {
  //   console.log(hotelData);
  // }, [hotelData]);
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

  // Form fields data
  const formFields: FormFieldType[] = [
    {
      id: "checkin",
      label: "Check in",
      icon: <CalendarIcon className="w-4 h-4 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-16 4k:h-16 mr-1 fhd:mr-3 2k:mr-5 4k:mr-8 text-gray-400" />,
      arrow:<ChevronDown className="w-4 h-4 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-16 4k:h-16 mr-1 fhd:mr-3 2k:mr-5 4k:mr-8 text-gray-400" />,
      type: "date",
      value: formatDateString(hotelData?.checkin),
    },
    {
      id: "checkout",
      label: "Check out",
      icon: <CalendarIcon className="w-4 h-4 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-16 4k:h-16 mr-1 fhd:mr-3 2k:mr-5 4k:mr-8 text-gray-400" />,
      arrow:<ChevronDown className="w-4 h-4 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-16 4k:h-16 mr-1 fhd:mr-3 2k:mr-5 4k:mr-8 text-gray-400" />,
      type: "date",
      value: formatDateString(hotelData?.checkout),
    },
    {
      id: "guests",
      label: "Guest",
      icon: <UserIcon className="w-4 h-4 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-16 4k:h-16 mr-1 fhd:mr-3 2k:mr-5 4k:mr-8 text-gray-400" />,
      arrow:<ChevronDown className="w-4 h-4 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-16 4k:h-16 mr-1 fhd:mr-3 2k:mr-5 4k:mr-8 text-gray-400" />,
      type: "select",
      value: `${hotelData?.travelers || 1} Guest${hotelData?.travelers > 1 ? 's' : ''}`,
      options: ["1 Guest", "2 Guests", "3 Guests", "4 Guests"],
    },
    {
      id: "rooms",
      label: "Room",
      icon: <RoomIcon className="w-4 h-4 fhd:w-7 fhd:h-8 2k:w-12 2k:h-12 4k:w-16 4k:h-16 mr-1 fhd:mr-3 2k:mr-5 4k:mr-8 text-gray-400" />,
      arrow:<ChevronDown className="w-4 h-4 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-16 4k:h-16 mr-1 fhd:mr-3 2k:mr-5 4k:mr-8 text-gray-400" />,
      type: "select",
      value: `${hotelData?.nights || 1} Room${hotelData?.nights > 1 ? 's' : ''}`,
      options: ["1 Room", "2 Rooms", "3 Rooms"],
    },
  ];

  const handleFieldChange = (fieldId: string, value: string) => {
    console.log(`Field ${fieldId} changed to:`, value);
    // Handle form field changes here
  };

  const handleRoomSelect = (roomId: string) => {
    const selectedRoom = rooms.find(room => room.id === roomId);
    if (selectedRoom) {
      // Save both hotel and room details
      const reservationDetails = {
        ...hotelData,
        selectedRoom,
      };
      localStorage.setItem('reservationDetails', JSON.stringify(reservationDetails));
      redirect('/reservationDetails');
    }
  };

  return (
    <>
      <div className="bg-black z-[9999]">
        <Navbar />
      </div>
      {/* Hotel Header */}
      <section className="bg-black text-white px-4 py-6 md:py-8 fhd:py-12 2k:py-18 4k:py-24 z-[9999]">
        <CenteredContent>
          <h1 className="text-2xl md:text-3xl lg:text-5xl fhd:text-7xl 2k:text-8xl 4k:text-[10rem] font-bold mb-1 fhd:mb-2">
            {hotelData?.name || "Hotel"}
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-5xl fhd:text-7xl 2k:text-8xl 4k:text-[10rem]  font-bold">
            {hotelData?.city || "City"}
          </h2>
        </CenteredContent>
      </section>
      <CenteredContent className="z-[9999] w-full">
        {/* Hotel Image Section */}
        <div className="px-4 py-4 z-1">
          <div className="absolute top-0 left-0 z-[-1] bg-black rounded-b-4xl h-[37.5vh] lg:h-[50vh] w-screen"></div>
          <div className="relative w-full rounded-[20px] fhd:rounded-[45px] 2k:rounded-[65px] 4k:rounded-[100px] overflow-hidden">
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
              <div className="absolute top-4 fhd:top-10 2k:top-12 4k:top-16 right-4 md:top-6 md:right-6 fhd:right-10 2k:right-14 4k:right-20">
                <Image
                  src="/images/icons/discount.png"
                  alt="Gratis 25kWh 1night"
                  width={80}
                  height={80}
                  className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] fhd:w-[160px] fhd:h-[160px] 2k:w-[210px] 2k:h-[210px] 4k:w-[300px] 4k:h-[300px] object-contain"
                  quality={100}
                />
              </div>

              {/* Hotel Info Card */}
              <div className="absolute bottom-2 left-2 fhd:bottom-8 fhd:left-8 2k:bottom-12 2k:left-12 4k:bottom-18 4k:left-18  md:bottom-6 md:left-6 bg-white rounded-xl fhd:rounded-3xl 2k:rounded-4xl 4k:rounded-[3rem] p-3 md:p-5 fhd:p-8 2k:p-12 4k:p-18 shadow-lg  max-w-[40vw] sm:max-w-[320px] md:max-w-[40vw] fhd:max-w-[50vw]  max-sm:h-20 ">
                <h3 className="font-bold text-[8px]  md:text-xl fhd:text-4xl 2k:text-6xl 4k:text-8xl md:mb-1 fhd:mb-3 2k:mb-6 leading-tight">
                  {hotelData?.name || "Hotel Name"}
                </h3>
                <p className="text-gray-600 text-[8px] sm:text-xs fhd:text-2xl 2k:text-4xl 4k:text-6xl md:text-base mb-1 fhd:mb-3 2k:mb-6">
                  {hotelData?.city || "City"}
                </p>
                <p className="text-gray-600 text-[8px] sm:text-xs fhd:text-2xl 2k:text-4xl 4k:text-6xl md:text-base mb-1 fhd:mb-3 2k:mb-6 sm:mb-2 md:mb-3 leading-tight">
                  {hotelData?.address || "Hotel Address"}
                </p>
                <div className="flex items-center">
                  <StarRating rating={hotelData?.rating || 0} className="w-3 h-3 md:w-5 md:h-5 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-18 4k:h-18" />
                  <span className="text-xs md:text-base fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600 ml-1 fhd:ml-2 2k:ml-4 4k:ml-8">
                    {hotelData?.rating?.toFixed(1) || "0.0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="px-4 py-6 fhd:py-10 2k:py-14 4k:py-32 space-y-8 fhd:space-y-12 2k:space-y-16 4k:space-y-24">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4 fhd:gap-6 2k:gap-10 4k:gap-14">
            {formFields.slice(0, 2).map((field) => (
              <FormField
                key={field.id}
                field={field}
                onChange={(value) => handleFieldChange(field.id, value)}
              />
            ))}
          </div>

          {/* Guest and Room Selection */}
          <div className="grid grid-cols-2 gap-4 fhd:gap-6 2k:gap-10 4k:gap-14">
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
          <h3 className="text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-bold mb-4 fhd:mb-8 2k:mb-12 4k:mb-18 text-gray-700">
            ROOM SELECTION
          </h3>

          {/* Room Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 fhd:gap-5 2k:gap-7 4k:gap-10 mb-6 fhd:mb-10 2k:mb-14 4k:mb-18">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} onSelect={handleRoomSelect} />
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center mx-auto mb-8 fhd:mb-12 2k:mb-16 4k:mb-20">
            <button className="btn-gradient text-white w-full sm:w-[250px] md:w-[381px] fhd:w-[650px] 2k:w-[866px] 4k:w-[1100px] px-12 py-3 fhd:py-8 2k:py-10 4k:py-20 rounded-lg fhd:rounded-xl 2k:rounded-2xl 4k:rounded-4xl font-medium  text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl">
              CONTINUE
            </button>
          </div>
        </div>

      </CenteredContent>
      <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 fhd:px-6">
        <div className="max-w-full mx-auto xl:w-[1200px] fhd:w-[70%] 2k:w-[67%] 4k:w-[64%]">
          <CarDiv />
        </div>
      </div>
      <div className="px-8 md:px-14 lg:px-20 xl:px-48 fhd:px-6 mt-4 pb-8 ">
        <div className="max-w-full mx-auto xl:w-[1196px] fhd:w-[70%] 2k:w-[67%] 4k:w-[64%]">
          <Rentals />
        </div>
      </div>
      <div className="bg-black">

        <Footer />

      </div>
    </>
  );
}
