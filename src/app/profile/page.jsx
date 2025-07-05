"use client"

import Footer from "../../components/ui/footer";
import Navbar from "../common_components/navbar/page";
import { ImageIcon, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function EditProfilePage() {
  const headerRef = useRef(null);
  const profileRef = useRef(null);
  const infoRef = useRef(null);
  const bookingRef = useRef(null);
  const footerRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true });
  const isProfileInView = useInView(profileRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-50px" });
  const isBookingInView = useInView(bookingRef, { once: true, margin: "-50px" });
  const isFooterInView = useInView(footerRef, { once: true });

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      {/* Animated Header */}
      <motion.div 
        ref={headerRef}
        className="bg-black px-3 sm:px-4 pt-1 pb-4 min-h-[45vh] md:min-h-[50vh] flex flex-col rounded-b-[16px] sm:rounded-b-[20px]"
        initial={{ opacity: 0, y: -50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Navbar />
      </motion.div>

      <div className="px-4 py-6 -mt-60">
        {/* Profile Image Section */}
        <motion.div 
          ref={profileRef}
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isProfileInView ? { 
            opacity: 1, 
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10
            }
          } : {}}
        >
          <div className="relative">
            <motion.div 
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img
                src="/images/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.button 
              className="absolute -top-1 -right-1 bg-orange-500 rounded-lg p-2 hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ImageIcon className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </motion.div>

        <div className="xl:flex xl:gap-x-4 xl:mx-auto xl:justify-center xl:items-start">
          {/* Edit Form */}
          <motion.div
            ref={infoRef}
            className="w-[360px] h-auto md:w-[586px] xl:w-[680px] bg-white rounded-2xl p-6 mb-6 shadow-sm max-xl:mx-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={isInfoInView ? { 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.2 }
            } : {}}
          >
            <motion.h2 
              className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200"
              initial={{ opacity: 0 }}
              animate={isInfoInView ? { 
                opacity: 1,
                transition: { delay: 0.3 }
              } : {}}
            >
              Profile Information
            </motion.h2>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isInfoInView ? { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.4 }
              } : {}}
            >
              {[
                { label: "Full Name", value: "Leslie Alexander" },
                { label: "Date of Birth", value: "May 29, 2000" },
                { label: "Gmail Address", value: "alma.lawson@example.com" },
                { label: "Phone Number", value: "(225) 555-0118" },
                { label: "Address", value: "6391 Elgin St. Celina, Delaware 10299" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    {item.label}
                  </label>
                  <p className="text-gray-400 text-base">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Edit Profile Button */}
            <motion.button
              className="w-full bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:to-[#F96C41] hover:from-[#AA3916] text-white font-bold py-4 px-6 rounded-xl text-base mt-6 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInfoInView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.9 }
              } : {}}
            >
              EDIT PROFILE
            </motion.button>
          </motion.div>

          {/* Current Booking */}
          <motion.div
            ref={bookingRef}
            className="w-[360px] h-auto md:w-[586px] xl:w-[680px] bg-white rounded-2xl p-6 shadow-sm max-xl:mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={isBookingInView ? { 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.3 }
            } : {}}
          >
            <motion.h2 
              className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200"
              initial={{ opacity: 0 }}
              animate={isBookingInView ? { 
                opacity: 1,
                transition: { delay: 0.4 }
              } : {}}
            >
              Current Booking
            </motion.h2>

            <motion.div 
              className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isBookingInView ? { 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.5 }
              } : {}}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 10 }}
                >
                  <span className="text-white font-bold text-sm">1.</span>
                </motion.div>
                <div>
                  <p className="text-gray-400 text-base">1 EV Trip</p>
                  <p className="text-gray-400 text-base">3 Hotel stays</p>
                </div>
              </div>
              <motion.button 
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SEE DETAILS
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Footer */}
      <motion.div
        ref={footerRef}
        className="max-md:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}