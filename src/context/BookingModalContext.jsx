import { createContext, useContext, useState } from "react";

const BookingModalContext = createContext();

export const useBookingModal = () => useContext(BookingModalContext);

export function BookingModalProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, preset: {}, openCount: 0 });

  // preset: { serviceId, specialistId } (dono optional)
  const openBooking = (preset = {}) =>
    setState((prev) => ({ isOpen: true, preset, openCount: prev.openCount + 1 }));

  const closeBooking = () => setState((prev) => ({ ...prev, isOpen: false }));

  return (
    <BookingModalContext.Provider value={{ ...state, openBooking, closeBooking }}>
      {children}
    </BookingModalContext.Provider>
  );
}