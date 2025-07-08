"use client"

import Navbar from "../../common_components/navbar/page"
import SignUpForm from "../../common_components/signupform/page"
import Rentals from "../../common_components/rentals/page"
import Footer from "../../components/ui/footer"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Page() {
  const headerRef = useRef(null)
  const formRef = useRef(null)
  const footerRef = useRef(null)

  const isHeaderInView = useInView(headerRef, { once: true })
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" })
  const isFooterInView = useInView(footerRef, { once: true })

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      {/* Animated Header Section */}
      <motion.div 
        ref={headerRef}
        className="bg-black px-3 sm:px-4 md:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 min-h-[40vh] lg:min-h-[60vh] xl:min-h-[80vh] flex flex-col justify-start rounded-b-[24px] sm:rounded-b-[32px] md:rounded-b-[20px] z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Navbar />
        
        <motion.div 
          className="max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full space-y-2 mt-4 xl:mt-24 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1 
            className="text-[#FFFFFFEB] font-bold text-[16px] -tracking-[0.41px] md:text-[26px] md:-tracking-[0.68px] xl:text-[45px] xl:-tracking-[1.17px]"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          > 
            CREATE ACCOUNT
          </motion.h1>
          
          <motion.div 
            className="text-[#FFFFFFAB] font-[400] text-[14px] -tracking-[0.41px] md:text-[23px] md:-tracking-[0.68px] xl:text-[40px] xl:-tracking-[1.17px] xl:-space-y-3"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, staggerChildren: 0.1 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            >
              Book EV trips & hotels in one
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            >
              place---fast, easy, and green.
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Form Section */}
      <motion.div
        ref={formRef}
        className="-mt-24 md:-mt-18 lg:-mt-36 xl:-mt-40 pb-8 z-40"
        initial={{ opacity: 0, y: 50 }}
        animate={isFormInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className="mx-auto">
          <SignUpForm />
        </div>
      </motion.div>

      {/* Mobile Rentals Section */}
      <motion.div
        className="px-8 mt-4 pb-8 mx-3 md:hidden"
        initial={{ opacity: 0 }}
        animate={isFormInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="max-w-full mx-auto">
          <Rentals />
        </div>
      </motion.div>

      {/* Animated Footer */}
      <motion.div
        ref={footerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-md:hidden"
      >
        <Footer />
      </motion.div>
    </div>
  )
}