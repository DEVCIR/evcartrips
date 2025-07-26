"use client"

import { useEffect, useState } from "react"
import { X, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "../../components/ui/button"
import { useRouter } from "next/navigation"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../components/ui/sheet"

// Removed initialCartItems

export function CartSidebar() {
  const router = useRouter();
  const [reservationDetails, setReservationDetails] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  
  // Helper to sync localStorage and state
  const syncReservationDetails = (data) => {
    if (data) {
      setReservationDetails(JSON.parse(data));
    } else {
      setReservationDetails({});
    }
  };

  useEffect(() => {
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem("reservationDetailsByStop");
      syncReservationDetails(data);
    }
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      const data = localStorage.getItem("reservationDetailsByStop");
      syncReservationDetails(data);
    };
    window.addEventListener('reservationDetailsUpdated', handleUpdate);
    return () => window.removeEventListener('reservationDetailsUpdated', handleUpdate);
  }, []);


  useEffect(() => {
    const openSidebar = () => setIsOpen(true);
    window.addEventListener('open-cart-sidebar', openSidebar);
    return () => window.removeEventListener('open-cart-sidebar', openSidebar);
  }, []);

  // Update quantity for a stop
  const updateQuantity = (stop, newQuantity) => {
    if (newQuantity < 1) return;
    setReservationDetails((prev) => {
      const updated = { ...prev };
      if (updated[stop]) {
        updated[stop] = { ...updated[stop], quantity: newQuantity };
        // Only access localStorage in browser environment
        if (typeof window !== 'undefined') {
          localStorage.setItem("reservationDetailsByStop", JSON.stringify(updated));
          window.dispatchEvent(new Event('reservationDetailsUpdated'));
        }
      }
      return updated;
    });
  };

  // Remove item for a stop
  const removeItem = (stop) => {
    setReservationDetails((prev) => {
      const updated = { ...prev };
      delete updated[stop];
      // Only access localStorage in browser environment
      if (typeof window !== 'undefined') {
        localStorage.setItem("reservationDetailsByStop", JSON.stringify(updated));
        window.dispatchEvent(new Event('reservationDetailsUpdated'));
      }
      return updated;
    });
  };

  // Get total items (sum of all quantities, default 1 if not set)
  const getTotalItems = () => {
    return Object.values(reservationDetails).reduce((total, item) => total + (item.quantity || 1), 0);
  };

  // Get subtotal (sum of price * quantity)
  const getSubtotal = () => {
    return Object.values(reservationDetails).reduce((total, item) => total + ((item.price || item.selectedRoom?.price || 0) * (item.quantity || 1)), 0);
  };

  const handleCheckout = () => {
    router.push('/payment');
    setIsOpen(false);
  }

  // Custom sidebar and backdrop
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-[99] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[9999] shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ maxWidth: '90vw' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 btn-gradient text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                {getTotalItems()}
              </span>
            </div>
            <span className="text-lg font-medium">Your Cart</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-4">
            {Object.keys(reservationDetails).length === 0 ? (
              <div className="text-center text-gray-500 py-10 text-lg font-medium">Cart is empty</div>
            ) : (
              Object.entries(reservationDetails).map(([stop, item]) => (
                <div key={stop} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute cursor-pointer top-0 right-0 h-6 w-6 text-gray-400 hover:text-gray-600 z-10"
                    onClick={() => removeItem(stop)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex gap-3 pr-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image || item.selectedRoom?.image || "/placeholder.svg"}
                        alt={item.name || item.selectedRoom?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">{item.name || item.selectedRoom?.name}</h3>
                      <p className="text-lg font-semibold text-gray-900 mb-2">${item.price || item.selectedRoom?.price}</p>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-transparent cursor-pointer"
                          onClick={() => updateQuantity(stop, (item.quantity || 1) - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-lg font-medium min-w-[20px] text-center">{item.quantity || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-transparent cursor-pointer"
                          onClick={() => updateQuantity(stop, (item.quantity || 1) + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Subtotal and Actions */}
        <div className="border-t bg-gray-50 px-4 py-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Subtotal:</span>
            <span className="text-lg font-semibold text-gray-900">${getSubtotal()}</span>
          </div>
          <div className="space-y-4">
            <Button className="w-full cursor-pointer bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-full" size="lg">
              VIEW CART
            </Button>
            <Button onClick={handleCheckout} className="cursor-pointer w-full btn-gradient text-white font-medium py-3 rounded-full" size="lg">
              CHECKOUT
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
