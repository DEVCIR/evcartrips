"use client"

import Footer from "../../components/ui/footer";
import Navbar from "../../common_components/navbar/page";
import { ImageIcon, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl } from "@/config/config";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();
  const headerRef = useRef(null);
  const profileRef = useRef(null);
  const infoRef = useRef(null);
  const bookingRef = useRef(null);
  const footerRef = useRef(null);
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // State for booking details
  const [bookingDetails, setBookingDetails] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Add form state for editing
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    birthDate: ""
  });

  const isHeaderInView = useInView(headerRef, { once: true });
  const isProfileInView = useInView(profileRef, { once: true, margin: "-100px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-50px" });
  const isBookingInView = useInView(bookingRef, { once: true, margin: "-50px" });
  const isFooterInView = useInView(footerRef, { once: true });


  

  const getData = () => {

    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      fetch(`${apiUrl}/api/users/profile/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setProfile(data);
          if (data.profileImage) {
            setImagePreview(`${apiUrl}/${data.profileImage}`);
          }
        })
        .catch((err) => console.error("Profile fetch error:", err));
    }
  }

  const fetchBookingDetails = async () => {
    setBookingLoading(true); // Start loading
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token) {
      // alert('User not logged in');
      setBookingLoading(false); // Stop loading on error
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/api/users/bookingDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: user.id }),
      });
      const data = await res.json();
      setBookingDetails(data);
    } catch (err) {
      setBookingDetails([]);
      console.error('Error fetching booking details:', err);
    } finally {
      setBookingLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    if(typeof window !== "undefined")
    {
      const token = localStorage.getItem('token');
      if(!token)
      {
        router.push('/');
      }
    }
    getData();
    fetchBookingDetails();
  }, []);

  // Populate form state when profile loads
  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || "",
        birthDate: profile.birthDate || ""
      });
    }
  }, [profile]);

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle update button click
  const handleUpdate = async () => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      const user = JSON.parse(storedUser);
      const formData = new FormData();

      // Append all form fields
      Object.keys(form).forEach(key => {
        formData.append(key, form[key]);
      });
      
      // Append image if selected
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }

      try {
        const res = await fetch(`${apiUrl}/api/users/profile/${user.id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        console.log(res.body);
        console.log(res);
        if (!res.ok) throw new Error("Update failed");
        const data = await res.json();
        setShowForm(false); // Hide form after update
        toast.success("Profile updated successfully!");
        getData();
      } catch (err) {
        toast.error("Error updating profile");
        console.error(err);
      }
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <ToastContainer />
      {/* Animated Header */}
      <motion.div 
        ref={headerRef}
        className="bg-black px-3 sm:px-4 pt-1 pb-4 min-h-[45vh] md:min-h-[50vh] flex flex-col rounded-b-[16px] sm:rounded-b-[20px]"
        initial={{ opacity: 0, y: -50 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Navbar />
      </motion.div>

      <div className="px-4 py-6 -mt-60">
        {/* Profile Image Section */}
        <motion.div 
          ref={profileRef}
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isProfileInView ? { 
            opacity: 1, 
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 10
            }
          } : {}}
        >
          <div className="relative">
            <motion.div 
              className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img
                src={imagePreview || "/images/profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {showForm && (
              <>
            <motion.button 
              className="absolute -top-1 -right-1 bg-orange-500 rounded-lg p-2 hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fileInputRef.current.click()}
            >
              <ImageIcon className="w-4 h-4 text-white" />
            </motion.button>
            <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                </>
              )}
          </div>
        </motion.div>

        <div className="xl:flex xl:gap-x-4 xl:mx-auto xl:justify-center xl:items-start">
          {/* Edit Form */}
          {showForm ? (
            <motion.div
            ref={infoRef}
            className="w-[360px] h-auto md:w-[586px] xl:w-[680px] bg-white rounded-2xl p-6 mb-6 shadow-sm max-xl:mx-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={isInfoInView ? { 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.2 }
            } : {}}
          >
            <motion.h2 
              className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200"
              initial={{ opacity: 0 }}
              animate={isInfoInView ? { 
                opacity: 1,
                transition: { delay: 0.3 }
              } : {}}
            >
              Edit Profile
            </motion.h2>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isInfoInView ? { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.4 }
              } : {}}
            >
            {profile ? (
              <>
              <div className="md:flex md:items-center max-md:space-y-4 md:gap-x-2 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                  className="md:w-2/4"
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    First Name
                  </label>
                  <input type="text" name="firstName" className="w-full text-black text-base border border-gray-400 rounded-sm px-2 py-1.5" value={form.firstName} onChange={handleInputChange} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                  className="md:w-2/4"
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Last Name
                  </label>
                  <input type="text" name="lastName" className="w-full text-black text-base border border-gray-400 rounded-sm px-2 py-1.5" value={form.lastName} onChange={handleInputChange} />
                </motion.div>
              </div>
              <div className="md:flex md:items-center max-md:space-y-4 md:gap-x-2 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                  className="md:w-2/4"
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Gmail Adress
                  </label>
                  <input type="text" name="email" className="w-full text-black text-base border border-gray-400 rounded-sm px-2 py-1.5" value={form.email} onChange={handleInputChange} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                  className="md:w-2/4"
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Phone Number
                  </label>
                  <input type="text" name="phoneNumber" className="w-full text-black text-base border border-gray-400 rounded-sm px-2 py-1.5" value={form.phoneNumber} onChange={handleInputChange} />
                </motion.div>
              </div>
              <div className="md:flex md:items-center max-md:space-y-4 md:gap-x-2 w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                className="md:w-2/4"
              >
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Address
                </label>
                <input type="text" name="address" className="w-full text-black text-base border border-gray-400 rounded-sm px-2 py-1.5" value={form.address} onChange={handleInputChange} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                className="md:w-2/4"
              >
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Date of Birth
                </label>
                <input type="date" name="birthDate" className="w-full text-black text-base border border-gray-400 rounded-sm px-2 py-1.5" value={form.birthDate} onChange={handleInputChange} />
              </motion.div>
              </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
            </motion.div>
            
            {/* Edit Profile Button */}
            <div className="md:flex md:items-center mt-6 max-md:space-y-2 md:space-x-2">

            <motion.button
              className="w-full cursor-pointer bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:to-[#F96C41] hover:from-[#AA3916] text-white font-bold py-4 px-6 rounded-xl text-base transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInfoInView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.9 }
              } : {}}
              onClick={() => setShowForm(!showForm)}
            >
              Cancel
            </motion.button>
            
            <motion.button
              className="w-full cursor-pointer bg-gradient-to-b from-[#F96C41] to-[#AA3916] hover:bg-gradient-to-l hover:to-[#F96C41] hover:from-[#AA3916] text-white font-bold py-4 px-6 rounded-xl text-base transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInfoInView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.9 }
              } : {}}
              onClick={handleUpdate}
            >
              Update
            </motion.button>
            </div>
          </motion.div>
          ) : (
          <motion.div
            ref={infoRef}
            className="w-[360px] h-auto md:w-[586px] xl:w-[680px] bg-white shadow-2xl rounded-2xl p-6 mb-6  max-xl:mx-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={isInfoInView ? { 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.2 }
            } : {}}
          >
            <motion.h2 
              className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200"
              initial={{ opacity: 0 }}
              animate={isInfoInView ? { 
                opacity: 1,
                transition: { delay: 0.3 }
              } : {}}
            >
              Profile Information
            </motion.h2>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isInfoInView ? { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.4 }
              } : {}}
            >
            {profile ? (
              <>  
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-400 text-base">{`${profile.firstName} ${profile.lastName}`}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Date of Birth
                  </label>
                  <p className="text-gray-400 text-base">{profile.birthDate}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Gmail Address
                  </label>
                  <p className="text-gray-400 text-base">{profile.email}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Phone Number
                  </label>
                  <p className="text-gray-400 text-base">{profile.phoneNumber}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInfoInView ? { opacity: 1, y: 0 } : {}}
                >
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Address
                  </label>
                  <p className="text-gray-400 text-base">{profile.address}</p>
                </motion.div>
              </>
            ) : (
              <p>Loading...</p>
            )}
            </motion.div>
            
            {/* Edit Profile Button */}
            <motion.button
              className="w-full btn-gradient text-white font-bold py-4 px-6 rounded-xl text-base mt-6 transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInfoInView ? { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.9 }
              } : {}}
              onClick={() => setShowForm(!showForm)}
            >
              EDIT PROFILE
            </motion.button>
          </motion.div>
          )}
          {/* Current Booking */}
          <motion.div
            ref={bookingRef}
            className="w-[360px] h-auto md:w-[586px] xl:w-[680px] bg-white rounded-2xl p-6 shadow-2xl max-xl:mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={isBookingInView ? { 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.3 }
            } : {}}
          >
            <motion.h2 
              className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200"
              initial={{ opacity: 0 }}
              animate={isBookingInView ? { 
                opacity: 1,
                transition: { delay: 0.4 }
              } : {}}
            >
              Current Booking
            </motion.h2>
            
            {bookingLoading ? (
              <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F96C41] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading</p>
              </div>
            </div>
            ) : bookingDetails && bookingDetails.length === 0 ? (
              <div>No bookings found.</div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
              {bookingDetails.map((trip, idx) => (
            <motion.div
              key={trip._id}
              className="bg-[#EBEBEB] rounded-xl p-4 flex items-center justify-between mb-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isBookingInView ? { 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.5 }
              } : {}}
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-8 h-8 bg-[#F96C41] rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 10 }}
                >
                  <span className="text-white font-bold text-sm">{idx + 1}.</span>
                </motion.div>
                <div>
                  <p className="text-gray-400 text-base">{idx + 1} EV Trip</p>
                  <p className="text-gray-400 text-base">{Object.keys(trip.reservations[0]).length} Hotel stays</p>
                </div>
              </div>
              <motion.button 
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold cursor-pointer py-2 px-4 rounded-lg text-sm transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedOrder(trip);
                  setShowOrderModal(true);
                }}
              >
                SEE DETAILS
              </motion.button>
            </motion.div>
            ))}
            </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Animated Footer */}
      <motion.div
        ref={footerRef}
        className=""
        initial={{ opacity: 0, y: 50 }}
        animate={isFooterInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <Footer />
      </motion.div>

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl cursor-pointer"
              onClick={() => setShowOrderModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
              <div><b>Order ID:</b> {selectedOrder.orderId}</div>
              <div><b>Amount:</b> {selectedOrder.amount / 100} {selectedOrder.currency}</div>
              <div><b>Payment Status:</b> {selectedOrder.paymentStatus}</div>
              <div><b>Customer Name:</b> {selectedOrder.customerName}</div>
              <div><b>Customer Email:</b> {selectedOrder.customerEmail}</div>
              <div><b>Customer Phone:</b> {selectedOrder.customerPhone}</div>
              <div><b>Total Price:</b> {selectedOrder.totalPrice}</div>
              <div><b>Reservations:</b>
                <ul className="list-disc ml-6">
                  {selectedOrder.reservations && selectedOrder.reservations[0] && Object.entries(selectedOrder.reservations[0]).map(([city, res]) => (
                    <li key={city} className="mb-2">
                      <b>{res.city}:</b> {res.name} ({res.roomName})<br/>
                      <b>Check-in:</b> {res.checkin} <b>Check-out:</b> {res.checkout}<br/>
                      <b>Price:</b> {res.price} <b>Bed:</b> {res.bedType} <b>Meal:</b> {res.mealPlan}
                    </li>
                  ))}
                </ul>
              </div>
              <div><b>Created At:</b> {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : ''}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}