"use client"

import { useState } from "react"
import Navbar from "../../common_components/navbar/page"
import { ChevronDown, ChevronUp } from "lucide-react"
import Footer from "../../components/ui/footer"

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(0) // First FAQ is open by default

  const faqs = [
    {
      question: "What is EVCarTrips?",
      answer:
        "EVCarTrips is a travel app that lets you easily book electric vehicles (EVs) and hotels in one place, making your eco-friendly journeys smooth and convenient.",
    },
    {
      question: "How do I book an EV car?",
      answer:
        "To book an EV car, simply search for your destination, select your preferred dates, choose from available electric vehicles, and complete your booking with secure payment options.",
    },
    {
      question: "Can I cancel my EV car booking?",
      answer:
        "Yes, you can cancel your EV car booking. Cancellation policies vary depending on the booking terms. Please check your booking details for specific cancellation conditions and any applicable fees.",
    },
    {
      question: "How do I book a hotel?",
      answer:
        "Booking a hotel is easy! Enter your destination and travel dates, browse through available accommodations, select your preferred hotel, and complete the reservation process.",
    },
    {
      question: "Can I cancel my hotel booking?",
      answer:
        "Hotel cancellation policies depend on the specific property and rate selected. Most bookings can be cancelled, but terms and conditions vary. Check your booking confirmation for detailed cancellation information.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index)
  }

  return (
    <div className="w-full min-h-screen bg-white text-white overflow-hidden">

      {/* Mobile Status Bar Simulation */}
      <div className="bg-black pt-1 pb-4 min-h-[45vh] flex flex-col rounded-b-[20px] sm:rounded-b-[24px]">
        <Navbar />
      </div>

      {/* Breadcrumb */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto px-4 pt-4 mb-2 -mt-60">
        <div className="flex items-center text-gray-400 text-sm">
          <span>Home</span>
          <ChevronDown className="w-4 h-4 mx-2 rotate-[-90deg]" />
          <span>Pages</span>
          <ChevronDown className="w-4 h-4 mx-2 rotate-[-90deg]" />
          <span className="text-white">Frequently Asked Question</span>
        </div>
      </div>

      {/* Main Heading */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto px-4 mb-8">
        <h1 className="text-4xl font-bold text-white leading-tight">
          Frequently Asked
          <br />
          Question
        </h1>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl mx-auto px-4 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-6 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
              {openFAQ === index ? (
                <ChevronUp className="w-6 h-6 text-orange-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
              )}
            </button>

            {openFAQ === index && (
              <div className="px-6 pb-6 bg-white">
                <div className="border-l-4 border-gray-200 pl-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-20"></div>

      <div className="">
        <Footer />
      </div>
    </div>
  )
}
