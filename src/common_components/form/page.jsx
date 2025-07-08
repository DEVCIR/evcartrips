"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { X } from "lucide-react"
import { toast , ToastContainer } from "react-toastify"

export default function TravelForm() {
  const router = useRouter()
  const TRAVELLER_OPTIONS = [
  "1 Traveller, 1 Room",
  "2 Travellers, 1 Room",
  "3 Travellers, 1 Room",
  "4 Travellers, 2 Rooms",
  "5 Travellers, 2 Rooms",
  "6 Travellers, 3 Rooms"
];
  const [formData, setFormData] = useState({
    startDate: new Date(),
    from: "",
    to: "",
    stops: [""], // Initialize with one empty stop
    maxDistance: "500",
    autonomy: "500",
    needHotel: false,
    travellers: "3 Travellers, 1 Room",
  })

  const [distanceUnits, setDistanceUnits] = useState({
  maxDistance: 'KM',
  autonomy: 'KM'
});

// Inside your component
  const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);  
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [cities, setCities] = useState([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [activeStopIndex, setActiveStopIndex] = useState(0)

const fetchCities = async (searchTerm) => {
  if (!searchTerm || searchTerm.length < 2) return;

  setLoadingCities(true);
  try {
    const response = await axios.get(`/api/cities?q=${encodeURIComponent(searchTerm)}`);
    setCities(response.data.geonames || []);
  } catch (error) {
    console.error("Error fetching cities:", error);
    setCities([]);
  } finally {
    setLoadingCities(false);
  }
};


  const handleInputChange = async (field, value, index = null) => {
    if (field === 'stop' && index !== null) {
      // Handle stop input change
      const updatedStops = [...formData.stops]
      updatedStops[index] = value
      setFormData(prev => ({
        ...prev,
        stops: updatedStops
      }))
      
      // Set active dropdown for stops
      setActiveDropdown(value.trim() ? `stop-${index}` : null)
      setActiveStopIndex(index)
    } else {
      // Handle other fields
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }))
      
      if (['from', 'to'].includes(field)) {
        setActiveDropdown(value.trim() ? field : null)
      }
    }

    // Clear previous timeout if it exists
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    // Set new timeout for debouncing
    if (['from', 'to'].includes(field) || field === 'stop') {
      if (value.trim().length > 0) {
        setSearchTimeout(
          setTimeout(() => {
            fetchCities(value)
          }, 500) // 500ms debounce delay
        )
      } else {
        setCities([])
      }
    }
  }

  const addStop = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops, ""] // Add new empty stop
    }))
  }

  const removeStop = (index) => {
    if (formData.stops.length <= 1) return // Don't remove the last stop
    
    setFormData(prev => {
      const updatedStops = [...prev.stops]
      updatedStops.splice(index, 1)
      return {
        ...prev,
        stops: updatedStops
      }
    })
  }

  const formatDate = (date) => {
    if (!date) return ""
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const validateForm = () => {
    if (!formData.from.trim()) {
      toast.error("Please enter a starting location")
      return false
    }

    if (!formData.to.trim()) {
      toast.error("Please enter a destination")
      return false
    }

    // Validate stops (remove empty stops first)
    // const validStops = formData.stops.filter(stop => stop.trim() !== "")
    // if (validStops.length === 0) {
    //   toast.error("Please enter at least one stop")
    //   return false
    // }

    return true
  }

  const handleSubmit = () => {
    // First validate the form
    if (!validateForm()) {
      return
    }

    // Prepare data for URL parameters
    const params = new URLSearchParams()
    
    // Add basic fields
    params.append('startDate', formData.startDate.toISOString())
    params.append('from', formData.from)
    params.append('to', formData.to)
    
    // Add stops (filter out empty ones)
    const nonEmptyStops = formData.stops.filter(stop => stop.trim() !== "")
    nonEmptyStops.forEach((stop, index) => {
      params.append(`stop${index + 1}`, stop)
    })
    
    // Add distance fields with units
    params.append('maxDistance', `${formData.maxDistance} ${distanceUnits.maxDistance}`)
    params.append('autonomy', `${formData.autonomy} ${distanceUnits.autonomy}`)
    
    // Add optional fields
    params.append('needHotel', formData.needHotel.toString())
    if (formData.needHotel) {
      params.append('travellers', formData.travellers)
    }

    toast.success("Processing Request");
    setTimeout(() => {
      router.push(`/rentbio?${params.toString()}`)
    }, 3000);
  }


  return (
    <div className="bg-[#FFFFFF] rounded-t-3xl rounded-b-3xl shadow-xl px-4 sm:mx-2 md:px-6 py-6 mx-auto md:mx-4 -mt-4 relative">
      <div className="space-y-4 md:space-y-6">
        {/* Date Picker - unchanged */}
        <div>
          <label className="text-[#00000082] text-[10px] md:text-base font-bold mb-1 md:mb-2 block">STARTS ON</label>
          <label className="text-[#00000082] text-[10px] md:text-base font-medium mb-1 md:mb-2 block">Date</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src="/images/icons/date_icon.png" className="h-6 w-6 md:h-7 md:w-7" alt="Date" />
            </div>
            <div 
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 border border-gray-400 rounded-lg h-11 md:h-12 text-base md:text-lg text-[#00000075] font-semibold flex items-center cursor-pointer"
            >
              {formatDate(formData.startDate)}
            </div>
            <img
              src="/images/icons/Vector.png"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-2 w-3"
              alt="Arrow"
              onClick={() => setShowDatePicker(!showDatePicker)}
            />

            {showDatePicker && (
              <div className="absolute z-10 mt-1 w-full">
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => {
                    handleInputChange("startDate", date)
                    setShowDatePicker(false)
                  }}
                  minDate={new Date()}
                  inline
                />
              </div>
            )}
          </div>
        </div>

        {/* From and To inputs - unchanged */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="text-[#00000082] text-[10px] md:text-base font-medium mb-1 md:mb-2 block">From</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/images/icons/location_icon.png" className="h-6 w-6 md:h-7 md:w-7" alt="Location" />
              </div>
              <Input
                value={formData.from}
                onChange={(e) => handleInputChange("from", e.target.value)}
                onFocus={() => setActiveDropdown('from')}
                placeholder="Search...."
                className="pl-10 md:pl-12 py-2 md:py-3 border-gray-400 rounded-lg h-11 md:h-12 text-base md:text-lg text-[#00000075] font-semibold"
              />
              {activeDropdown === 'from' && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {loadingCities ? (
                    <div className="px-4 py-2 text-gray-500">Loading...</div>
                  ) : cities.length > 0 ? (
                    cities.map((city) => (
                      <div
                        key={`${city.geonameId}-from`}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleInputChange("from", `${city.name}, ${city.countryName}`)
                          setActiveDropdown(null)
                        }}
                      >
                        {city.name}, {city.countryName}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No cities found</div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="text-[#00000082] text-[10px] md:text-base font-medium mb-1 md:mb-2 block">To</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/images/icons/location_icon.png" className="h-6 w-6 md:h-7 md:w-7" alt="Location" />
              </div>
              <Input
                value={formData.to}
                onChange={(e) => handleInputChange("to", e.target.value)}
                onFocus={() => setActiveDropdown('to')}
                placeholder="Search...."
                className="pl-10 md:pl-12 py-2 md:py-3 border-gray-400 rounded-lg h-11 md:h-12 text-base md:text-lg text-[#00000075] font-semibold"
              />
              {activeDropdown === 'to' && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {loadingCities ? (
                    <div className="px-4 py-2 text-gray-500">Loading...</div>
                  ) : cities.length > 0 ? (
                    cities.map((city) => (
                      <div
                        key={`${city.geonameId}-to`}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          handleInputChange("to", `${city.name}, ${city.countryName}`)
                          setActiveDropdown(null)
                        }}
                      >
                        {city.name}, {city.countryName}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">No cities found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Stop inputs */}
        {formData.stops.map((stop, index) => (
          <div key={`stop-${index}`} className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="text-[#00000082] text-[10px] md:text-base font-medium mb-1 md:mb-2 block">
                {index === 0 ? "Stop Enroute" : `Stop ${index + 1}`}
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <img src="/images/icons/location_icon.png" className="h-6 w-6 md:h-7 md:w-7" alt="Location" />
                </div>
                <Input
                  value={stop}
                  onChange={(e) => handleInputChange("stop", e.target.value, index)}
                  onFocus={() => {
                    setActiveDropdown(stop.trim() ? `stop-${index}` : null)
                    setActiveStopIndex(index)
                  }}
                  placeholder="Search...."
                  className="pl-10 md:pl-12 py-2 md:py-3 border-gray-400 rounded-lg h-11 md:h-12 text-base md:text-lg text-[#00000075] font-semibold"
                />
                {activeDropdown === `stop-${index}` && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {loadingCities && activeStopIndex === index ? (
                      <div className="px-4 py-2 text-gray-500">Loading...</div>
                    ) : cities.length > 0 ? (
                      cities.map((city) => (
                        <div
                          key={`${city.geonameId}-stop-${index}`}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            const updatedStops = [...formData.stops]
                            updatedStops[index] = `${city.name}, ${city.countryName}`
                            setFormData(prev => ({
                              ...prev,
                              stops: updatedStops
                            }))
                            setActiveDropdown(null)
                          }}
                        >
                          {city.name}, {city.countryName}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">No cities found</div>
                    )}
                  </div>
                )}
                {formData.stops.length > 1 && (
                  <button 
                    onClick={() => removeStop(index)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4"/>
                  </button>
                )}
              </div>
            </div>
            {index === formData.stops.length - 1 && (
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={addStop}
                  className="w-full h-11 md:h-12 border-gray-300 text-[#00000075] text-xs md:text-sm flex items-center justify-center space-x-2 px-2"
                >
                  <img src="/images/icons/plus_icon.png" className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" alt="Plus" />
                  <span className="truncate">ADD ANOTHER STOP</span>
                </Button>
              </div>
            )}
          </div>
        ))}

        {/* Rest of the form remains unchanged */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <label className="text-[#00000082] text-[10px] md:text-base font-medium mb-1 md:mb-2 block">
              Max driving distance per day
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/images/icons/time_icon.png" className="h-6 w-6 md:h-7 md:w-7" alt="Time" />
              </div>
              <Input
                value={formData.maxDistance}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
          handleInputChange("maxDistance", value ? parseInt(value) : '');
        }}
                className="pl-10 md:pl-12 py-2 md:py-3 border-gray-400 rounded-lg h-11 md:h-12 text-base md:text-lg text-[#00000075] font-semibold"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00000075] font-semibold">
        {distanceUnits.maxDistance}
      </div>
            </div>
            <div className="flex justify-center gap-3 md:gap-4 mt-2">
      <label className="flex items-center gap-1 md:gap-2">
        <Checkbox 
          checked={distanceUnits.maxDistance === 'KM'}
          onCheckedChange={() => setDistanceUnits(prev => ({
            ...prev,
            maxDistance: 'KM'
          }))}
          className="h-4 w-4 md:h-5 md:w-5" 
        />
        <span className="text-xs md:text-sm text-gray-600">KM</span>
      </label>
      <label className="flex items-center gap-1 md:gap-2">
        <Checkbox 
          checked={distanceUnits.maxDistance === 'MI'}
          onCheckedChange={() => setDistanceUnits(prev => ({
            ...prev,
            maxDistance: 'MI'
          }))}
          className="h-4 w-4 md:h-5 md:w-5" 
        />
        <span className="text-xs md:text-sm text-gray-600">MI</span>
      </label>
    </div>
  </div>

          <div>
            <label className="text-[#00000082] text-[10px] md:text-base font-medium mb-1 md:mb-2 block">
              Autonomy of my car
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/images/icons/distance_icon.png" className="h-6 w-6 md:h-7 md:w-7" alt="Distance" />
              </div>
              <Input
                value={formData.autonomy}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, ''); // Only allow numbers
          handleInputChange("autonomy", value ? parseInt(value) : '');
        }}
                className="pl-10 md:pl-12 py-2 md:py-3 border-gray-400 rounded-lg h-11 md:h-12 text-base md:text-lg text-[#00000075] font-semibold"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#00000075] font-semibold">
        {distanceUnits.autonomy}
      </div>
            </div>
            <div className="flex justify-center gap-3 md:gap-4 mt-2">
      <label className="flex items-center gap-1 md:gap-2">
        <Checkbox 
          checked={distanceUnits.autonomy === 'KM'}
          onCheckedChange={() => setDistanceUnits(prev => ({
            ...prev,
            autonomy: 'KM'
          }))}
          className="h-4 w-4 md:h-5 md:w-5" 
        />
        <span className="text-xs md:text-sm text-[#00000075]">KM</span>
      </label>
      <label className="flex items-center gap-1 md:gap-2">
        <Checkbox 
          checked={distanceUnits.autonomy === 'MI'}
          onCheckedChange={() => setDistanceUnits(prev => ({
            ...prev,
            autonomy: 'MI'
          }))}
          className="h-4 w-4 md:h-5 md:w-5" 
        />
        <span className="text-xs md:text-sm text-[#00000075]">MI</span>
      </label>
    </div>
          </div>
        </div>

        <div className="flex items-center justify-start gap-2 md:gap-3 pt-1 md:pt-0">
          <label htmlFor="hotel" className="text-[#00000075] font-medium md:font-semibold text-base md:text-lg">
            Need Hotel
          </label>
          <Checkbox
            id="hotel"
            checked={formData.needHotel}
            onCheckedChange={(checked) => handleInputChange("needHotel", checked)}
            className="h-5 w-5 md:h-6 md:w-6 border-2 border-gray-300"
          />
        </div>

        {formData.needHotel && (
        <div>
          <label className="text-[#00000075] text-[10px] md:text-lg font-medium mb-1 md:mb-2 block">
            Travellers & rooms
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src="/images/icons/travelers_icon.png" className="h-6 w-6 md:h-7 md:w-7" alt="Travelers" />
            </div>
            <div 
      onClick={() => setShowTravellerDropdown(!showTravellerDropdown)}
      className="pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 border-gray-400 rounded-lg h-11 md:h-12 text-base md:text-lg text-[#00000075] font-semibold flex items-center cursor-pointer"
    >
      {formData.travellers}
    </div>
            <img
              src="/images/icons/Vector.png"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-2 w-3"
              alt="Arrow"
            />

            {showTravellerDropdown && (
      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
        {TRAVELLER_OPTIONS.map((option, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              handleInputChange("travellers", option);
              setShowTravellerDropdown(false);
            }}
          >
            {option}
          </div>
        ))}
      </div>
    )}
          </div>
        </div>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:from-[#AA3916] hover:to-[#F96C41] cursor-pointer text-white font-semibold py-3 md:py-4 rounded-lg h-12 md:h-14 text-base md:text-lg mt-3 md:mt-0"
        >
          FIND MY ROUTE
        </Button>

 
      </div>
    </div>
  )
}