// import HalfNavbar1 from "../common_components/halfnavbar1/page"

// export default function Page() {
//   return (
//     <div className="min-h-screen bg-white">
//       <div className="bg-black px-3 sm:px-4 pt-1 pb-4 min-h-[10vh] flex flex-col rounded-b-[16px] sm:rounded-b-[20px]">
//         <HalfNavbar1 />
//       </div>

//       <div className="w-full">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

//         </div>
//       </div>
//     </div>
//   )
// }



import HalfNavbar1 from "../common_components/halfnavbar1/page"

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black px-3 sm:px-4 pt-1 pb-4 min-h-[10vh] flex flex-col rounded-b-[16px] sm:rounded-b-[20px]">
        <HalfNavbar1 />
      </div>

      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
            {/* Checkmark SVG */}
            <div className="mb-4 sm:mb-6">
              <svg
                width="66"
                height="65"
                viewBox="0 0 66 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-[66px] md:h-[65px]"
              >
                <circle cx="32.7664" cy="32.387" r="32.387" fill="#F96C41" fillOpacity="0.19" />
                <path
                  d="M32.1882 16.9646C23.6905 16.9646 16.7659 23.8892 16.7659 32.387C16.7659 40.8847 23.6905 47.8093 32.1882 47.8093C40.686 47.8093 47.6106 40.8847 47.6106 32.387C47.6106 23.8892 40.686 16.9646 32.1882 16.9646ZM39.5601 28.8398L30.8156 37.5843C30.5997 37.8002 30.3067 37.9236 29.9983 37.9236C29.6898 37.9236 29.3968 37.8002 29.1809 37.5843L24.8163 33.2198C24.3691 32.7725 24.3691 32.0323 24.8163 31.585C25.2636 31.1378 26.0039 31.1378 26.4511 31.585L29.9983 35.1321L37.9254 27.2051C38.3726 26.7578 39.1129 26.7578 39.5601 27.2051C40.0074 27.6523 40.0074 28.3771 39.5601 28.8398Z"
                  fill="#F96C41"
                />
              </svg>
            </div>

            {/* Payment Success Heading */}
            <h1 className="text-xl sm:text-2xl md:text-3xl  text-gray-900 mb-2">Payment Success!</h1>

            {/* Amount */}
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">US$ 750.00</p>

            {/* Payment Details Container */}
            <div className="w-full max-w-sm sm:max-w-md rounded-lg p-3 sm:p-4 md:p-6 mb-6 sm:mb-8">
              {/* Divider Line - spans full width */}
              <div className="w-full border-t border-gray-400 mb-4 sm:mb-6"></div>

              {/* Payment Details with perfect alignment and proper spacing */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base text-left">Ref Number</span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base text-left">000085752257</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base text-left">Payment Time</span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base text-left">25-06-2025, 13:22:16</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base text-left">Payment Method</span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base text-left">Bank Transfer</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base text-left">Sender Name</span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base text-left">Billed Hossain</span>
                </div>

                <div className="w-full border-t border-[#F96C41] border-dashed mb-4 sm:mb-6"></div>


                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base text-left">Amount</span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base text-left">US$ 750.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm sm:text-base text-left">Tax</span>
                  <span className="text-gray-900 font-medium text-sm sm:text-base text-left">US$ 50.00</span>
                </div>
              </div>
            </div>

            {/* Home Page Button - full width and centered on all screens */}
            <div className="w-full max-w-sm sm:max-w-md">
              <button className="w-full bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-[#E55B30] text-white font-bold py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-base transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]">
                HOME PAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
