"use client";
import { useEffect, useState } from "react";
import { Search, ChevronDown, RotateCcw } from "lucide-react";

export default function HotelFilters({ initialFilters, onApply, onCancel }) {
  const [filters, setFilters] = useState(initialFilters);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [showMoreChains, setShowMoreChains] = useState(false);
  const [showMoreRoomTypes, setShowMoreRoomTypes] = useState(false);
  const [hotelName, setHotelName] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  
  const allAmenities = [
    { name: "Air conditioning", count: 3 },
    { name: "Airport shuttle", count: 28 },
    { name: "Bar", count: 7 },
    { name: "Business center", count: 21 },
    { name: "Casino", count: 19 },
    { name: "Fitness center", count: 15 },
    { name: "Free WiFi", count: 32 },
    { name: "Pool", count: 12 },
  ];

  const allChains = [
    { name: "Inter", count: 3 },
    { name: "Carlson Hospitality", count: 28 },
    { name: "Every Hilton", count: 7 },
    { name: "Marriott Intl", count: 21 },
    { name: "Preferred Hotel Grp", count: 19 },
    { name: "Hyatt Hotels", count: 14 },
    { name: "Accor Hotels", count: 9 },
  ];

  const allRoomTypes = [
    { name: "2 double beds", count: 3 },
    { name: "2 queen beds", count: 28 },
    { name: "Double", count: 7 },
    { name: "Double/Twin", count: 21 },
    { name: "Family", count: 19 },
    { name: "King", count: 15 },
    { name: "Queen", count: 22 },
  ];

  const handleRatingChange = (rating) => {
    setFilters(prev => {
    const newRatings = prev.selectedRatings.includes(rating)
      ? prev.selectedRatings.filter(r => r !== rating)
      : [...prev.selectedRatings, rating];
    return { ...prev, selectedRatings: newRatings };
  });
  };

  const handleDistanceChange = (distance) => {
    setFilters(prev => ({
      ...prev,
      maxDistance: distance,
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleChainToggle = (chain) => {
    setFilters(prev => {
      const newChains = prev.chains.includes(chain)
        ? prev.chains.filter(c => c !== chain)
        : [...prev.chains, chain];
      return { ...prev, chains: newChains };
    });
  };

  const handleRoomTypeToggle = (roomType) => {
    setFilters(prev => {
      const newRoomTypes = prev.roomTypes.includes(roomType)
        ? prev.roomTypes.filter(r => r !== roomType)
        : [...prev.roomTypes, roomType];
      return { ...prev, roomTypes: newRoomTypes };
    });
  };

  const handleRefundableToggle = () => {
    setFilters(prev => ({
      ...prev,
      refundableOnly: !prev.refundableOnly,
    }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <span key={i} className="text-orange-500 text-sm">
        ★
      </span>
    ));
  };

  const handleNameChange = (e) => {
    setHotelName(e.target.value);
    setFilters(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleReset = () => {
    setFilters({
    selectedRatings: [],
      minRating: 0,
      maxDistance: 100,
      amenities: [],
      chains: [],
      roomTypes: [],
      refundableOnly: false,
      name: ""
    });
    setHotelName("");
  };

  // Update filters when initialFilters changes
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return (
    <div className="w-80 bg-white p-6 space-y-6">
      <div className="space-y-6">
         <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        <button 
          onClick={handleReset}
          className="flex items-center gap-1 text-orange-500 text-sm font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

        {/* General Section */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">General</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Hotel Name</label>
              <div className="relative">
                <input
                type="text"
                placeholder="Enter hotel name"
                value={hotelName}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Point of Interest Section */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Distance from location</h3>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.maxDistance}
              onChange={(e) => handleDistanceChange(e.target.value)}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm font-medium">{filters.maxDistance} km</span>
          </div>
        </div>

        {/* Star Rating Section */} 
<div className="border border-gray-200 rounded-lg p-4 space-y-4">
  <h3 className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Star rating</h3>
  <div className="space-y-3">
    {[5, 4, 3, 2].map((rating) => (
      <div key={rating} className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`w-4 h-4 rounded border-2 cursor-pointer flex items-center justify-center ${
              filters.selectedRatings.includes(rating) ? "bg-orange-500 border-orange-500" : "border-gray-300 bg-gray-100"
            }`}
            onClick={() => handleRatingChange(rating)}
          >
            {filters.selectedRatings.includes(rating) && <div className="w-2 h-2 bg-white rounded-sm"></div>}
          </div>
          <div className="flex items-center">{renderStars(rating)}</div>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* Amenities Section */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Amenities</h3>
          <div className="space-y-3">
            {(showMoreAmenities ? allAmenities : allAmenities.slice(0, 5)).map((amenity) => (
              <div key={amenity.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded border-2 cursor-pointer flex items-center justify-center ${
                      filters.amenities.includes(amenity.name) ? "bg-orange-500 border-orange-500" : "border-gray-300 bg-gray-100"
                    }`}
                    onClick={() => handleAmenityToggle(amenity.name)}
                  >
                    {filters.amenities.includes(amenity.name) && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                  </div>
                  <span className="text-sm text-gray-700">{amenity.name}</span>
                </div>
                <span className="text-sm text-gray-500">({amenity.count})</span>
              </div>
            ))}
            <button 
              className="text-orange-500 text-sm font-medium"
              onClick={() => setShowMoreAmenities(!showMoreAmenities)}
            >
              {showMoreAmenities ? "Show less" : "Show more"}
            </button>
          </div>
        </div>

        {/* Hotel Chain Group Section */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Hotel chain group</h3>
          <div className="space-y-3">
            {(showMoreChains ? allChains : allChains.slice(0, 5)).map((chain) => (
              <div key={chain.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded border-2 cursor-pointer flex items-center justify-center ${
                      filters.chains.includes(chain.name) ? "bg-orange-500 border-orange-500" : "border-gray-300 bg-gray-100"
                    }`}
                    onClick={() => handleChainToggle(chain.name)}
                  >
                    {filters.chains.includes(chain.name) && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                  </div>
                  <span className="text-sm text-gray-700">{chain.name}</span>
                </div>
                <span className="text-sm text-gray-500">({chain.count})</span>
              </div>
            ))}
            <button 
              className="text-orange-500 text-sm font-medium"
              onClick={() => setShowMoreChains(!showMoreChains)}
            >
              {showMoreChains ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>

      {/* Room Filters */}
      <div className="space-y-6">
        <h2 className="text-lg font-medium text-gray-900">Room Filters</h2>

        {/* General Section */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">General</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded border-2 cursor-pointer flex items-center justify-center ${
                  filters.refundableOnly ? "bg-orange-500 border-orange-500" : "border-gray-300 bg-gray-100"
                }`}
                onClick={handleRefundableToggle}
              >
                {filters.refundableOnly && <div className="w-2 h-2 bg-white rounded-sm"></div>}
              </div>
              <span className="text-sm text-gray-700">Refundable Room Only</span>
            </div>
          </div>
        </div>

        {/* Room Type Section */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded">Room type</h3>
          <div className="space-y-3">
            {(showMoreRoomTypes ? allRoomTypes : allRoomTypes.slice(0, 5)).map((type) => (
              <div key={type.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded border-2 cursor-pointer flex items-center justify-center ${
                      filters.roomTypes.includes(type.name) ? "bg-orange-500 border-orange-500" : "border-gray-300 bg-gray-100"
                    }`}
                    onClick={() => handleRoomTypeToggle(type.name)}
                  >
                    {filters.roomTypes.includes(type.name) && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                  </div>
                  <span className="text-sm text-gray-700">{type.name}</span>
                </div>
                <span className="text-sm text-gray-500">({type.count})</span>
              </div>
            ))}
            <button 
              className="text-orange-500 text-sm font-medium"
              onClick={() => setShowMoreRoomTypes(!showMoreRoomTypes)}
            >
              {showMoreRoomTypes ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button 
          className="px-4 py-3 border border-gray-300 rounded-lg flex-1"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          className="px-4 py-3 bg-[#F96C41] text-white rounded-lg flex-1"
          onClick={handleApply}
        >
          Apply Filters
        </button>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f97316;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}