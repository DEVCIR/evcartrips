import { Star, MapPin, Moon, Users } from "lucide-react"

const HotelCard = ({ name, rating, address, nights, travelers, price, image }) => {
  // Generate star rating
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star key={i} className={`w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 ${i < rating ? "text-orange-400 fill-orange-400" : "text-gray-300"}`} data-aos="fade-right"
      data-aos-delay={i * 50} />
  ))

  return (
    <div className="w-[348px] md:w-[692px] xl:w-[900px] h-auto bg-white rounded-3xl shadow-lg overflow-hidden mb-8 p-4 md:p-6 mx-auto" data-aos="fade-up">
      <div className="flex flex-row">
        <div className="w-[163px] h-[160px] md:w-[324px] md:h-[284px] xl:w-[560px] xl:h-[400px] " data-aos="zoom-in">
          <img src={"images/1.jpg"} alt={name} className="w-full h-full object-cover rounded-3xl" data-aos="fade-right" />
        </div>
        <div className="pl-4 flex flex-col justify-between w-2/5 md:w-3/5 text-black" data-aos="fade-left">
          <div>
            <h2 className="font-semibold text-[14px] -tracking-[0.44px] md:text-[29px] md:-tracking-[0.87px] xl:text-[40px] xl:-tracking-[1.5px] xl:leading-[50px] mb-1 md:mb-2" data-aos="fade-down">{name}</h2>
            <div className="flex items-center mb-1 md:mb-4" data-aos="fade-up">{stars}</div>
            <div className="flex items-center mb-1 md:mb-2 " data-aos="fade-right"
              data-aos-delay="100">
              <MapPin className="w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 mr-1 md:mr-2 text-blue-500" />
              <span className="text-blue-500 font-normal text-[8px] -tracking-[0.44px] md:text-[16px] md:-tracking-[0.87px] xl:text-[29px] xl:-tracking-[1.5px]">{address}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-1 md:mb-2" data-aos="fade-right"
              data-aos-delay="150"
>
              <Moon className="w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 mr-1 md:mr-2 text-gray-500" />
              <span className="font-normal text-[8px] -tracking-[0.44px] md:text-[16px] md:-tracking-[0.87px] xl:text-[29px] xl:-tracking-[1.5px]">Nights: {nights}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4" data-aos="fade-right"
              data-aos-delay="200">
              <Users className="w-3 h-3 md:w-6 md:h-6 xl:w-10 xl:h-10 mr-1 md:mr-2 text-gray-500" />
              <span className="font-normal text-[8px] -tracking-[0.44px] md:text-[16px] md:-tracking-[0.87px] xl:text-[29px] xl:-tracking-[1.5px]">Travler(s): {travelers}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center md:pt-4" data-aos="fade-up"
        data-aos-delay="250">
        <div className="text-center">
          <p className="font-semibold text-[15px] -tracking-[0.44px] md:text-[29px] md:-tracking-[0.87px] xl:text-4xl xl:font-bold text-gray-900">USD$ {price}</p>
          <p className="font-semibold text-[6px] -tracking-[0.44px] md:text-[11px] md:-tracking-[0.87px] text-gray-500">Inclusive taxes</p>
        </div>
        <button className="px-4 py-2 md:px-8 md:py-4 rounded-md md:rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg flex items-center font-bold text-[8px] -tracking-[0.41px] md:text-[11px] md:-tracking-[0.81px]" data-aos="zoom-in"
          data-aos-delay="300">
          CHOOSE ROOM
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3 h-3 md:w-5 md:h-5 ml-1 md:ml-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default HotelCard
