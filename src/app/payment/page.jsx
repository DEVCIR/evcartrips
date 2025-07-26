"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Users, Bed, Utensils, ChevronDown, CreditCard, Building2, Coins, Info, UserIcon, User, Globe, Phone, Mail, ClockAlert, LockKeyhole, Earth } from "lucide-react"
import { Star, Car, Coffee, ChevronRight } from "lucide-react"
import { MealIcon, RoomIcon } from "../hotel-select/components/Icons"
import HalfNavbar1 from "../../common_components/halfnavbar1/page"
import Navbar from "../../common_components/navbar/page"
import Footer from '../../components/ui/footer'
import Rentals from '../../common_components/rentals/page'
import CarDiv from '../../common_components/cardiv/page'
import countryData from 'country-code-flag-phone-extension-json/dist/index.json';
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { processPayment } from '../actions/payment';

// Move stripePromise outside component to prevent recreation on every render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [allReservations, setAllReservations] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef(null);
    
  useEffect(() => {
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      // Check if reservationDetailsByStop exists in localStorage
      const reservationDetails = localStorage.getItem('reservationDetailsByStop');
      if (!reservationDetails) {
        // Redirect to home page if no reservation details found
        router.push('/');
        return;
      }
      
      // Load user data from localStorage
      const storedUserData = JSON.parse(localStorage.getItem('userData') || '{}');
      setUserData(storedUserData);
    
      // Load reservation data
      const allSelections = JSON.parse(reservationDetails || '{}');
      setAllReservations(allSelections);
    }
    setIsLoading(false);

    const handleCartUpdate = () => {
      const updatedSelections = JSON.parse(localStorage.getItem('reservationDetailsByStop') || '{}');
      setAllReservations(updatedSelections);
    };
    window.addEventListener('reservationDetailsUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('reservationDetailsUpdated', handleCartUpdate);
    };
    
    // Set loading to false after checking localStorage
  }, [router]);

  // Helper functions for formatting
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    let day, month, year;
    
    // Accepts YYYY-MM-DD or YYYYMMDD
    if (dateStr.length === 8) {
      // YYYYMMDD format
      year = dateStr.slice(0, 4);
      month = parseInt(dateStr.slice(4, 6)) - 1; // 0-based index
      day = parseInt(dateStr.slice(6, 8));
    } else if (dateStr.length === 10) {
      // YYYY-MM-DD format
      year = dateStr.slice(0, 4);
      month = parseInt(dateStr.slice(5, 7)) - 1; // 0-based index
      day = parseInt(dateStr.slice(8, 10));
    } else {
      return dateStr;
    }
    
    return `${day} ${months[month]} ${year}`;
  };

  const roomDetails = [
    {
      icon: <UserIcon className="md:w-4 md:h-4 h-2 w-2 mr-1" />,
      text: `2 Sleeps`,
    },
    { icon: <RoomIcon className="md:w-4 md:h-4 h-2 w-2 mr-1" />, text: "Double" },
    { icon: <MealIcon className="md:w-4 md:h-4 h-2 w-2 mr-1" />, text: "Bread and Breakfast BB" },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={12} className={index < rating ? "fill-orange-400 text-orange-400" : "text-gray-300"} />
    ))
  }

  
  // Calculate total price from reservations
  const calculateTotalPrice = () => {
    let total = 0;
    Object.values(allReservations).forEach(data => {
      const price = data.selectedRoom?.price || 0;
      const quantity = data.quantity || 1;
      total += price * quantity;
    });
    return total.toFixed(2);
  };

  const totalPrice = calculateTotalPrice();

  function CardSection() {
    const elementOptions = {
      style: {
        base: {
          fontSize: '16px',
          color: '#222',
          '::placeholder': { color: '#888' },
          fontFamily: 'inherit',
          backgroundColor: '#fff',
        },
        invalid: { color: '#F96C41' },
      },
    };
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className="space-y-0 relative">
            <label htmlFor="cardNumber" className="md:text-sm text-xs rounded-md absolute top-[-10px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
              <CreditCard className="w-3 h-3 text-gray-500"/>
              Card Number
            </label>
            <div className="w-full px-5 py-4 border border-gray-300 rounded-lg bg-white">
              <CardNumberElement id="cardNumber" options={elementOptions} />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="expiryDate" className="md:text-sm text-xs rounded-md font-medium absolute top-[-10px] left-2 md:left-6 bg-[#F6F6F6] py-1 px-3 md:w-[46%] w-[70%] text-gray-700 flex items-center gap-2">
              <ClockAlert className="w-3 h-3 text-gray-500 "/>
              Expiration Date
            </label>
            <div className="w-full px-5 py-4 border border-gray-300 rounded-lg bg-white">
              <CardExpiryElement id="expiryDate" options={elementOptions} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className="space-y-0 relative">
            <label htmlFor="securityCode" className="md:text-sm text-xs rounded-md absolute top-[-10px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
              <LockKeyhole className="w-3 h-3 text-gray-500" />
              Security Code
            </label>
            <div className="w-full px-5 py-4 border border-gray-300 rounded-lg bg-white">
              <CardCvcElement id="securityCode" options={elementOptions} />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="zipCode" className="md:text-sm text-xs rounded-md font-medium absolute top-[-10px] left-2 md:left-6 bg-[#F6F6F6] py-1 px-2 md:w-[40%] w-[50%] text-gray-700 flex items-center gap-2">
              <Earth className="w-3 h-3 text-gray-500" />
              ZIP Code
            </label>
            <input
              name="zipCode"
              type="text"
              placeholder="ZIP code"
              className="w-full px-5 py-4 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>
      </div>
    );
  }

  function PaymentForm({ children }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (selectedPayment === 'card') {
        if (!stripe || !elements) {
          toast.error('Stripe is not loaded');
          return;
        }
        
        const cardElement = elements.getElement(CardNumberElement);
        const { token, error } = await stripe.createToken(cardElement);
        
        if (error) {
          toast.error(error.message);
          return;
        }
        
        // Add stripe token to form data
        const formData = new FormData(e.target);
        formData.append('stripeToken', token.id);
        
        // Only access localStorage in browser environment
        if (typeof window !== 'undefined') {
          formData.append('token', localStorage.getItem('token'));
          const user = localStorage.getItem('user');
          const parsedUser = JSON.parse(user);
          // console.log(parsedUser.id);
          formData.append('userId', parsedUser.id);
        }
        
        // return;
        // Process payment with server action
        const result = await processPayment(formData);
        
        
        if (result.success) {
          toast.success(result.message);
          const orderDetails = {
            orderId: result.orderId,
            paymentTime: result.paymentTime,
            paymentMethod: result.paymentMethod,
            senderName: result.senderName,
            totalPrice: result.totalPrice,
          };


          if (typeof window !== 'undefined') {
            localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
          }
          // Only access localStorage in browser environment
          if (typeof window !== 'undefined') {
            localStorage.removeItem('reservationDetailsByStop');
          }
          // Redirect to thank you page after successful payment
          router.push('/thankyou');
        } else {
          toast.error(result.message);
        }
      } else {
        
        toast.success("Only Card Payments are Available");
      }
    };

    return (
      <form ref={formRef} onSubmit={handleSubmit}>
        {children}
      </form>
    );
  }
  
  // Show loading spinner while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F96C41] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Payment Header */}
<ToastContainer/>

      <div 
        className="bg-black px-3 sm:px-4 pt-1 pb-4 min-h-[50vh] md:min-h-[60vh] flex flex-col rounded-b-[16px] sm:rounded-b-[20px]">
        <div className="xl:hidden">
          <HalfNavbar1 />
        </div>
        <div className="max-xl:hidden">
          <Navbar />
        </div>
      </div>

      <div className="-mt-[16rem] md:-mt-[30rem] lg:-mt-[16rem] xl:-mt-[20rem] px-2">

      <Elements stripe={stripePromise}>
      <div className="max-md:px-2 py-6  max-w-md md:max-w-md md:flex md:justify-center w-full md:px-14 lg:px-20 mt-4  md:mt-24 lg:mt-0 pb-8 xl:px-48  mx-auto">
        <h1 className="text-2xl font-semibold text-white">Payment</h1>
      </div>

      {/* Step 1: Review and Book */}
      <div className=" mb-6 w-full md:px-14 lg:px-0 mt-4 pb-8 xl:px-48  mx-auto">
        <div className="flex items-center justify-start w-full md:px-2 lg:px-2 mt-4 pb-8 xl:px-2 gap-3 mb-4">
          <div className="w-6 h-6 bg-[#F96C41] rounded-full flex items-center justify-center text-sm font-semibold text-white">
            1
          </div>
          <span className="text-lg font-medium text-white">Review and Book your trip</span>
        </div>

        <div className="w-full md:px-10 lg:px-20 mt-4 pb-8 xl:px-10  mx-auto bg-white shadow-2xl rounded-3xl p-4 space-y-4">
          {Object.entries(allReservations).length > 0 ? (
            Object.entries(allReservations).map(([stop, data]) => (
              <div key={stop} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200">
              <div className="flex gap-3">
                {/* Hotel Image */}
                <div className="flex-shrink-0">
                  <Image
                      src={data.image || "/images/defaultroom.jpg"}
                      alt={data.name}
                    width={100}
                    height={80}
                    className="rounded-lg object-cover w-[140px] h-[140px] xl:w-[300px] xl:h-[200px]"
                  />
                </div>

                {/* Hotel Details */}
                <div className="flex-1 min-w-0">
                  <div className="mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight">{data.name || "Hotel Name"}</h3>
                      <p className="text-gray-600 text-sm">{data.address || "Hotel Address"}</p>
                  </div>

                  {/* Rating and Amenities */}
                    <div className="flex md:flex-wrap flex-wrap items-center gap-x-4 text-[7px] md:text-base text-[#797979] mb-1">
                      <div className="flex items-center bg-[#D9D9D99C] md:px-3 px-2 py-1 rounded-2xl mb-2">
                        <UserIcon className="md:w-4 md:h-4 h-2 w-2 mr-1" />
                        {data.selectedRoom?.sleeps || 2} Sleeps
                      </div>
                      <div className="flex items-center bg-[#D9D9D99C] md:px-3 px-2 py-1 rounded-2xl mb-2">
                        <RoomIcon className="md:w-4 md:h-4 h-2 w-2 mr-1" />
                        {data.selectedRoom?.bedType || "Double"}
                      </div>
                      <div className="flex items-center bg-[#D9D9D99C] md:px-3 px-2 py-1 rounded-2xl mb-2">
                        <MealIcon className="md:w-4 md:h-4 h-2 w-2 mr-1" />
                        {data.selectedRoom?.mealPlan || "Bread and Breakfast BB"}
                      </div>
                  </div>

                  {/* More room details link */}
                  <button className="flex items-center cursor-pointer gap-1 text-blue-500 text-[8px] md:text-[16px] md:font-semibold bg-[#D9D9D99C] px-3 py-1 rounded-2xl mb-3 hover:text-blue-600">
                    <span>More room details</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* Check-in/Check-out and Price */}
              <div className="flex justify-between items-end mt-4">
                <div className="text-[10px] md:text-[16px] text-gray-600 font-bold tracking-wide mb-2">
                    <div>Check-in: <span className="text-gray-600 font-semibold">{formatDate(data?.checkin)}</span></div>
                    <div>Check-out: <span className="text-gray-600 font-semibold">{formatDate(data?.checkout)}</span></div>
                </div>
                <div className="text-center">
                  <div className="text-xs md:text-sm mx-auto w-[50%] text-gray-600">
                      {data?.nights || 1} night{(data?.nights || 1) > 1 ? "s" : ""}
                    </div>
                    <div className="text-lg font-bold text-gray-900">US$ {data.selectedRoom?.price ? data.selectedRoom.price.toFixed(2) : "375.00"}</div>
                    <div className="text-xs md:text-sm text-gray-600">Double occupancy</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200">
              <div className="text-center text-gray-500">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">No reservations found</h3>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step 2: Traveler Details */}
      <div className="px-4 mb-6  w-full md:px-14 lg:px-20 mt-4 pb-8 xl:px-48  mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-[#F96C41] rounded-full flex items-center justify-center text-sm font-semibold text-white">
            2
          </div>
          <span className="text-lg font-medium">Traveler details</span>
        </div>
        <PaymentForm>
          {/* Hidden inputs for form data */}
          <input type="hidden" name="selectedPayment" value={selectedPayment} />
          <input type="hidden" name="totalPrice" value={totalPrice} />
          <input type="hidden" name="allReservations" value={JSON.stringify(allReservations)} />
          
          <div className="space-y-6">
          {/* Name Fields Row */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="firstName" className="md:text-sm text-xs rounded-md absolute top-[-12px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
                <User className="w-3 h-3 text-gray-500" />
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                  name="firstName"
                type="text"
                placeholder="First Name"
                  defaultValue={userData.firstName || ""}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="lastName" className="md:text-sm text-xs rounded-md  absolute top-[-12px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
                <User className="w-3 h-3 text-gray-500" />
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                  name="lastName"
                type="text"
                placeholder="Last Name"
                  defaultValue={userData.lastName || ""}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Country Code and Phone Row */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="relative">
              <label htmlFor="countryCode" className="md:text-sm text-[10px] rounded-md font-medium absolute top-[-12px] left-2 md:left-6 bg-[#F6F6F6] py-1 px-3 md:w-[55%] w-[70%] text-gray-700 flex items-center gap-2">
                <Globe className="w-3 h-3 text-gray-500" />
                Country Code
              </label>
              <select
                id="countryCode"
                  name="countryCode"
                  defaultValue={
                    userData.countryCode
                      ? userData.countryCode.startsWith("+")
                        ? userData.countryCode
                        : "+" + userData.countryCode
                      : ""
                  }
                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Choose a country</option>
                {countryData.map((country, idx) => (
                  <option
                    key={`${country.code}-${country.phone_code}-${idx}`}
                    value={country.phone_code.startsWith('+') ? country.phone_code : `+${country.phone_code}`}
                  >
                    {country.emoji} {country.name} ({country.phone_code.startsWith('+') ? country.phone_code : `+${country.phone_code}`})
                  </option>
                ))}
              </select>

            </div>

            <div className="space-y-0 relative">
              <label htmlFor="phoneNumber" className="md:text-sm text-xs rounded-md absolute top-[-12px] py-1 px-3 bg-[#F6F6F6] left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
                <Phone className="w-3 h-3 text-gray-500" />
                Phone Number
              </label>
              <input
                id="phoneNumber"
                  name="phone"
                type="tel"
                placeholder="Phone number"
                  defaultValue={userData.phone || ""}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg "
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="md:text-sm text-xs rounded-md absolute top-[-12px] bg-[#F6F6F6] py-1 px-3 left-2 md:left-6 font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-3 h-3 text-gray-500" />
              Email Address
            </label>
            <input
              id="email"
                name="email"
              type="email"
              placeholder="Email address"
                defaultValue={userData.email || ""}
              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
      </div>

          {/* Billing Details Section */}
          <div className="mt-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-6 bg-[#F96C41] rounded-full flex items-center justify-center text-sm font-semibold text-white">
            3
          </div>
          <span className="text-lg font-medium">Enter billing details</span>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Your card details are safe with us - we don't store your information.
        </p>

        {/* Payment Methods */}
            <div className="flex gap-y-2 md:gap-x-2 flex-col md:flex-row mb-6">
          <button
                type="button"
            onClick={() => setSelectedPayment("card")}
                className={`flex-1 p-3 cursor-pointer rounded-lg border flex items-center justify-center gap-2 ${selectedPayment === "card" ? "border-[#F96C41] bg-[#F96C41] text-white" : "border-gray-300 bg-transparent"}`}
          >
            <CreditCard className="w-5 h-5" />
                <span className="text-sm">Card</span>
          </button>
          <button
                type="button"
            onClick={() => setSelectedPayment("transfer")}
                className={`flex-1 p-3 cursor-pointer rounded-lg border flex items-center justify-center gap-2 ${selectedPayment === "transfer" ? "border-[#F96C41] bg-[#F96C41] text-white" : "border-gray-300 bg-transparent"}`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-sm">Transfer</span>
          </button>
          <button
                type="button"
            onClick={() => setSelectedPayment("crypto")}
                className={`flex-1 p-3 cursor-pointer rounded-lg border flex items-center justify-center gap-2 ${selectedPayment === "crypto" ? "border-[#F96C41] bg-[#F96C41] text-white" : "border-gray-300 bg-transparent"}`}
          >
            <Coins className="w-5 h-5 text-orange-500" />
            <span className="text-sm">Crypto</span>
          </button>
        </div>

        {/* Card Details */}
        {selectedPayment === 'card' && (
              <CardSection />
        )}
          </div>

      {/* Payment Summary */}
          <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">PAYMENT DETAILS</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-black">Total price</span>
            <span className="text-xl font-bold">${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-black">Pay now</span>
            <span className="text-xl font-bold">${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#F96C41] text-base">Taxes and fees due at property</span>
            <span className="text-base text-black">$0.00</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By clicking 'Pay now' and proceeding with this booking, you agree to the Terms and Conditions
        </p>
      </div>

      {/* Pay Now Button */}
          <div className="mt-8">
            <button type="submit" className="w-full btn-gradient text-white font-semibold py-4 rounded-xl text-lg">
          PAY NOW
        </button>
      </div>
        </PaymentForm>


              </div>



      </Elements>

      </div>

      <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 ">
          <div className="max-w-full  mx-auto">
            <CarDiv />
          </div>
        </div>

        {/* Rentals Component */}
        <div className="px-8 md:px-14 lg:px-20 mt-4 pb-8 xl:px-48 ">
          <div className="max-w-full  mx-auto">
            <Rentals />
          </div>
        </div>

      <div className="">
        <Footer />
      </div>
    </div>
  )
}
