"use client"

import { useState } from "react"
import { Phone, VoicemailIcon as Fax, Mail, ChevronDown } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    help: "",
  })

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const helpOptions = [
    "How can we help you?",
    "General Inquiry",
    "Technical Support",
    "Sales Question",
    "Partnership",
    "Other",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectOption = (option) => {
    setFormData((prev) => ({
      ...prev,
      help: option,
    }))
    setIsDropdownOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
            />
          </div>

          {/* Phone Field */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number *"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
              required
            />
          </div>

          {/* Dropdown Field */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-left flex items-center justify-between bg-white"
            >
              <span className={formData.help || "text-gray-500"}>{formData.help || "How can we help you?"}</span>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {helpOptions.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectOption(option)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:to-[#F96C41] hover:from-[#AA3916] text-white cursor-pointer font-medium py-3 px-4 rounded-md transition-colors duration-200 mt-6"
          >
            SEND
          </button>
        </form>

        {/* Contact Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Phone */}
            <div className="flex flex-col items-center">
              <Phone className="h-5 w-5 text-gray-600 mb-1" />
              <div className="text-xs font-medium text-gray-800 uppercase tracking-wide">PHONE</div>
              <div className="text-xs text-orange-600 mt-1">+1 858-222-4037</div>
            </div>

            {/* Fax */}
            <div className="flex flex-col items-center">
              <Fax className="h-5 w-5 text-gray-600 mb-1" />
              <div className="text-xs font-medium text-gray-800 uppercase tracking-wide">FAX</div>
              <div className="text-xs text-orange-600 mt-1">03 5432 1234</div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center">
              <Mail className="h-5 w-5 text-gray-600 mb-1" />
              <div className="text-xs font-medium text-gray-800 uppercase tracking-wide">EMAIL</div>
              <div className="text-xs text-orange-600 mt-1">mail@evcartrips.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
