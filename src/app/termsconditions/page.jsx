import HalfNavbar from "../common_components/halfnavbar/page"

export default function Page() {
  return (
    <div className="w-svw min-h-screen bg-white">
      <div className="bg-black px-3 pt-1 pb-4 min-h-[45vh] flex flex-col rounded-b-[16px] sm:rounded-b-[20px]">
        <HalfNavbar />
      </div>

      <div className="w-full -mt-50 md:-mt-80 lg:-mt-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-sm text-[#FFFFFFCC] mb-2">
            Home &gt; Pages &gt; <span className="text-[#FFFFFF]">Terms and Conditions</span>
          </div>

          <div className="w-full px-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Terms and Conditions
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              EvCarTrips.com
            </h2>
          </div>

          <div className=" bg-white shadow-2xl w-[300px] md:w-[695px] lg:w-[800px] h-auto p-4 rounded-lg mx-auto">

            <p className="mb-6 text-gray-800 leading-relaxed max-w-4xl">
              Welcome to EvCarTrips.com!<br />
              By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. These terms govern your use of our platform, including vehicle bookings, trip planning, and all other related services. Please read them carefully before proceeding.<br />
              By using EvCarTrips.com, you acknowledge that:
            </p>


            <ul className="list-disc mt-10 pl-6 mb-6 space-y-2 text-gray-800 max-w-4xl marker:text-[#F96C41]">
  <li>All users must provide accurate and complete information during registration or booking.</li>
  <li>Vehicle availability, pricing, and trip schedules are subject to change without prior notice.</li>
  <li>You are responsible for complying with local traffic laws and ensuring the safety of the rented vehicle.</li>
  <li>Any misuse or damage to the vehicle during your trip will result in applicable charges as per our policy.</li>
</ul>

            <p className="text-gray-800 mt-10 leading-relaxed max-w-4xl">
              We reserve the right to update these terms at any time. Continued use of the platform following any changes implies acceptance of the revised terms.<br />
              If you have any questions or concerns regarding these terms, please contact us at <a href="mailto:support@evcartrips.com" className="text-[#F96C41] hover:underline">support@evcartrips.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}