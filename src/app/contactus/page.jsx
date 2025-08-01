"use client"

import Footer from "../../components/ui/footer"
import HalfNavbar from "../../common_components/halfnavbar/page"
import Navbar from "../../common_components/navbar/page"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import ContactForm from "../../common_components/contactform/page"

export default function Page() {
  // Refs for animation triggers
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const footerRef = useRef(null)

  // Check if elements are in view
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" })
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" })
  const isFooterInView = useInView(footerRef, { once: true })

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      {/* Animated Header Section */}
      <motion.div 
        className="bg-black pt-1 pb-4 min-h-[45vh] flex flex-col rounded-b-[16px] sm:rounded-b-[20px]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Navbar />
      </motion.div>

      {/* Main Content */}
      <div className="w-full -mt-60">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-28 py-8">
          {/* Breadcrumb Animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto text-sm text-[#FFFFFFCC] mb-2"
          >
            Home &gt; Pages &gt; <span className="text-[#FFFFFF]">Contact Us</span>
          </motion.div>

          {/* Title Section with Scroll Animation */}
          <motion.div 
            ref={titleRef}
            className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={isTitleInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Contact Us
            </motion.h1>
          </motion.div>

          {/* Content Box with Staggered Animations */}
          <motion.div
            ref={contentRef}
            className="mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isContentInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>

      {/* Animated Footer */}
      <motion.div
        ref={footerRef}
        className=""
        initial={{ opacity: 0, y: 50 }}
        animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Footer />
      </motion.div>
    </div>
  )
}