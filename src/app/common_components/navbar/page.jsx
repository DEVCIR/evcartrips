"use client";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import SideMenu from '../SideMenu/page'
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <nav className="max-md:bg-black px-4 py-3 flex items-center justify-between">
      <button onClick={() => setIsMenuOpen(true)} className="flex items-center xl:hidden">
        <img
          src="/images/icons/burger_icon.png"
          className="h-8 w-8 md:h-10 md:w-10"
          alt="Menu"
        />
      </button>

      <div className="flex items-center">
        <img
          src="/images/evcartrips-logo.png"
          alt="evcartrips.com"
          className="h-8 w-auto md:h-10"
        />
      </div>


      <div className="flex items-center space-x-2 md:space-x-3">
      <div className="relative max-xl:hidden">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <div className="w-7 h-7 bg-gradient-to-b from-gray-600 to-gray-800 rounded-sm border-2 border-[#F96C41] flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-sm border border-white/20"></div>
            <img src="/images/icons/diamon_icon.png" className="w-3 h-3" />
          </div>
        </div>
        <Input
          placeholder="Ask me"
          className="bg-[#323232] border-gray-700 text-[#FFFFFFAB] placeholder:text-[#FFFFFFAB] pl-12 pr-52 py-3 rounded-lg h-12"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <img src="/images/icons/mic_icon.png" className="h-5 w-5" />
        </div>
      </div>
        <div className="relative xl:w-[51px] xl:h-[47px]">
          <img
            src="/images/icons/cart_icon.png"
            className="h-5 w-5 md:h-6 md:w-6 xl:w-[47px] xl:h-[47px]"
            alt="Cart"
          />
          <div className="absolute -top-0 -right-0 xl:w-[21px] xl:h-[21px] bg-orange-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
            1
          </div>
        </div>

        <div className="bg-gray-600 rounded-full p-1">
          <User className="h-4 w-4 md:h-5 md:w-5 xl:w-[41px] xl:h-[41px] text-white" />
        </div>
      </div>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
}
