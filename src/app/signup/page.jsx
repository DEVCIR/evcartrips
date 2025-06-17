import Navbar from "../common_components/navbar/page"
import SignUpForm from "../common_components/signupform/page"
import Rentals from "../common_components/rentals/page"

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black px-3 sm:px-4 md:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 min-h-[40vh] md:min-h-[50vh] flex flex-col justify-start rounded-b-[24px] sm:rounded-b-[32px] md:rounded-b-[40px]">
        <Navbar />
        <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full space-y-2 mt-10 text-center">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            CREATE ACCOUNT
          </h1>
          <div className="text-[#FFFFFFAB] mt-4 font-semibold text-sm sm:text-base">
            <p>Book EV trips & hotels in one</p>
            <p>place---fast, easy, and green.</p>
          </div>
        </div>
      </div>

      <div className="px-8 -mt-18 pb-8">
        <div className="max-w-full mx-auto">
          <SignUpForm />
        </div>
      </div>

      <div className="px-8 mt-4 pb-8 mx-3">
        <div className="max-w-full mx-auto">
          <Rentals />
        </div>
      </div>
    </div>
  )
}