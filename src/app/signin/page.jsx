import Navbar from "../common_components/navbar/page"
import SignInForm from "../common_components/signInForm/page"
import Rentals from "../common_components/rentals/page"

export default function Page() {
  return (
    <div className="w-svw min-h-screen bg-white">
      <div className="bg-black px-3 sm:px-4 md:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 min-h-[40vh] lg:min-h-[60vh] xl:min-h-[80vh] flex flex-col justify-start rounded-b-[24px] sm:rounded-b-[32px] md:rounded-b-[20px]">
        <Navbar />
        <div className="max-w-sm md:max-w-md lg:max-w-lg mx-auto w-full space-y-2 mt-4 xl:mt-24 text-center">
          <h1 className="text-[#FFFFFFEB] font-bold text-[16px] -tracking-[0.41px] md:text-[26px] md:-tracking-[0.68px] xl:text-[45px] xl:-tracking-[1.17px]"> 
            WELCOME BACK
          </h1>
          <div className="text-[#FFFFFFAB] font-[400] text-[14px] -tracking-[0.41px] md:text-[23px] md:-tracking-[0.68px] xl:text-[40px] xl:-tracking-[1.17px] xl:-space-y-3">
            <p>Log in to manage your EV trips</p>
            <p>and hotel bookings.</p>
          </div>
        </div>
      </div>

      <div className="-mt-24 md:-mt-30 xl:-mt-40 pb-8">
        <div className="mx-auto">
          <SignInForm />
        </div>
      </div>

      <div className="px-8 mt-4 pb-8 mx-3 md:hidden">
        <div className="max-w-full mx-auto">
          <Rentals />
        </div>
      </div>
    </div>
  )
}