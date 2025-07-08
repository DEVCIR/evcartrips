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
      icon: <UserIcon className="md:w-4 md:h-4 h-2 w-2 mr-1" />,
      text: `2 Sleeps`,
    },
    { icon: <RoomIcon className="md:w-4 md:h-4 h-2 w-2 mr-1" />, text: "Double" },
    { icon: <MealIcon className="md:w-4 md:h-4 h-2 w-2 mr-1" />, text: "Bread and Breakfast BB" },
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

      <div className="-mt-[16rem] md:-mt-[30rem] lg:-mt-[16rem] xl:-mt-[20rem] px-2">

      <div className="max-md:px-2 py-6  max-w-md md:max-w-sm md:flex md:justify-center lg:max-w-4xl lg:flex lg:justify-start lg:pl-[5%] xl:max-w-5xl  mx-auto">
        <h1 className="text-2xl font-semibold text-white">Payment</h1>
      </div>

      {/* Step 1: Review and Book */}
      <div className="max-md:px-2 mb-6 max-w-4xl  mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-sm font-semibold text-white">
            1
          </div>
          <span className="text-lg font-medium text-white">Review and Book your trip</span>
        </div>

        <div className="max-w-5xl  mx-auto bg-white shadow-2xl rounded-xl p-4 space-y-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
              <div className="flex gap-3">
                {/* Hotel Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    width={100}
                    height={80}
                    className="rounded-lg object-cover w-[140px] h-[140px] xl:w-[300px] xl:h-[200px]"
                  />
                </div>

                {/* Hotel Details */}
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight">{hotel.name}</h3>
                    <p className="text-gray-600 text-sm">{hotel.subtitle}</p>
                  </div>

                  {/* Rating and Amenities */}
                  <div className="flex md:flex-wrap flex-wrap items-center gap-x-4 text-[7px]   md:text-base text-[#797979] mb-3">
                    {roomDetails.map((detail, index) => (
                      <div key={index} className="flex items-center bg-[#D9D9D99C] md:px-3 px-2 py-1 rounded-2xl mb-2">
                        {detail.icon}
                        {detail.text}
                      </div>
                    ))}
                  </div>

                  {/* More room details link */}
                  <button className="flex items-center gap-1 text-blue-500 text-[8px] md:text-[16px] md:font-semibold bg-[#D9D9D99C] px-3 py-1 rounded-2xl mb-3 hover:text-blue-600">
                    <span>More room details</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Check-in/Check-out and Price */}
              <div className="flex justify-between items-end mt-4">
                <div className="text-[10px] md:text-[16px] text-gray-600 font-bold tracking-wide mb-2">
                  <div>Check-in: <span className="text-gray-600 font-semibold">{hotel.checkIn}</span></div>
                  <div>Check-out: <span className="text-gray-600 font-semibold">{hotel.checkOut}</span> </div>
                </div>
                <div className="text-center">
                  <div className="text-xs md:text-sm mx-auto w-[50%] text-gray-600">
                    {hotel.nights} night{hotel.nights > 1 ? "s" : ""}
                  </div>
                  <div className="text-lg font-bold text-gray-900">US$ {hotel.price}</div>
                  <div className="text-xs md:text-sm text-gray-600">{hotel.occupancy}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: Traveler Details */}
      <div className="px-4 mb-6 mt-10 max-w-4xl  mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-sm font-semibold text-white">
            2
          </div>
          <span className="text-lg font-medium">Traveler details</span>
        </div>
        <form className="space-y-6">
          {/* Name Fields Row */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="firstName" className="md:text-sm text-xs rounded-md absolute top-[-12px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
                <User className="w-3 h-3 text-gray-500" />
                First Name*
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"

                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="lastName" className="md:text-sm text-xs rounded-md  absolute top-[-12px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
                <User className="w-3 h-3 text-gray-500" />
                Last Name*
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"

                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Country Code and Phone Row */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="countryCode" className="md:text-sm text-[10px] rounded-md font-medium absolute top-[-12px] left-2 md:left-6 bg-[#F6F6F6] py-1 px-3 md:w-[55%] w-[70%] text-gray-700 flex items-center gap-2">
                <Globe className="w-3 h-3 text-gray-500" />
                Country Code
              </label>
              <select id="default" className="w-full px-5 py-4  border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent  ">
                <option defaultValue >Choose a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>

            </div>

            <div className="space-y-0 relative">
              <label htmlFor="phoneNumber" className="md:text-sm text-xs rounded-md absolute top-[-12px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-3 h-3 text-gray-500" />
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Phone number"


                className="w-full px-5 py-4 border border-gray-300 rounded-lg "
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="md:text-sm text-xs rounded-md absolute top-[-12px] bg-[#F6F6F6] py-1 px-3 left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-3 h-3 text-gray-500" />
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email address"

              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>



        </form>


      </div>

      {/* Step 3: Billing Details */}
      <div className="px-4 mb-6 max-w-4xl  mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-sm font-semibold text-white">
            3
          </div>
          <span className="text-lg font-medium">Enter billing details</span>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Your card details are safe with us - we don't store your information.
        </p>

        {/* Payment Methods */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSelectedPayment("card")}
            className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 ${selectedPayment === "card" ? "border-orange-500 bg-orange-500 text-white" : "border-gray-300 bg-transparent"
              }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-sm">Transfer</span>
          </button>
          <button
            onClick={() => setSelectedPayment("transfer")}
            className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 ${selectedPayment === "transfer" ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-transparent"
              }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-sm">Transfer</span>
          </button>
          <button
            onClick={() => setSelectedPayment("crypto")}
            className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 ${selectedPayment === "crypto" ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-transparent"
              }`}
          >
            <Coins className="w-5 h-5 text-orange-500" />
            <span className="text-sm">Crypto</span>
          </button>
        </div>

        {/* Card Details */}
        <div className="space-y-6">
          {/* card number and expiration date */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">


            <div className="space-y-0 relative">
              <label htmlFor="phoneNumber" className="md:text-sm text-xs rounded-md absolute top-[-10px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
                
               <CreditCard className="w-3 h-3 text-gray-500"/>
                Card Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="1234 1234 1234"


                className="w-full px-5 py-4 border border-gray-300 rounded-lg "
              />
            </div>
            <div className="relative">
              <label htmlFor="countryCode" className="md:text-sm text-xs rounded-md font-medium absolute top-[-10px] left-2 md:left-6 bg-[#F6F6F6] py-1 px-1 md:w-[50%] w-[70%] text-gray-700 flex items-center gap-2">
                <ClockAlert className="w-3 h-3 text-gray-500 "/>
                Expiration Date 
              </label>
              <select id="default" className="w-full px-5 py-4  border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent  ">
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
              <label htmlFor="phoneNumber" className="md:text-sm text-xs rounded-md absolute top-[-10px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
                 <LockKeyhole className="w-3 h-3 text-gray-500" />
                Security Code
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="CVC"


                className="w-full px-5 py-4 border border-gray-300 rounded-lg "
              />
            </div>
            <div className="relative">
              <label htmlFor="countryCode" className="md:text-sm text-xs rounded-md font-medium absolute top-[-10px] left-2 md:left-6 bg-[#F6F6F6] py-1 px-1 md:w-[45%] w-[50%] text-gray-700 flex items-center gap-2">
                <Earth className="w-3 h-3 text-gray-500" />
                Country
              </label>
              <select id="default" className="w-full px-5 py-4  border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent  ">
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
      <div className="px-4 mb-6 max-w-3xl xl:max-w-4xl  mx-auto">
        <h3 className="text-lg font-semibold mb-4">PAYMENT DETAILS</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-black">Total price</span>
            <span className="text-xl font-bold">$750.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black">Pay now</span>
            <span className="text-xl font-bold">$750.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-orange-500 text-base">Taxes and fees due at property</span>
            <span className="text-base text-black">$50.00</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By clicking 'Pay now' and proceeding with this booking, you agree to the Terms and Conditions
        </p>
      </div>

      {/* Pay Now Button */}
      <div className="px-4 pb-8 max-w-4xl  mx-auto">
        <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 rounded-xl text-lg">
          PAY NOW
        </button>
      </div>

      </div>

      <div className="px-8 mt-4 pb-8 xl:px-40 max-md:hidden">
          <div className="max-w-5xl  mx-auto">
            <CarDiv />
          </div>
        </div>

        {/* Rentals Component */}
        <div className="px-8 mt-4 pb-8 xl:px-40 max-md:hidden">
          <div className="max-w-5xl  mx-auto">
            <Rentals />
          </div>
        </div>

      <div className="max-md:hidden">
        <Footer />
      </div>
    </div>
  )
}
