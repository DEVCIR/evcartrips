import { User } from "lucide-react"

export default function Navbar1() {
  return (
    <nav className="bg-black px-4 py-3 flex items-center justify-between">
     
      <div className="flex items-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 11V13H8L13.5 18.5L12.08 19.92L4.16 12L12.08 4.07996L13.5 5.49996L8 11H20Z" fill="white"/>
</svg>

      </div>

    
      <div className="flex items-center">
        <img src="/images/evcartrips-logo.png" alt="evcartrips.com" className="h-8 w-auto md:h-10" />
      </div>

   
      <div className="flex items-center space-x-2 md:space-x-3">
        
        <div className="relative">
          <img src="/images/icons/cart_icon.png" className="h-5 w-5 md:h-6 md:w-6" alt="Cart" />
          <div className="absolute -top-0 -right-0 bg-orange-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
            1
          </div>
        </div>

        
        <div className="bg-gray-600 rounded-full p-1">
          <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
        </div>
      </div>
    </nav>
  )
}
