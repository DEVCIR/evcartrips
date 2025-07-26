"use client"

import Footer from "../../components/ui/footer";
import Navbar from "../../common_components/navbar/page";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BlogPage() {
  const headerRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const footerRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true });
  const isBreadcrumbInView = useInView(breadcrumbRef, { once: true });
  const isTitleInView = useInView(titleRef, { once: true });
  const isFooterInView = useInView(footerRef, { once: true });

  return (
    <div className="min-h-screen bg-white text-white overflow-hidden z-10">
      {/* Animated Header */}
      <motion.div 
        ref={headerRef}
        className="bg-black pt-1 pb-4 min-h-[45vh] flex flex-col rounded-b-[16px] sm:rounded-b-[20px] z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
      </motion.div>

      <div className="w-full -mt-60 z-40">
        {/* Breadcrumb Navigation */}
        <motion.div
          ref={breadcrumbRef}
          className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-5xl mx-auto px-4 py-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isBreadcrumbInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center text-gray-400 text-sm">
            <span>Home</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span>Pages</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-white">Blog</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          ref={titleRef}
          className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-5xl mx-auto px-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl font-bold leading-tight"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            EV Travel & Hotel Booking
            <br />
            Insights
          </motion.h1>
        </motion.div>

        {/* Blog Cards */}
        <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-4 space-y-6 mx-auto mb-10">
          {/* First Blog Card */}
          <motion.div
            ref={(el) => (cardsRef.current[0] = el)}
            className="flex justify-center gap-x-3 sm:gap-x-6 md:gap-x-8 bg-white rounded-2xl p-6 text-black shadow-sm border border-gray-100 w-full max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className="w-[230px] sm:w-[280px] md:w-[320px] lg:w-[360px] sm:flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <img
                src="/images/car.png"
                alt="CAR IMAGEE"
                className="w-full h-auto  rounded-md"
              />
            </motion.div>
            <div className="flex flex-col sm:flex-1 sm:min-h-[200px] sm:justify-between">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
              >
                <motion.div 
                  className="mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <span className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-full font-semibold">
                    Electric Car
                  </span>
                </motion.div>
                <motion.h2 
                  className="text-[14px] sm:text-[20px] md:text-[24px] lg:text-[26px] font-semibold leading-[17px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] -tracking-[0.25px] mb-2 text-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  Why Renting an EV
                  <br />
                  is the Smartest Way
                  <br />
                  to Travel in 2025
                </motion.h2>
                <motion.p 
                  className="text-gray-500 text-[14px] font-normal leading-[17px] -tracking-[0.25px] mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  5 min read
                </motion.p>
              </motion.div>

              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div 
                  className="w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] bg-orange-50 border-2 border-orange-200 rounded-full flex items-center justify-center hover:bg-orange-100 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowRight className="w-4 h-4 text-orange-500" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Second Blog Card */}
          <motion.div
            ref={(el) => (cardsRef.current[1] = el)}
            className="flex justify-center gap-x-3 sm:gap-x-6 md:gap-x-8 bg-white rounded-2xl p-6 text-black shadow-sm border border-gray-100 w-full max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className="w-[230px] sm:w-[280px] md:w-[320px] lg:w-[360px] sm:flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <img
                src="/images/bed.png"
                alt="Hotel"
                className="w-full h-auto object-cover rounded-md"
              />
            </motion.div>
            <div className="flex flex-col flex-1 sm:min-h-[200px] justify-between">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.6 }}
              >
                <motion.div 
                  className="mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <span className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded-full font-semibold">
                    Hotel
                  </span>
                </motion.div>
                <motion.h2 
                  className="text-[14px] sm:text-[20px] md:text-[24px] lg:text-[26px] font-semibold leading-[17px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] -tracking-[0.25px] mb-2 text-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  How to Find the
                  <br />
                  Best Hotel Deals
                  <br />
                  with EVCarTrips
                </motion.h2>
                <motion.p 
                  className="text-gray-500 text-[14px] font-normal leading-[17px] -tracking-[0.25px] mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  4 min read
                </motion.p>
              </motion.div>

              <motion.div 
                className="flex justify-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <motion.div 
                  className="w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] bg-orange-50 border-2 border-orange-200 rounded-full flex items-center justify-center hover:bg-orange-100 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowRight className="w-4 h-4 text-orange-500" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Footer */}
      <motion.div
        ref={footerRef}
        className=""
        initial={{ opacity: 0, y: 50 }}
        animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Footer/>
      </motion.div>
    </div>
  );
}