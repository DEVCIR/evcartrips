"use client";
import { ListFilter, X } from "lucide-react";
import HotelCard from "../../components/ui/hotel-card";
import Navbar from "../common_components/navbar/page";
import HotelFilters from "../common_components/hotel-filters/page";
import { useState , useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    selectedRatings: [],
    minRating: 0,
    maxDistance: 100,
    amenities: [],
    chains: [],
    roomTypes: [],
    refundableOnly: false,  
    name: ""
  });
  const [sortOption, setSortOption] = useState("recommended");
  const [allHotels, setAllHotels] = useState([]); // Dynamic hotels array
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [sortedHotels, setSortedHotels] = useState([]);

const fromCity = searchParams.get('from')?.split(',')[0] || "Karachi";
  const toCity = searchParams.get('to')?.split(',')[0] || "Islamabad";
  const travellers = searchParams.get('travellers') || "2 Adult(s)";
  const stops = [
    searchParams.get('stop1')?.split(',')[0],
    searchParams.get('stop2')?.split(',')[0],
    searchParams.get('stop3')?.split(',')[0]
  ].filter(Boolean); // Remove empty stops

  const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};


  // Generate dynamic hotels array based on cities
  useEffect(() => {
  const cities = [fromCity, ...stops, toCity];
  const dynamicHotels = cities.map((city, index) => ({
    id: index + 1,
    name: `Best Hotels in ${city}`,
    rating: Math.floor(seededRandom(index) * 5) + 1, // Fixed sequence (no Math.random)
    address: `${city} City Center`,
    nights: 1,
    travelers: travellers,
    price: Math.floor(seededRandom(index + 1) * 200) + 100, // Fi xed sequence (no Math.random)
    image: "/images/1.jpg",
    distance: (index + 1) * 10,
    amenities: ["Air conditioning", "WiFi", "Parking"],
    chain: "Local Chain",
    roomType: "Standard",
    refundable: true,
  }));

  setAllHotels(dynamicHotels);
  setFilteredHotels(dynamicHotels);
  setSortedHotels(dynamicHotels);
}, [fromCity, toCity, stops, travellers]);



 // Filter hotels
  useEffect(() => {
    const filtered = allHotels.filter(hotel => {
      if (filters.name && !hotel.name.toLowerCase().includes(filters.name.toLowerCase())) {
        return false;
      }
      if (filters.selectedRatings.length > 0 && !filters.selectedRatings.includes(hotel.rating)) {
        return false;
      }
      if (hotel.distance > filters.maxDistance) {
        return false;
      }
      if (filters.amenities.length > 0 && 
          !filters.amenities.every(amenity => hotel.amenities.includes(amenity))) {
        return false;
      }
      if (filters.chains.length > 0 && !filters.chains.includes(hotel.chain)) {
        return false;
      }
      if (filters.roomTypes.length > 0 && !filters.roomTypes.includes(hotel.roomType)) {
        return false;
      }
      if (filters.refundableOnly && !hotel.refundable) {
        return false;
      }
      return true;
    });
    setFilteredHotels(filtered);
  }, [filters, allHotels]);

  // Apply sorting
  useEffect(() => {
    let sorted = [...filteredHotels];
    switch(sortOption) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setSortedHotels(sorted);
  }, [filteredHotels, sortOption]);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="min-h-screen bg-black text-white" data-aos="fade-in">
      {showFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0  bg-opacity-50"
            onClick={toggleFilters}
          ></div>
          
          <div className="absolute left-0 top-0 h-full w-full max-w-sm bg-white text-black overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button 
                  onClick={toggleFilters}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <HotelFilters 
                initialFilters={filters}
                onApply={applyFilters}
                onCancel={toggleFilters}
              />
            </div>
          </div>
        </div>
      )}
      
      <div className="md:px-8">
        <Navbar />
      </div>
      
      <main className="container mx-auto py-8">
        <section className="my-8 px-8 md:px-14">
          <h1 className="text-[10px] md:text-[20px] md:-tracking-[0.81px] xl:text-[34px] xl:-tracking-[1.4px] -tracking-[0.41px] font-bold mb-6 text-center"
          data-aos="fade-down">
            Hotels in Frankfurt
          </h1>

          <div className="flex justify-between items-center mb-6"
          data-aos="fade-up"
            data-aos-delay="100"
            >
            <p className="font-bold text-[10px] -tracking-[0.41px] md:text-[12px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.4px] text-white">
              Showing results {filteredHotels.length} of {allHotels.length}
            </p>

            <div className="relative" data-aos="fade-left" data-aos-delay="150">
              <select value={sortOption}
            onChange={handleSortChange}
           className="appearance-none bg-transparent text-white pr-0 font-semibold text-[10px] md:text-[15px] md:-tracking-[0.81px] xl:text-[20px] xl:-tracking-[1.4px] focus:outline-none">
                <option value="recommended" className="text-black">Recommended</option>
          <option value="price-low" className="text-black">Price: Low to High</option>
          <option value="price-high" className="text-black">Price: High to Low</option>
          <option value="rating" className="text-black">Rating</option>
              </select>
              <div className="pointer-events-none absolute inset-y-3.5 -right-3 md:inset-y-0 md:-right-2 flex items-center px-2 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-8"
          data-aos="fade-up"
            data-aos-delay="200"
            >
            <button onClick={toggleFilters} className="flex items-center justify-center px-10 py-3 rounded-full bg-[#F96C41D9] text-white font-semibold shadow-lg w-full max-w-3xl text-[10px] md:text-[14px] xl:text-[20px] xl:-tracking-[1.4px]"
            data-aos="zoom-in"
              data-aos-delay="250"
              >
              <ListFilter className="w-2 h-2 md:w-4 md:h-4 xl:w-5 xl:h-5 mr-1 md:mr-3" />
              Filters
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-y-4 md:gap-y-8 mb-12">
          {sortedHotels.map((hotel , index) => (
            <div key={hotel.id} data-aos="fade-up" data-aos-delay={index * 100}>
            <HotelCard  {...hotel} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}