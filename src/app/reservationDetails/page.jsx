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

        <div className='w-full md:max-w-xl lg:max-w-3xl xl:max-w-5xl fhd:max-w-[89rem] 2k:max-w-[125rem] 4k:max-w-[175rem] mx-auto mt-10 md:mt-14 fhd:mt-36 2k:mt-66 4k:mt-[40rem] px-4'><h1 className='text-white text-2xl fhd:text-5xl 2k:text-7xl 4k:text-9xl  font-bold'>Reservation Details</h1></div>

      </div>


      {/* main content */}
      <div className='-mt-[10rem] md:-mt-[32rem] lg:-mt-[18rem] xl:-mt-[25rem] lg:gap-x-5 fhd:gap-12 2k:gap-14 lg:grid lg:grid-cols-2 h-auto  px-4 mx-auto w-full xl:w-[135vh] max-lg:space-y-4'>
        {/* card1 */}
        <div className="w-full h-auto p-4 fhd:p-8 2k:p-14 rounded-3xl md:max-w-xl lg:max-w-2xl fhd:max-w-3xl 2k:max-w-5xl 4k:max-w-[115rem]  mx-auto bg-white shadow-2xl mb-6">
          <div className="pb-3">
            <div className="space-y-1 fhd:space-y-3 2k:space-y-6 4k:space-y-10">
              <h2 className="text-lg fhd:text-3xl 2k:text-5xl 4k:text-7xl font-semibold text-gray-900">Hotel Frankfurt Messe Affiliated by Meliá</h2>

            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 fhd:gap-3 pt-1 fhd:pt-3 2k:pt-6 4k:pt-12">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-4 h-4 fhd:w-7 fhd:h-7 2k:w-12 2k:h-12 4k:w-18 4k:h-18 fill-orange-400 text-orange-400" />
              ))}
              <Star className="w-4 h-4 fhd:w-7 fhd:h-7 2k:w-12 2k:h-12 4k:w-18 4k:h-18 text-gray-300" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 fhd:gap-3 pt-2 fhd:pt-2 2k:pt-5 4k:pt-10">
              <MapPin className="w-5 h-5 fhd:w-6 fhd:h-6 2k:w-10 2k:h-10 4k:w-16 4k:h-16 text-blue-500" />
              <span className="text-base fhd:text-2xl 2k:text-4xl 4k:text-6xl text-[#3F97E2]">Niederrad, 60-31 Frankfurt Am Main</span>
            </div>
          </div>

          <div className="space-y-4 2k:space-y-6 4k:mt-8  4k:space-y-8">
            {/* Check-in/Check-out */}
            <div className="flex-col items-center space-y-3 gap-3 fhd:gap-5">

              <div className="flex items-center gap-3 fhd:gap-5 2k:gap-8 4k:gap-12 ">
                <SquareCheck className="w-6 h-6 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black rounded-sm" />

                <div className='flex justify-between items-center w-full '>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Check in:</p>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">04/08/2026</p>
                </div>


              </div>
              <hr />

              <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">

                <SquareX className=' w-6 h-6 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black rounded-sm' />

                <div className='flex justify-between items-center w-full'>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Check out:</p>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">04/08/2026</p>
                </div>
              </div>
            </div>
            <hr />

            {/* Nights */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Moon className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Nights:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">1</span>
              </div>
            </div>
            <hr />

            {/* Room */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Bed className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between gap-x-2 items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Room:</span>
                <span className=" text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">Standard room with two double bed</span>
              </div>
            </div>
            <hr />

            {/* Meal */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Utensils className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Meal:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">Room with RO</span>
              </div>
            </div>
            <hr />

            {/* Travelers */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Users className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Travelers:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">2 adult(s)</span>
              </div>
            </div>
            <hr />


            {/* Price */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <div className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 "></div>

              <div className="flex justify-between items-center pt-2  w-full ">

                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black ">Price:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-semibold text-gray-900">US$ 375.00</span>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="">
              <div className="flex items-center gap-2 pt-2">
                {/* <shieldcheck className="w-5 h-5 text-blue-500" /> */}
                <ShieldCheck className="w-5 h-5 fhd:w-7  2k:w-10 2k:h-10 4k:w-18 4k:h-18 text-blue-500" />
                <button className="text-blue-500 text-base fhd:text-xl 2k:text-3xl 4k:text-5xl hover:underline">Cancellation policy</button>
              </div>


            </div>
          </div>
        </div>
        {/* card2 */}
         <div className="w-full h-auto p-4 fhd:p-8 2k:p-14 rounded-3xl md:max-w-xl lg:max-w-2xl fhd:max-w-3xl 2k:max-w-5xl 4k:max-w-[115rem]  mx-auto bg-white shadow-2xl mb-6">
          <div className="pb-3">
            <div className="space-y-1 fhd:space-y-3 2k:space-y-6 4k:space-y-10">
              <h2 className="text-lg fhd:text-3xl 2k:text-5xl 4k:text-7xl font-semibold text-gray-900">Hotel Frankfurt Messe Affiliated by Meliá</h2>

            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 fhd:gap-3 pt-1 fhd:pt-3 2k:pt-6 4k:pt-12">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-4 h-4 fhd:w-7 fhd:h-7 2k:w-12 2k:h-12 4k:w-18 4k:h-18 fill-orange-400 text-orange-400" />
              ))}
              <Star className="w-4 h-4 fhd:w-7 fhd:h-7 2k:w-12 2k:h-12 4k:w-18 4k:h-18 text-gray-300" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 fhd:gap-3 pt-2 fhd:pt-2 2k:pt-5 4k:pt-10">
              <MapPin className="w-5 h-5 fhd:w-6 fhd:h-6 2k:w-10 2k:h-10 4k:w-16 4k:h-16 text-blue-500" />
              <span className="text-base fhd:text-2xl 2k:text-4xl 4k:text-6xl text-[#3F97E2]">Niederrad, 60-31 Frankfurt Am Main</span>
            </div>
          </div>

          <div className="space-y-4 2k:space-y-6 4k:mt-8  4k:space-y-8">
            {/* Check-in/Check-out */}
            <div className="flex-col items-center space-y-3 gap-3 fhd:gap-5">

              <div className="flex items-center gap-3 fhd:gap-5 2k:gap-8 4k:gap-12 ">
                <SquareCheck className="w-6 h-6 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black rounded-sm" />

                <div className='flex justify-between items-center w-full '>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Check in:</p>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">04/08/2026</p>
                </div>


              </div>
              <hr />

              <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">

                <SquareX className=' w-6 h-6 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black rounded-sm' />

                <div className='flex justify-between items-center w-full'>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Check out:</p>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">04/08/2026</p>
                </div>
              </div>
            </div>
            <hr />

            {/* Nights */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Moon className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Nights:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">1</span>
              </div>
            </div>
            <hr />

            {/* Room */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Bed className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between gap-x-2 items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Room:</span>
                <span className=" text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">Standard room with two double bed</span>
              </div>
            </div>
            <hr />

            {/* Meal */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Utensils className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Meal:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">Room with RO</span>
              </div>
            </div>
            <hr />

            {/* Travelers */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Users className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Travelers:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">2 adult(s)</span>
              </div>
            </div>
            <hr />


            {/* Price */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <div className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 "></div>

              <div className="flex justify-between items-center pt-2  w-full ">

                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black ">Price:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-semibold text-gray-900">US$ 375.00</span>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="">
              <div className="flex items-center gap-2 pt-2">
                {/* <shieldcheck className="w-5 h-5 text-blue-500" /> */}
                <ShieldCheck className="w-5 h-5 fhd:w-7  2k:w-10 2k:h-10 4k:w-18 4k:h-18 text-blue-500" />
                <button className="text-blue-500 text-base fhd:text-xl 2k:text-3xl 4k:text-5xl hover:underline">Cancellation policy</button>
              </div>


            </div>
          </div>
        </div>
        {/* card3 */}
         <div className="w-full h-auto p-4 fhd:p-8 2k:p-14 rounded-3xl md:max-w-xl lg:max-w-2xl fhd:max-w-3xl 2k:max-w-5xl 4k:max-w-[115rem]  mx-auto bg-white shadow-2xl mb-6">
          <div className="pb-3">
            <div className="space-y-1 fhd:space-y-3 2k:space-y-6 4k:space-y-10">
              <h2 className="text-lg fhd:text-3xl 2k:text-5xl 4k:text-7xl font-semibold text-gray-900">Hotel Frankfurt Messe Affiliated by Meliá</h2>

            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 fhd:gap-3 pt-1 fhd:pt-3 2k:pt-6 4k:pt-12">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-4 h-4 fhd:w-7 fhd:h-7 2k:w-12 2k:h-12 4k:w-18 4k:h-18 fill-orange-400 text-orange-400" />
              ))}
              <Star className="w-4 h-4 fhd:w-7 fhd:h-7 2k:w-12 2k:h-12 4k:w-18 4k:h-18 text-gray-300" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 fhd:gap-3 pt-2 fhd:pt-2 2k:pt-5 4k:pt-10">
              <MapPin className="w-5 h-5 fhd:w-6 fhd:h-6 2k:w-10 2k:h-10 4k:w-16 4k:h-16 text-blue-500" />
              <span className="text-base fhd:text-2xl 2k:text-4xl 4k:text-6xl text-[#3F97E2]">Niederrad, 60-31 Frankfurt Am Main</span>
            </div>
          </div>

          <div className="space-y-4 2k:space-y-6 4k:mt-8  4k:space-y-8">
            {/* Check-in/Check-out */}
            <div className="flex-col items-center space-y-3 gap-3 fhd:gap-5">

              <div className="flex items-center gap-3 fhd:gap-5 2k:gap-8 4k:gap-12 ">
                <SquareCheck className="w-6 h-6 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black rounded-sm" />

                <div className='flex justify-between items-center w-full '>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Check in:</p>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">04/08/2026</p>
                </div>


              </div>
              <hr />

              <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">

                <SquareX className=' w-6 h-6 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black rounded-sm' />

                <div className='flex justify-between items-center w-full'>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Check out:</p>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">04/08/2026</p>
                </div>
              </div>
            </div>
            <hr />

            {/* Nights */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Moon className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Nights:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">1</span>
              </div>
            </div>
            <hr />

            {/* Room */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Bed className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between gap-x-2 items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Room:</span>
                <span className=" text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">Standard room with two double bed</span>
              </div>
            </div>
            <hr />

            {/* Meal */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Utensils className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Meal:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">Room with RO</span>
              </div>
            </div>
            <hr />

            {/* Travelers */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Users className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Travelers:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">2 adult(s)</span>
              </div>
            </div>
            <hr />


            {/* Price */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <div className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 "></div>

              <div className="flex justify-between items-center pt-2  w-full ">

                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black ">Price:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-semibold text-gray-900">US$ 375.00</span>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="">
              <div className="flex items-center gap-2 pt-2">
                {/* <shieldcheck className="w-5 h-5 text-blue-500" /> */}
                <ShieldCheck className="w-5 h-5 fhd:w-7  2k:w-10 2k:h-10 4k:w-18 4k:h-18 text-blue-500" />
                <button className="text-blue-500 text-base fhd:text-xl 2k:text-3xl 4k:text-5xl hover:underline">Cancellation policy</button>
              </div>


            </div>
          </div>
        </div>
        {/* card4 */}
       <div className="w-full h-auto p-4 fhd:p-8 2k:p-14 rounded-3xl md:max-w-xl lg:max-w-2xl fhd:max-w-3xl 2k:max-w-5xl 4k:max-w-[115rem]  mx-auto bg-white shadow-2xl mb-6">
          <div className="pb-3">
            <div className="space-y-1 fhd:space-y-3 2k:space-y-6 4k:space-y-10">
              <h2 className="text-lg fhd:text-3xl 2k:text-5xl 4k:text-7xl font-semibold text-gray-900">Hotel Frankfurt Messe Affiliated by Meliá</h2>

            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1 fhd:gap-3 pt-1 fhd:pt-3 2k:pt-6 4k:pt-12">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-4 h-4 fhd:w-7 fhd:h-7 2k:w-12 2k:h-12 4k:w-18 4k:h-18 fill-orange-400 text-orange-400" />
              ))}
              <Star className="w-4 h-4 fhd:w-7 fhd:h-7 2k:w-12 2k:h-12 4k:w-18 4k:h-18 text-gray-300" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 fhd:gap-3 pt-2 fhd:pt-2 2k:pt-5 4k:pt-10">
              <MapPin className="w-5 h-5 fhd:w-6 fhd:h-6 2k:w-10 2k:h-10 4k:w-16 4k:h-16 text-blue-500" />
              <span className="text-base fhd:text-2xl 2k:text-4xl 4k:text-6xl text-[#3F97E2]">Niederrad, 60-31 Frankfurt Am Main</span>
            </div>
          </div>

          <div className="space-y-4 2k:space-y-6 4k:mt-8  4k:space-y-8">
            {/* Check-in/Check-out */}
            <div className="flex-col items-center space-y-3 gap-3 fhd:gap-5">

              <div className="flex items-center gap-3 fhd:gap-5 2k:gap-8 4k:gap-12 ">
                <SquareCheck className="w-6 h-6 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black rounded-sm" />

                <div className='flex justify-between items-center w-full '>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Check in:</p>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">04/08/2026</p>
                </div>


              </div>
              <hr />

              <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">

                <SquareX className=' w-6 h-6 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black rounded-sm' />

                <div className='flex justify-between items-center w-full'>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Check out:</p>
                  <p className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">04/08/2026</p>
                </div>
              </div>
            </div>
            <hr />

            {/* Nights */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Moon className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-gray-900">Nights:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">1</span>
              </div>
            </div>
            <hr />

            {/* Room */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Bed className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between gap-x-2 items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Room:</span>
                <span className=" text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">Standard room with two double bed</span>
              </div>
            </div>
            <hr />

            {/* Meal */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Utensils className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Meal:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">Room with RO</span>
              </div>
            </div>
            <hr />

            {/* Travelers */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <Users className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 text-black" />
              <div className="flex justify-between items-center w-full">
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black">Travelers:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-600">2 adult(s)</span>
              </div>
            </div>
            <hr />


            {/* Price */}
            <div className="flex items-center gap-3 fhd:gap-5 4k:mt-8  4k:space-y-8">
              <div className="w-6 h-6 fhd:w-8 fhd:h-8  2k:w-12 2k:h-12 4k:w-20 4k:h-20 "></div>

              <div className="flex justify-between items-center pt-2  w-full ">

                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-medium text-black ">Price:</span>
                <span className="text-sm md:text-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl font-semibold text-gray-900">US$ 375.00</span>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="">
              <div className="flex items-center gap-2 pt-2">
                {/* <shieldcheck className="w-5 h-5 text-blue-500" /> */}
                <ShieldCheck className="w-5 h-5 fhd:w-7  2k:w-10 2k:h-10 4k:w-18 4k:h-18 text-blue-500" />
                <button className="text-blue-500 text-base fhd:text-xl 2k:text-3xl 4k:text-5xl hover:underline">Cancellation policy</button>
              </div>


            </div>
          </div>
        </div>



      </div>





      {/* form */}
      <div className='mt-10 px-0 md:px-24 fhd:px-72  mx-auto'>
        <div className="max-w-full mx-auto xl:w-[1200px] fhd:w-[1650px] 2k:w-[2170px] 4k:2k:w-[3200px] p-6 fhd:p-8 2k:p-12  4k:p-16  ">
          {/* Total Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl fhd:text-4xl 2k:text-5xl 4k:text-7xl font-bold text-gray-900">Total</h1>
            <span className="text-2xl fhd:text-4xl 2k:text-5xl 4k:text-7xl font-bold text-gray-900">$750.00</span>
          </div>

          {/* Form Section */}
          <div className="space-y-6 fhd:space-y-8 4k:space-y-12">
            <h2 className="text-xl fhd:text-4xl 2k:text-5xl 4k:text-7xl font-bold text-gray-900 mb-6 fhd:mb-14 2k:mb-18 4k:mb-22">Enter traveler details</h2>

            <form className="space-y-6 fhd:space-y-10 2k:space-y-14 4k:space-y-20">
              {/* Name Fields Row */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 fhd:gap-8 2k:gap-14 4k:gap-20">
                <div className="relative">
                  <label htmlFor="firstName" className="
                  ">
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
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 fhd:gap-8 2k:gap-14 4k:gap-20">
                <div className="relative">
                  <label htmlFor="countryCode" className="md:text-sm text-xs fhd:text-lg 2k:text-2xl 4k:text-4xl absolute top-[-12px] fhd:top-[-28px] 2k:top-[-34px] 4k:top-[-44px]  py-1 fhd:py-2.5 2k:py-4 4k:py-5 px-3 fhd:px-6 2k:px-9 4k:px-14 bg-[#F6F6F6] left-2 md:left-6 4k:left-10 font-medium text-gray-700 flex items-center gap-2">
                    <Globe className="w-3 h-3 fhd:w-6 fhd:h-6 2k:w-8 2k:h-8 4k:w-12 4k:h-12 text-gray-500" />
                    Country Code
                  </label>
                  <select id="default" className="w-full px-5 py-4 2k:px-12 4k:px-18 fhd:px-8  fhd:py-7  2k:py-10 4k:py-16  border border-gray-300 rounded-lg fhd:text-2xl 2k:text-4xl 4k:text-6xl text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent  ">
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


                    className="w-full px-5 fhd:px-8 2k:px-12 4k:px-18  py-4 fhd:py-7 2k:py-10 4k:py-16 fhd:text-2xl 2k:text-4xl 4k:text-6xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
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

              {/* Submit Button */}

            </form>
          </div>
          {/* continue */}
          <div className="w-full mx-auto py-6 fhd:py-8 2k:py-20 4k:py-28 space-y-6">
            {/* Notification Box */}
            <div className="bg-orange-50 border border-l-4 border-orange-100 border-l-[#F96C41] rounded-full  py-5 px-6 fhd:py-10 fhd:px-10 2k:py-14 2k:px-16 4k:py-18 4k:px-20">
              <p className="text-sm fhd:text-xl 2k:text-3xl 4k:text-5xl text-gray-700 leading-relaxed">
                <span className="font-medium">Note:</span> All communication regarding your booking will be sent to this email
                address and/or mobile number.
              </p>
            </div>

            {/* Terms Agreement */}
            <div className={`flex ${isCheck === true ? 'items-center' : 'items-start'}  space-x-3 fhd:space-x-6 2k:space-x-8 px-2 fhd:px-4 2k:px-6 2k:py-10 4k:px-10 4k:py-16`}>
              {/* <Check/> */}
              <input id="orange-checkbox" type='checkbox'  className={`h-5 w-5 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-18 4k:h-18  rounded-full border-2  border-gray-300 
                 
                 focus:outline-none focus:ring-2 focus:ring-orange-200
                 transition-colors duration-200 ${isCheck ? 'hidden' : undefined}`}
                checked={isCheck}
                onChange={() => setIsCheck(!isCheck)}
              />
              {isCheck && <Check onClick={() => setIsCheck(!isCheck)} className="w-5 h-5 fhd:w-8 fhd:h-8 2k:w-12 2k:h-12 4k:w-18 4k:h-18 text-white font-bold bg-orange-500 rounded-full cursor-pointer" />
              }
              <label className="text-sm fhd:text-xl 2k:text-3xl 4k:text-5xl text-gray-700 leading-relaxed cursor-pointer">
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
              className="w-full cursor-pointer  btn-gradient text-white font-semibold py-3 fhd:py-6 2k:py-10 4k:py-16 px-6 fhd:px-10 2k:px-14 4k:px-18   rounded-lg text-base fhd:text-xl 2k:text-4xl 4k:text-6xl"

            >
              CONTINUE
            </button>
          </div>
        </div>

      </div>


      <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 fhd:px-[370px] 2k:px-[400px] 4k:px-[490px] ">
        <div className="max-w-full mx-auto ">
          <CarDiv />
        </div>
      </div>

      {/* Rentals Component */}
      <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 fhd:px-[370px] 2k:px-[400px] 4k:px-[490px] ">
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