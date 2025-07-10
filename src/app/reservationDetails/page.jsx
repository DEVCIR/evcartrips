"use client"
import React, { useState } from 'react'
import { MapPin, Users,Check, Bed, Utensils, Moon, Star, User, Phone, Mail, Globe, ShieldCheck, SquareX, SquareCheck } from "lucide-react"
import Navbar from "../../common_components/navbar/page"
import Navbar1 from "../../common_components/navbar1/page"
import Footer from '../../components/ui/footer'
import Rentals from '../../common_components/rentals/page'
import CarDiv from '../../common_components/cardiv/page'

function ReservationDetails() {

  const [isCheck, setIsCheck] = useState(false);

  return (
    <div
      className="w-full min-h-screen bg-white"
    >

      <div className="bg-black  pt-4 pb-32 min-h-[50vh] md:min-h-[80vh] flex flex-col justify-start rounded-b-[18px]">
        <div className="xl:hidden px-4">
          <Navbar1 />
        </div>
        <div className="max-xl:hidden px-4">
          <Navbar />
        </div>

        <div className='w-full md:max-w-xl lg:max-w-3xl xl:max-w-5xl mx-auto mt-10 md:mt-14 px-4'><h1 className='text-white text-2xl  font-bold'>Reservation Details</h1></div>

      </div>


      {/* main content */}
      <div className='-mt-[10rem] md:-mt-[32rem] lg:-mt-[18rem] xl:-mt-[25rem] h-auto lg:flex lg:gap-x-6 px-4 mx-auto w-full lg:w-[135vh] max-lg:space-y-4'>
        {/* card1 */}
        <div className="w-full h-auto p-4 rounded-3xl md:max-w-xl lg:max-w-2xl mx-auto bg-white shadow-2xl mb-6">
          <div className="pb-3">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">Hotel Frankfurt Messe Affiliated by Meliá</h2>

            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 pt-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-4 h-4 fill-orange-400 text-orange-400" />
              ))}
              <Star className="w-4 h-4 text-gray-300" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 pt-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span className="text-base text-[#3F97E2]">Niederrad, 60-31 Frankfurt Am Main</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Check-in/Check-out */}
            <div className="flex-col items-center space-y-3 gap-3">

              <div className="flex items-center gap-3">
                <SquareCheck className="w-6 h-6 text-black rounded-sm" />

                <div className='flex justify-between items-center w-full'>
                  <p className="text-sm md:text-lg font-medium text-gray-900">Check in:</p>
                  <p className="text-sm md:text-lg text-gray-600">04/08/2026</p>
                </div>


              </div>
              <hr />

              <div className="flex items-center gap-3">

                <SquareX className=' w-6 h-6 text-black rounded-sm' />

                <div className='flex justify-between items-center w-full'>
                  <p className="text-sm md:text-lg font-medium text-gray-900">Check out:</p>
                  <p className="text-sm md:text-lg text-gray-600">04/08/2026</p>
                </div>
              </div>
            </div>
            <hr />

            {/* Nights */}
            <div className="flex items-center gap-3">
              <Moon className="w-6 h-6 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg font-medium text-gray-900">Nights:</span>
                <span className="text-sm md:text-lg text-gray-600">1</span>
              </div>
            </div>
            <hr />

            {/* Room */}
            <div className="flex items-center gap-3">
              <Bed className="w-6 h-6 text-black" />
              <div className="flex justify-between gap-x-2 items-center w-full">
                <span className="text-sm md:text-lg font-medium text-black">Room:</span>
                <span className=" text-sm md:text-lg text-gray-600">Standard room with two double bed</span>
              </div>
            </div>
            <hr />

            {/* Meal */}
            <div className="flex items-center gap-3">
              <Utensils className="w-6 h-6 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg font-medium text-black">Meal:</span>
                <span className="text-sm md:text-lg text-gray-600">Room with RO</span>
              </div>
            </div>
            <hr />

            {/* Travelers */}
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg font-medium text-black">Travelers:</span>
                <span className="text-sm md:text-lg text-gray-600">2 adult(s)</span>
              </div>
            </div>
            <hr />


            {/* Price */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 "></div>

              <div className="flex justify-between items-center pt-2 border-t w-full border-gray-100">

                <span className="text-sm md:text-lg font-medium text-black ">Price:</span>
                <span className="text-sm md:text-lg font-semibold text-gray-900">US$ 375.00</span>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="">
              <div className="flex items-center gap-2 pt-2">
                {/* <shieldcheck className="w-5 h-5 text-blue-500" /> */}
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                <button className="text-blue-500 text-base hover:underline">Cancellation policy</button>
              </div>


            </div>
          </div>
        </div>
        {/* card2 */}
        <div className="w-full h-auto p-4 rounded-3xl md:max-w-xl lg:max-w-2xl mx-auto bg-white shadow-2xl">
          <div className="pb-3">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-gray-900">Hotel Frankfurt Messe Affiliated by Meliá</h2>

            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 pt-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-4 h-4 fill-orange-400 text-orange-400" />
              ))}
              <Star className="w-4 h-4 text-gray-300" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 pt-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span className="text-base text-[#3F97E2]">Niederrad, 60-31 Frankfurt Am Main</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Check-in/Check-out */}
            <div className="flex-col items-center space-y-3 gap-3">

              <div className="flex items-center gap-3">
                <SquareCheck className="w-6 h-6 text-black rounded-sm" />

                <div className='flex justify-between items-center w-full'>
                  <p className="text-sm md:text-lg font-medium text-gray-900">Check in:</p>
                  <p className="text-sm md:text-lg text-gray-600">04/08/2026</p>
                </div>


              </div>
              <hr />

              <div className="flex items-center gap-3">

                <SquareX className=' w-6 h-6 text-black rounded-sm' />

                <div className='flex justify-between items-center w-full'>
                  <p className="text-sm md:text-lg font-medium text-gray-900">Check out:</p>
                  <p className="text-sm md:text-lg text-gray-600">04/08/2026</p>
                </div>
              </div>
            </div>
            <hr />

            {/* Nights */}
            <div className="flex items-center gap-3">
              <Moon className="w-6 h-6 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg font-medium text-gray-900">Nights:</span>
                <span className="text-sm md:text-lg text-gray-600">1</span>
              </div>
            </div>
            <hr />

            {/* Room */}
            <div className="flex items-center gap-3">
              <Bed className="w-6 h-6 text-black" />
              <div className="flex justify-between gap-x-2 items-center w-full">
                <span className="text-sm md:text-lg font-medium text-black">Room:</span>
                <span className=" text-sm md:text-lg text-gray-600">Standard room with two double bed</span>
              </div>
            </div>
            <hr />

            {/* Meal */}
            <div className="flex items-center gap-3">
              <Utensils className="w-6 h-6 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg font-medium text-black">Meal:</span>
                <span className="text-sm md:text-lg text-gray-600">Room with RO</span>
              </div>
            </div>
            <hr />

            {/* Travelers */}
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg font-medium text-black">Travelers:</span>
                <span className="text-sm md:text-lg text-gray-600">2 adult(s)</span>
              </div>
            </div>
            <hr />


            {/* Price */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 "></div>

              <div className="flex justify-between items-center pt-2 border-t w-full border-gray-100">

                <span className="text-sm md:text-lg font-medium text-black ">Price:</span>
                <span className="text-sm md:text-lg font-semibold text-gray-900">US$ 375.00</span>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="">
              <div className="flex items-center gap-2 pt-2">
                {/* <shieldcheck className="w-5 h-5 text-blue-500" /> */}
                <ShieldCheck className="w-5 h-5 text-blue-500" />
                <button className="text-blue-500 text-base hover:underline">Cancellation policy</button>
              </div>


            </div>
          </div>
        </div>



      </div>





      {/* form */}
      <div className='mt-10 px-0 md:px-24 mx-auto'>
        <div className="max-w-full mx-auto xl:w-[1200px] p-6 ">
          {/* Total Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Total</h1>
            <span className="text-2xl font-bold text-gray-900">$750.00</span>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Enter traveler details</h2>

            <form className="space-y-6">
              {/* Name Fields Row */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="firstName" className="md:text-sm text-xs absolute top-[-12px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
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
                  <label htmlFor="lastName" className="md:text-sm text-xs absolute top-[-12px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
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
                  <label htmlFor="countryCode" className="md:text-sm text-xs font-medium absolute top-[-12px] left-2 md:left-6 bg-[#F6F6F6] py-1 px-1 md:w-[45%] w-[70%] text-gray-700 flex items-center gap-2">
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
                  <label htmlFor="phoneNumber" className="md:text-sm text-xs absolute top-[-12px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
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
                <label htmlFor="email" className="md:text-sm text-xs absolute top-[-12px] bg-[#F6F6F6] py-1 px-3 left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
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

              {/* Submit Button */}

            </form>
          </div>
          {/* continue */}
          <div className="w-full mx-auto py-6 space-y-6">
            {/* Notification Box */}
            <div className="bg-orange-50 border border-l-4 border-orange-100 border-l-[#F96C41] rounded-full  py-5 px-6">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-medium">Note:</span> All communication regarding your booking will be sent to this email
                address and/or mobile number.
              </p>
            </div>

            {/* Terms Agreement */}
            <div className={`flex ${isCheck === true ? 'items-center' : 'items-start'}  space-x-3 px-2`}>
              {/* <Check/> */}
              <input id="orange-checkbox" type='checkbox'  className={`h-5 w-5  rounded-full border-2  border-gray-300 
                 
                 focus:outline-none focus:ring-2 focus:ring-orange-200
                 transition-colors duration-200 ${isCheck ? 'hidden' : undefined}`}
                checked={isCheck}
                onChange={() => setIsCheck(!isCheck)}
              />
              {isCheck && <Check onClick={() => setIsCheck(!isCheck)} className="w-4 h-4 text-white font-bold bg-orange-500 px-2 py-2 rounded-full cursor-pointer" />
              }
              <label className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                I understand and agree with the{" "}
                <a href="#" className="text-blue-500 hover:text-blue-600 underline">
                  Privacy Policy
                </a>
                , the{" "}
                <a href="#" className="text-blue-500 hover:text-blue-600 underline">
                  Terms & Conditions
                </a>{" "}
                of <span className="font-medium">evcartrips</span>
              </label>
            </div>

            {/* Continue Button */}
            <button
              className="w-full cursor-pointer  bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg text-base"

            >
              CONTINUE
            </button>
          </div>
        </div>

      </div>


      <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 ">
        <div className="max-w-full mx-auto xl:w-[1200px]">
          <CarDiv />
        </div>
      </div>

      {/* Rentals Component */}
      <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 ">
        <div className="max-w-full mx-auto">
          <Rentals />
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  )
}

export default ReservationDetails