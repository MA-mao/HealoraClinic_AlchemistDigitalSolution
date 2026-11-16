import { createContext, useContext, useEffect, useState } from "react";
import initialBookings from "../data/bookings.json";

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("healora-bookings");
    return saved ? JSON.parse(saved) : initialBookings;
  });

  // Jab bhi bookings badlein, localStorage mein save karo
  useEffect(() => {
    localStorage.setItem("healora-bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Nayi booking add karna
  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      status: "Pending",
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  // Booking cancel karna
  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b))
    );
  };

  // Booking reschedule karna (bonus feature)
  const rescheduleBooking = (id, date, timeSlot) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, date, timeSlot } : b))
    );
  };

  // Check karna ke slot booked hai ya nahi (Cancelled bookings ignore hoti hain)
  const isSlotBooked = (specialistId, date, timeSlot) => {
    return bookings.some(
      (b) =>
        b.specialistId === specialistId &&
        b.date === date &&
        b.timeSlot === timeSlot &&
        b.status !== "Cancelled"
    );
  };

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, cancelBooking, rescheduleBooking, isSlotBooked }}
    >
      {children}
    </BookingContext.Provider>
  );
}