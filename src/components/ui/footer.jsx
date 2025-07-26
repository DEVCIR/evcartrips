import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-row max-sm:flex-col  max-lg:items-center justify-between items-start gap-8">
          {/* Left side - Logo and Quick Links */}
          <div className="flex-1">
            {/* Logo */}
            <div className="mb-8">
              <Image src="/images/evcartrips-logo.png" alt="EVCartrips Logo" width={200} height={60} className="h-12 w-auto" />
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
              <nav className="flex flex-wrap gap-6  max-sm:gap-x-6 max-sm:gap-y-2">
                <Link href="/home" className="text-white hover:text-orange-500 transition-colors">
                  Home
                </Link>
                <Link href="/about-us" className="text-white hover:text-orange-500 transition-colors"> 
                  About us
                </Link>
                <Link href="/contactus" className="text-white hover:text-orange-500 transition-colors">
                  Contact us
                </Link>
                <Link href="/signup" className="text-white hover:text-orange-500 transition-colors">
                  Sign-up
                </Link>
                <Link href="/signin" className="text-white hover:text-orange-500 transition-colors">
                  Sign-in
                </Link>
                <Link href="/thankyou" className="text-white hover:text-orange-500 transition-colors">
                  Thankyou
                </Link>
              </nav>
            </div>
          </div>

          {/* Right side - Payment Methods */}
          <div className="flex-shrink-0 ">
            <div className="grid grid-cols-3 gap-3  max-sm:gap-x-10 max-sm:gap-y-4">
              {/* Row 1 */}
              <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center min-w-[70px] h-10">
                <span className="text-black font-bold text-sm">AMEX</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center min-w-[70px] h-10">
                <span className="text-black font-bold text-sm">VISA</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center min-w-[70px] h-10">
                <span className="text-black font-bold text-xl">$</span>
              </div>

              {/* Row 2 */}
              <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center min-w-[70px] h-10">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full -ml-2"></div>
                </div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center min-w-[70px] h-10">
                <span className="text-blue-600 font-bold text-sm">PayPal</span>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 flex items-center justify-center min-w-[70px] h-10">
                <span className="text-black font-semibold text-sm">🍎 Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with divider */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <Link href="/termsconditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>

            <div className="text-center">© 2025 EVCartrips</div>

            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
