"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ResetForm() {
  const [formData, setFormData] = useState({
    email: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="bg-[#FFFFFF] rounded-t-3xl rounded-b-3xl shadow-xl px-4 md:px-6 py-6 mx-2 md:mx-4 -mt-4 relative z-10">
      <div className="space-y-4 md:space-y-6">
        <div>
          <label className="text-[#00000082] text-sm md:text-base font-medium mb-1 md:mb-2 block">Email Address</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_348_572)">
                  <path d="M17.5295 14.6064C17.5295 15.6144 17.8163 16.0164 18.5663 16.0164C20.2379 16.0164 21.3023 13.8864 21.3023 10.344C21.3023 4.92956 17.3567 2.33756 12.4307 2.33756C7.36314 2.33756 2.75394 5.73596 2.75394 12.1584C2.75394 18.2928 6.78594 21.6336 12.9779 21.6336C15.0803 21.6336 16.4915 21.4032 18.6503 20.6832L19.1135 22.6116C16.9823 23.304 14.7047 23.5044 12.9491 23.5044C4.82754 23.5044 0.477539 19.0404 0.477539 12.1572C0.477539 5.21636 5.51874 0.493164 12.4595 0.493164C19.6883 0.493164 23.5175 4.81316 23.5175 10.1124C23.5175 14.6052 22.1075 18.0324 17.6723 18.0324C15.6551 18.0324 14.3315 17.226 14.1587 15.4392C13.6403 17.4264 12.2579 18.0324 10.3847 18.0324C7.87914 18.0324 5.77674 16.1016 5.77674 12.2148C5.77674 8.29796 7.62114 5.87876 10.9331 5.87876C12.6899 5.87876 13.7843 6.56996 14.2715 7.66436L15.1079 6.13796H17.5271V14.6064H17.5295ZM13.9883 10.8048C13.9883 9.22196 12.8063 8.55836 11.8271 8.55836C10.7615 8.55836 9.58194 9.42116 9.58194 11.9568C9.58194 13.9728 10.4747 15.096 11.8271 15.096C12.7775 15.096 13.9883 14.4912 13.9883 12.8208V10.8048Z" fill="#F96C41"/>
                </g>
                <defs>
                  <clipPath id="clip0_348_572">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <Input
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email address"
              className="pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 border-gray-400 rounded-lg h-11 md:h-12 text-base md:text-lg text-[#00000075] font-semibold"
            />
          </div>
        </div>
                         
        <Button
          onClick={() => console.log("Form Data:", formData)}
          className="w-full bg-gradient-to-b from-[#F96C41] to-[#AA3916] text-white font-semibold py-3 md:py-4 rounded-lg h-12 md:h-14 text-base md:text-lg mt-3 md:mt-0"
        >
          RESET PASSWORD
        </Button>

      </div>
    </div>
  )
}