import Link from "next/link"
import Navbar from "../../common_components/navbar/page"
import Footer from "../../components/ui/footer"

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-black px-3 sm:px-4 pt-1 pb-4 min-h-[10vh] flex flex-col">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        {/* Large 404 Text */}
        <div className="mb-4">
          <h1 className="text-8xl md:text-9xl font-black text-black leading-none">404</h1>
        </div>

        {/* Not Found Text */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-600">Not Found!</h2>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <img src="/images/404.png" alt="404 Error Illustration" className="w-64 h-auto md:w-80" />
        </div>

        {/* Error Message */}
        <div className="mb-8 max-w-md">
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Oops! Sorry, we can't find the page you're looking for. It might have been moved, deleted, or maybe it never
            existed.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="w-full max-w-sm">
          <Link href="/">
            <button className="w-full bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:from-[#AA3916] hover:to-[#F96C41] text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
              BACK TO HOME
            </button>
          </Link>
        </div>
      </div>
      {/* Animated Footer */}
            <div className="max-md:hidden">

              <Footer />
            </div>
           
    </div>
  )
}
