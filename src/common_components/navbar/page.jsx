"use client";
import { Input } from "../../components/ui/input"
import { House, User, Users, Mail, LogOut } from "lucide-react";
import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SideMenu } from "../SideMenu/page";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({});
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== user) {
      setUser(storedUser);
    }
  }, []);

  return (
    <nav className="max-md:bg-black px-4 py-3 flex items-center justify-between fhd:px-20 2k:px-28 4k:px-66 fhd:pt-6 2k:pt-8 4k:pt-10">
      <button
        onClick={() => setIsMenuOpen(true)}
        className="flex items-center xl:hidden cursor-pointer"
      >
        <img
          src="/images/icons/burger_icon.png"
          className="h-8 w-8 md:h-10 md:w-10 "
          alt="Menu"
        />
      </button>

      <div className="flex items-center gap-x-6">
        <img
          src="/images/evcartrips-logo.png"
          alt="evcartrips.com"
          className="h-8 w-auto md:h-10 fhd:h-16 2k:h-20 4k:h-36 cursor-pointer"
          onClick={() => router.push("/home")}
        />
        <div className="max-xl:hidden cursor-pointer flex items-center gap-x-1 2k:gap-x-3 4k:gap-x-6 text-white hover:bg-orange-500 p-4 4k:p-6 hover:rounded-md transition-transform duration-200 hover:scale-110">
          <House className="w-4 h-4 fhd:h-8 fhd:w-8 2k:h-10 2k:w-10 4k:h-16 4k:w-16" />
          <Link href="/home" className="fhd:text-2xl 2k:text-3xl 4k:text-5xl font-semibold">
            Home
          </Link>
        </div>
        <div className="max-xl:hidden cursor-pointer flex items-center gap-x-1 2k:gap-x-3 4k:gap-x-6 text-white hover:bg-orange-500 p-4 4k:p-6 hover:rounded-md transition-transform duration-200 hover:scale-110">
          <Users className="w-4 h-4 fhd:h-8 fhd:w-8 2k:h-10 2k:w-10 4k:h-16 4k:w-16" />
          <Link href="/about" className="fhd:text-2xl 2k:text-3xl 4k:text-5xl font-semibold">
            About
          </Link>
        </div>
        <div className="max-xl:hidden cursor-pointer flex items-center gap-x-1 2k:gap-x-3 4k:gap-x-6 text-white hover:bg-orange-500 p-4 4k:p-6 hover:rounded-md transition-transform duration-200 hover:scale-110">
          <Mail className="w-4 h-4 fhd:h-8 fhd:w-8 2k:h-10 2k:w-10 4k:h-16 4k:w-16" />
          <Link href="/contactus" className="fhd:text-2xl 2k:text-3xl 4k:text-5xl font-semibold">
            Contact
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3 2k:space-x-5">
        <div className="relative max-xl:hidden">
          <div className="absolute left-3 2k:left-5  top-1/2 transform -translate-y-1/2">
            <div className="w-7 h-7 fhd:w-8 2k:w-10 2k:h-10 4k:w-14 4k:h-14 bg-gradient-to-b from-gray-600 to-gray-800 rounded-sm border-2 border-[#F96C41] flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-sm border border-white/20"></div>
              <img src="/images/icons/diamon_icon.png" className="w-3 h-3 fhd:w-4 fhd:h-4 2k:w-6 2k:h-6 4k:w-9 4k:h-9" />
            </div>
          </div>
          <Input
            placeholder="Ask me"
            className="bg-[#323232] border-gray-700 text-[#FFFFFFAB] fhd:text-xl 2k:text-2xl 4k:text-4xl placeholder:text-[#FFFFFFAB] pl-12 pr-52 py-3 rounded-lg h-12 fhd:h-16 fhd:pr-[300px] fhd:pl-14 2k:h-24 2k:pr-[350px] 2k:pl-18 4k:h-32 4k:pr-[450px] 4k:pl-24 "
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <img src="/images/icons/mic_icon.png" className="h-5 w-5 fhd:h-6 fhd:w-6 2k:h-8 2k:w-8 4k:h-12 4k:w-12" />
          </div>
        </div>
        <div className="relative xl:w-[51px] xl:h-[47px] fhd:w-[60px] fhd:h-[60px] 2k:w-[80px] 2k:h-[80px] 4k:w-[120px] 4k:h-[120px]">
          <img
            src="/images/icons/cart_icon.png"
            className="h-5 w-5 md:h-6 md:w-6 xl:w-[47px] xl:h-[47px] fhd:w-[60px] fhd:h-[60px] 2k:w-[80px] 2k:h-[80px] 4k:w-[120px] 4k:h-[120px]"
            alt="Cart"
          />
          <div className="absolute -top-0 -right-0 xl:w-[21px] xl:h-[21px] fhd:w-[28px] fhd:h-[28px] 2k:w-[35px] 2k:h-[35px] 4k:w-[50px] 4k:h-[50px] bg-orange-500 text-white text-xs fhd:text-lg 2k:text-xl 4k:text-4xl rounded-full h-3 w-3 flex items-center justify-center">
            1
          </div>
        </div>

        <div className="bg-gray-600 rounded-full p-1">
          <Link href="/signin" className="cursor-pointer">
            <User className="h-4 w-4 md:h-5 md:w-5 xl:w-[41px] xl:h-[41px] fhd:w-[50px] fhd:h-[50px] 2k:w-[65px] 2k:h-[65px] 4k:w-[100px] 4k:h-[100px] text-white" />
          </Link>
        </div>
        {user && (
          <div className="">
            <button
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                toast.success("Logged Out Successfully.")
                setTimeout(() => {
                  router.push("/signin"); // Redirect after logout
                }, 3000)
              }}
              className="cursor-pointer bg-gray-600 rounded-full p-1"
            >
              <LogOut className="h-4 w-4 md:h-5 md:w-5 xl:w-[41px] xl:h-[41px] text-white" />
            </button>
          </div>
        )}
      </div>
      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </nav>
  );
};
export default Navbar;
