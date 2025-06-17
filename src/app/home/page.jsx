"use client"
import { Input } from "@/components/ui/input"
import Navbar from "../common_components/navbar/page"
import TravelForm from "../common_components/form/page"
import CarDiv from "../common_components/cardiv/page"
import Rentals from "../common_components/rentals/page"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export default function Page() {

  // const [token] = useLocalStorage('token', null)

  // console.log(token) // Now safe to use
  return (
    <div className="min-h-screen bg-white" data-aos="fade-in">
      <div className="max-md:bg-black sm:px-4 md:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 min-h-[65vh] md:min-h-[50vh] flex flex-col justify-start rounded-b-[24px] sm:rounded-b-[32px] md:rounded-b-[40px]">

        <img src="./images/icons/hero.png" alt="HERO IMAGE" className="w-full max-md:hidden absolute top-0 left-0" data-aos="fade-in" />
        <div className="px-3 z-50">
          <Navbar />
        </div>
        <div className="px-8 mt-4 pb-8 z-10 xl:hidden" data-aos="fade-up">
        <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full space-y-6 ">
          <div className="relative" data-aos="zoom-in" data-aos-delay="100">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="w-7 h-7 bg-gradient-to-b from-gray-600 to-gray-800 rounded-sm border-2 border-[#F96C41] flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-sm border border-white/20"></div>
                <img src="/images/icons/diamon_icon.png" className="w-3 h-3" />
              </div>
            </div>
            <Input
              placeholder="Ask me"
              className="bg-[#323232] border-gray-700 text-[#FFFFFFAB] placeholder:text-[#FFFFFFAB] pl-12 pr-12 py-3 rounded-lg h-12"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <img src="/images/icons/mic_icon.png" className="h-5 w-5" />
            </div>
          </div>

          <div className="text-center" data-aos="fade-up" data-aos-delay="150">
            <p className="text-[#FFFFFF99] text-sm font-medium tracking-wider">OR FILL OUT THIS FORM</p>
          </div>
        </div>
        </div>
      </div>


      <div className="px-8 -mt-48 md:-mt-22 pb-8 xl:flex xl:justify-between xl:-mt-36 xl:mr-16 xl:mb-10">
        <div className="z-10 ml-48 mt-28 max-xl:hidden" data-aos="fade-right"
          data-aos-delay="200">
            <h3 className="text-[24px] font-medium text-[#FFFFFFCF]">Your Journey, Electrified.</h3>
            <h1 className="text-[48px] font-bold text-white leading-14">Your EV travel hub with<br/>routes, hotels and<br/>charging.</h1>
          </div>
         <div className="max-w-full md:max-w-10/12 xl:w-[543px] xl:h-[685px] max-xl:mx-auto" data-aos="fade-left"
          data-aos-delay="250">
           <TravelForm />
        </div>
      </div>

      <div className="px-8 mt-4 pb-8" data-aos="fade-up"
        data-aos-delay="300">
         <div className="max-w-full mx-auto xl:w-[1200px]">
           <CarDiv />
        </div>
      </div>


       <div className="px-8 mt-4 pb-8" data-aos="fade-up"
        data-aos-delay="350">
         <div className="max-w-full mx-auto xl:w-[1196px]">
           <Rentals />
        </div>
      </div>

     </div>
  )
}
