"use client"
import Image from "next/image"
import { useState } from "react"
import { Users, Bed, Utensils, ChevronDown, CreditCard, Building2, Coins, Info, UserIcon, User, Globe, Phone, Mail, ClockAlert, LockKeyhole, Earth } from "lucide-react"
import { Star, Car, Coffee, ChevronRight } from "lucide-react"
import { MealIcon, RoomIcon } from "../hotel-select/components/Icons"
import HalfNavbar1 from "../../common_components/halfnavbar1/page"
import Navbar from "../../common_components/navbar/page"
import Footer from '../../components/ui/footer'
import Rentals from '../../common_components/rentals/page'
import CarDiv from '../../common_components/cardiv/page'

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [formData, setFormData] = useState({
    firstName: "Billal",
    lastName: "Hossain",
    countryCode: "Spain (+34)",
    phone: "123-34-5556",
    email: "billal@gmail.com",
    cardNumber: "1234 1234 1234 1234",
    expiryDate: "MM/YY",
    securityCode: "CVC",
    country: "Spain",
  })

  const hotels = [
    {
      id: 1,
      name: "Hotel Frankfurt Messe",
      subtitle: "Affiliated by Melia",
      image: "/images/double-room.png",
      checkIn: "Saturday, 10 May 2025",
      checkOut: "Sunday, 11 May 2025",
      price: "375.00",
      nights: 1,
      occupancy: "Double occupancy",
    },
    {
      id: 2,
      name: "Frankfurt EcoLuxe Inn &",
      subtitle: "Charging Suites",
      image: "/images/double-room.png",
      checkIn: "Saturday, 10 May 2025",
      checkOut: "Sunday, 11 May 2025",
      price: "375.00",
      nights: 1,
      occupancy: "Double occupancy",
    },
  ];

  const roomDetails = [
    {
      icon: <UserIcon className="md:w-4 md:h-4 h-2 w-2 fhd:h-8 fhd:w-8 2k:h-12 4k:w-12  mr-1" />,
      text: `2 Sleeps`,
    },
    { icon: <RoomIcon className="md:w-4 md:h-4 h-2 w-2 fhd:h-8 fhd:w-8 2k:h-12 4k:w-12  mr-1" />, text: "Double" },
    { icon: <MealIcon className="md:w-4 md:h-4 h-2 w-2 fhd:h-8 fhd:w-8 2k:h-12 4k:w-12  mr-1" />, text: "Bread and Breakfast BB" },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={12} className={index < rating ? "fill-orange-400 text-orange-400" : "text-gray-300"} />
    ))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Payment Header */}


      <div
        className="bg-black px-3 sm:px-4 pt-1 pb-4 min-h-[50vh] md:min-h-[60vh] flex flex-col rounded-b-[16px] sm:rounded-b-[20px]">
        <div className="xl:hidden">
          <HalfNavbar1 />
        </div>
        <div className="max-xl:hidden">
          <Navbar />
        </div>
      </div>

      <div className="-mt-[16rem] md:-mt-[30rem] lg:-mt-[16rem] xl:-mt-[20rem] fhd:-mt-[28rem] 2k:-mt-[46rem] 4k:-mt-[66rem] px-2">

        <div className="max-md:px-2 py-6  max-w-md md:max-w-md md:flex md:justify-center w-full md:px-14 lg:px-20 mt-4  md:mt-24 lg:mt-0  pb-8 xl:px-48  mx-auto">
          <h1 className="text-2xl fhd:text-5xl 2k:text-7xl 4k:text-9xl font-semibold text-white">Payment</h1>
        </div>

        {/* Step 1: Review and Book */}
        <div className=" mb-6 w-full md:px-14 lg:px-0 mt-4 pb-8 xl:px-48 fhd:px-[370px] 2k:px-[400px] 4k:px-[490px]  mx-auto">
          <div className="flex items-center gap-3 fhd:gap-4 2k:gap-5 4k:gap-6 mb-4 fhd:mb-12 2k:my-22 4k:my-28">
            <div className="w-6 h-6 fhd:w-12 fhd:h-12 2k:w-16 2k:h-16 4k:w-20 4k:h-20 bg-[#F96C41] rounded-full flex items-center justify-center text-sm fhd:text-xl 2k:text-3xl 4k:text-5xl font-semibold text-white">
              1
            </div>
            <span className="fhd:text-4xl 2k:text-5xl 4k:text-7xl  text-lg font-medium text-white">Review and Book your trip</span>
          </div>

          <div className="w-full md:px-10 lg:px-20  mt-4 pb-8 xl:px-10  mx-auto bg-white shadow-2xl rounded-3xl fhd:rounded-4xl 2k:rounded-[4rem] 4k:rounded-[6rem] p-4  fhd:p-8  2k:p-14 space-y-4">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-3xl fhd:rounded-4xl 2k:rounded-[4rem] 4k:rounded-[6rem] p-4 fhd:p-8  2k:p-14 shadow-sm border border-gray-200">
                <div className="flex gap-3 fhd:gap-5 2k:gap-8 4k:gap-10">
                  {/* Hotel Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      width={100}
                      height={80}
                      className="rounded-lg 2k:rounded-4xl object-cover w-[140px] h-[140px] xl:w-[300px] xl:h-[200px] fhd:w-[410px] fhd:h-[340px] 2k:w-[600px] 2k:h-[410px] 4k:w-[900px]  4k:h-[660px]"
                    />
                  </div>

                  {/* Hotel Details */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 fhd:mb-4 2k:mb-6 4k:mb-10">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base fhd:text-2xl 2k:text-4xl 4k:text-6xl leading-tight">{hotel.name}</h3>
                      <p className="text-gray-600 text-sm fhd:text-xl 2k:text-2xl 4k:text-4xl">{hotel.subtitle}</p>
                    </div>

                    {/* Rating and Amenities */}
                    <div className="flex md:flex-wrap flex-wrap items-center gap-x-4 text-[7px] fhd:text-[20px] 2k:text-[36px] 4k:text-[50px]   md:text-base text-[#797979] mb-1 fhd:mb-5 2k:mb-8 4k:mb-12">
                      {roomDetails.map((detail, index) => (
                        <div key={index} className="flex items-center bg-[#D9D9D99C] md:px-3 px-2 py-1 fhd:px-6 fhd:py-4 2k:px-7 2k:py-5  rounded-2xl fhd:rounded-4xl 2k:rounded-[8rem] mb-2">
                          {detail.icon}
                          {detail.text}
                        </div>
                      ))}
                    </div>

                    {/* More room details link */}
                    <button className="flex items-center gap-1 text-blue-500 text-[8px] md:text-[16px] fhd:text-[20px] 2k:text-[31px] 4k:text-[43px] md:font-semibold bg-[#D9D9D99C] px-3 py-1 fhd:px-6 fhd:py-4 2k:px-7 2k:py-5 rounded-2xl fhd:rounded-4xl 2k:rounded-[8rem] mb-3 hover:text-blue-600">
                      <span>More room details</span>
                      <ChevronRight size={12} className="fhd:w-5 fhd:h-5 2k:w-8 2k:h-8 4k:w-10 4k:h-10" />
                    </button>
                  </div>
                </div>

                {/* Check-in/Check-out and Price */}
                <div className="flex justify-between items-end mt-4 fhd:mt-6 2k:mt-8 4k:mt-10">
                  <div className="text-[10px] md:text-[16px] fhd:text-[20px] 2k:text-[30px] 4k:text-[45px] text-gray-600 font-bold tracking-wide mb-2">
                    <div>Check-in: <span className="text-gray-600 font-semibold">{hotel.checkIn}</span></div>
                    <div>Check-out: <span className="text-gray-600 font-semibold">{hotel.checkOut}</span> </div>
                  </div>
                  <div className="text-center 2k:space-y-3  ">
                    <div className="text-xs md:text-sm fhd:text-base 2k:text-3xl 4k:text-4xl  mx-auto w-[50%] text-gray-600">
                      {hotel.nights} night{hotel.nights > 1 ? "s" : ""}
                    </div>
                    <div className="text-lg fhd:text-xl 2k:text-4xl 4k:text-6xl font-bold text-gray-900">US$ {hotel.price}</div>
                    <div className="text-xs fhd:text-base 2k:text-3xl 4k:text-4xl md:text-sm text-gray-600">{hotel.occupancy}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Traveler Details */}
        <div className="px-4 mb-6 fhd:mb-10  w-full md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 fhd:px-[370px] 2k:px-[400px] 4k:px-[490px]  mx-auto">
          <div className="flex items-center gap-3 fhd:gap-4 2k:gap-5 4k:gap-6 mb-4 fhd:mb-12 2k:my-22 4k:my-28 ">
            <div className="w-6 h-6 fhd:w-12 fhd:h-12 2k:w-16 2k:h-16 4k:w-20 4k:h-20 bg-[#F96C41] rounded-full flex items-center justify-center text-sm fhd:text-xl 2k:text-3xl 4k:text-5xl font-semibold text-white">
              2
            </div>
            <span className=" fhd:text-4xl 2k:text-5xl 4k:text-7xl  text-gray-900 text-lg font-medium">Traveler details</span>
          </div>
          <form className="space-y-6 fhd:space-y-12 2k:space-y-16 4k:space-y-18">
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="firstName" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl absolute top-[-12px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px]  py-1 fhd:py-2.5 2k:py-4 4k:py-5 px-3 fhd:px-6 2k:px-9 4k:px-14 bg-[#F6F6F6] left-2 md:left-6 4k:left-10 font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500" />
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"

                  className="w-full px-5 fhd:px-8 2k:px-12 4k:px-18  py-4 fhd:py-7 2k:py-10 4k:py-16 fhd:text-2xl 2k:text-4xl 4k:text-6xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="lastName" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl absolute top-[-12px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px]  py-1 fhd:py-2.5 2k:py-4 4k:py-5 px-3 fhd:px-6 2k:px-9 4k:px-14 bg-[#F6F6F6] left-2 md:left-6 4k:left-10 font-medium text-gray-700 flex items-center gap-2">
                  <User className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500" />
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"

                  className="w-full px-5 fhd:px-8 2k:px-12 4k:px-18  py-4 fhd:py-7 2k:py-10 4k:py-16 fhd:text-2xl 2k:text-4xl 4k:text-6xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Country Code and Phone Row */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <div className="relative">
                <label htmlFor="countryCode" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl absolute top-[-12px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px]  py-1 fhd:py-2.5 2k:py-4 4k:py-5 px-3 fhd:px-6 2k:px-9 4k:px-14 bg-[#F6F6F6] left-2 md:left-6 4k:left-10 font-medium text-gray-700 flex items-center gap-2 md:w-[55%] w-[70%] ">
                  <Globe className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500" />
                  Country Code
                </label>
                <select id="default" className="w-full px-5 py-4 2k:px-12 4k:px-18 fhd:px-8  fhd:py-7  2k:py-9 4k:py-16  border border-gray-300 rounded-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent  ">
                  <option defaultValue >Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>

              </div>

              <div className="space-y-0 relative">
                <label htmlFor="phoneNumber" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl absolute top-[-12px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px]  py-1 fhd:py-2.5 2k:py-4 4k:py-5 px-3 fhd:px-6 2k:px-9 4k:px-14 bg-[#F6F6F6] left-2 md:left-6 4k:left-10 font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500" />
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone number"


                  className="w-full px-5 fhd:px-8 2k:px-12 4k:px-18  py-4 fhd:py-7 2k:py-10 4k:py-16 fhd:text-2xl 2k:text-4xl 4k:text-6xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl absolute top-[-12px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px]  py-1 fhd:py-2.5 2k:py-4 4k:py-5 px-3 fhd:px-6 2k:px-9 4k:px-14 bg-[#F6F6F6] left-2 md:left-6 4k:left-10 font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"

                className="w-full px-5 fhd:px-8 2k:px-12 4k:px-18  py-4 fhd:py-7 2k:py-10 4k:py-16 fhd:text-2xl 2k:text-4xl 4k:text-6xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>



          </form>


        </div>

        {/* Step 3: Billing Details */}
        <div className="px-4 mb-6 max-w-full md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 fhd:px-[370px] 2k:px-[400px] 4k:px-[490px]  mx-auto">
          <div className="flex items-center gap-3 fhd:gap-4 2k:gap-5 4k:gap-6 mb-4 fhd:mb-12 2k:my-20 4k:my-24">
            <div className="w-6 h-6 fhd:w-12 fhd:h-12 2k:w-16 2k:h-16 4k:w-20 4k:h-20 bg-[#F96C41] rounded-full flex items-center justify-center text-sm fhd:text-xl 2k:text-3xl 4k:text-5xl font-semibold text-white">
              3
            </div>
            <span className="text-lg fhd:text-4xl 2k:text-5xl 4k:text-7xl font-medium">Enter billing details</span>
          </div>

          <p className="text-sm fhd:text-xl 2k:text-4xl 4k:text-6xl text-gray-400 mb-4 fhd:mb-6 2k:mb-8 2k:mb-12">
            Your card details are safe with us - we don't store your information.
          </p>

          {/* Payment Methods */}
          <div className="flex gap-y-2 md:gap-x-2   flex-col md:flex-row mb-6 fhd:mb-12 2k:mb-14 4k:mb-20">
            <button
              onClick={() => setSelectedPayment("card")}
              className={`flex-1 p-3 fhd:p-6 2k:p-8 4k:p-14 rounded-lg border flex items-center justify-center gap-2 ${selectedPayment === "card" ? "border-[#F96C41] bg-[#F96C41] text-white" : "border-gray-300 bg-transparent"
                }`}
            >
              <CreditCard className="w-5 h-5 fhd:w-8 fhd:h-8  2k:w-14 2k:h-14 4k:w-16 4k:h-16 " />
              <span className="text-sm fhd:text-xl 2k:text-4xl 4k:text-6xl">Transfer</span>
            </button>
            <button
              onClick={() => setSelectedPayment("transfer")}
              className={`flex-1 p-3 fhd:p-6 2k:p-8 4k:p-14 rounded-lg border flex items-center justify-center gap-2 ${selectedPayment === "transfer" ? "border-[#F96C41] bg-[#F96C41] text-white" : "border-gray-300 bg-transparent"
                }`}
            >
              <Building2 className="w-5 h-5 fhd:w-8 fhd:h-8  2k:w-14 2k:h-14 4k:w-16 4k:h-16" />
              <span className="text-sm fhd:text-xl 2k:text-4xl 4k:text-6xl">Transfer</span>
            </button>
            <button
              onClick={() => setSelectedPayment("crypto")}
              className={`flex-1 p-3 fhd:p-6 2k:p-8 4k:p-14 rounded-lg border flex items-center justify-center gap-2 ${selectedPayment === "crypto" ? "border-[#F96C41] bg-[#F96C41] text-white" : "border-gray-300 bg-transparent"
                }`}
            >
              <Coins className="w-5 h-5 fhd:w-8 fhd:h-8  2k:w-14 2k:h-14 4k:w-16 4k:h-16 text-orange-500" />
              <span className="text-sm fhd:text-xl 2k:text-4xl 4k:text-6xl">Crypto</span>
            </button>
          </div>

          {/* Card Details */}
          <div className="space-y-6 fhd:space-y-10 2k:space-y-14 4k:space-y-20">
            {/* card number and expiration date */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">


              <div className="space-y-0 relative">
                <label htmlFor="phoneNumber" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl absolute top-[-12px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px]  py-1 fhd:py-2.5 2k:py-4 4k:py-5 px-3 fhd:px-6 2k:px-9 4k:px-14 bg-[#F6F6F6] left-2 md:left-6 4k:left-10 font-medium text-gray-700 flex items-center gap-2">

                  <CreditCard className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500" />
                  Card Number
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="1234 1234 1234"


                  className="w-full px-5 fhd:px-8 2k:px-12 4k:px-18  py-4 fhd:py-7 2k:py-11 4k:py-16 fhd:text-2xl 2k:text-4xl 4k:text-6xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                />
              </div>
              <div className="relative">
                <label htmlFor="countryCode" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl rounded-md font-medium absolute top-[-10px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px] left-2 md:left-6 4k:left-10 bg-[#F6F6F6] py-1 px-3 fhd:py-2.5 2k:py-4 4k:py-5 md:w-[46%] w-[70%] text-gray-700 flex items-center gap-2">
                  <ClockAlert className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500 " />
                  Expiration Date
                </label>
                <select id="default" className="w-full px-5 py-4 2k:px-12 4k:px-18 fhd:px-8  fhd:py-7  2k:py-10 4k:py-16  border border-gray-300 rounded-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent  ">
                  <option defaultValue >MM/YY</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>

              </div>
            </div>

            {/* securityand country */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">


              <div className="space-y-0 relative">
                <label htmlFor="phoneNumber" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl absolute top-[-12px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px]  py-1 fhd:py-2.5 2k:py-4 4k:py-5 px-3 fhd:px-6 2k:px-9 4k:px-14 bg-[#F6F6F6] left-2 md:left-6 4k:left-10 font-medium text-gray-700 flex items-center gap-2">
                  <LockKeyhole className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500" />
                  Security Code
                </label>
                <input
                  id="phoneNumber"
                  type="tel"
                  placeholder="CVC"


                  className="w-full px-5 fhd:px-8 2k:px-12 4k:px-18  py-4 fhd:py-7 2k:py-11 4k:py-16 fhd:text-2xl 2k:text-4xl 4k:text-6xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent g "
                />
              </div>
              <div className="relative">
                <label htmlFor="countryCode" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl absolute top-[-12px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px]  py-1 fhd:py-2.5 2k:py-4 4k:py-5 px-3 fhd:px-6 2k:px-9 4k:px-14 bg-[#F6F6F6] left-2 md:left-6 4k:left-10 font-medium text-gray-700 flex items-center gap-2 md:w-[40%] w-[50%] ">
                  <Earth className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500" />
                  Country
                </label>
                <select id="default" className="w-full px-5 py-4 2k:px-12 4k:px-18 fhd:px-8  fhd:py-7  2k:py-10 4k:py-16  border border-gray-300 rounded-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent  ">
                  <option defaultValue >Spain</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>

              </div>
            </div>


          </div>
        </div>

        {/* Payment Summary */}
        <div className="px-4 mb-6 w-full md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 fhd:px-[370px] 2k:px-[400px] 4k:px-[490px]   mx-auto">
          <h3 className="text-lg fhd:text-4xl 2k:text-5xl 4k:text-7xl font-semibold mb-4">PAYMENT DETAILS</h3>

          <div className="space-y-3 fhd:space-y-5 2k:space-y-8 4k:space-y-12">
            <div className="flex justify-between">
              <span className="text-black fhd:text-xl 2k:text-3xl 4k:text-4xl">Total price</span>
              <span className="text-xl fhd:text-3xl 2k:text-4xl 4k:text-6xl font-bold">$750.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black fhd:text-xl 2k:text-3xl 4k:text-4xl">Pay now</span>
              <span className="text-xl fhd:text-3xl 2k:text-4xl 4k:text-6xl font-bold">$750.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F96C41] text-base fhd:text-xl 2k:text-3xl 4k:text-4xl">Taxes and fees due at property</span>
              <span className="text-base fhd:text-2xl 2k:text-4xl 4k:text-5xl text-black">$50.00</span>
            </div>
          </div>

          <p className="text-xs fhd:text-lg 2k:text-3xl 4k:text-5xl text-gray-500 mt-4 fhd:mt-6 2k:mt-8 4k:mt-10 text-center">
            By clicking 'Pay now' and proceeding with this booking, you agree to the Terms and Conditions
          </p>
        </div>

        {/* Pay Now Button */}
        <div className="px-4 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 fhd:px-[370px] 2k:px-[400px] 4k:px-[490px] max-w-full  mx-auto">
          <button className="w-full fhd:text-xl 2k:text-4xl 4k:text-6xl  btn-gradient text-white font-semibold py-4 fhd:py-6 2k:py-10 4k:py-16 rounded-xl text-lg">
            PAY NOW
          </button>
        </div>

      </div>

      <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 fhd:px-[370px] 2k:px-[400px] 4k:px-[490px] ">
        <div className="max-w-full  mx-auto">
          <CarDiv />
        </div>
      </div>

      {/* Rentals Component */}
      <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 fhd:px-[370px] 2k:px-[400px] 4k:px-[490px] ">
        <div className="max-w-full  mx-auto">
          <Rentals />
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  )
}
