import { useState } from "react";
import toast from "react-hot-toast";
import services from "../data/services.json";
import specialists from "../data/specialists.json";
import { useBookings } from "../context/BookingContext";
import TimeSlotPicker from "./TimeSlotPicker";
import { formatDate } from "../utils/helpers";

function RescheduleModal({ booking, onClose }) {
  const { rescheduleBooking, isSlotBooked } = useBookings();
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const service = services.find((s) => s.id === booking.serviceId);
  const specialist = specialists.find((s) => s.id === booking.specialistId);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setTimeSlot("");
  };

  const handleSave = () => {
    // Save se pehle slot dobara check karo
    if (isSlotBooked(booking.specialistId, date, timeSlot)) {
      toast.error("This slot was just booked. Please pick another.");
      setTimeSlot("");
      return;
    }

    rescheduleBooking(booking.id, date, timeSlot);
    toast.success("Appointment rescheduled!");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 py-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-full overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Reschedule Appointment</h3>
            <p className="mt-1 text-sm text-gray-500">
              {service?.title} with {specialist?.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 bg-gray-50 rounded-lg px-4 py-3 text-sm">
          <span className="text-gray-500">Current: </span>
          <span className="font-medium text-gray-800">
            {formatDate(booking.date)} at {booking.timeSlot}
          </span>
        </div>

        <div className="mt-5">
          <TimeSlotPicker
            specialist={specialist}
            date={date}
            timeSlot={timeSlot}
            onDateChange={handleDateChange}
            onSlotChange={setTimeSlot}
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            disabled={!date || !timeSlot}
            className="flex-1 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default RescheduleModal;