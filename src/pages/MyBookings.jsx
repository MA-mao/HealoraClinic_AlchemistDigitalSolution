import { useState } from "react";
import toast from "react-hot-toast";
import services from "../data/services.json";
import specialists from "../data/specialists.json";
import { useBookings } from "../context/BookingContext";
import { useBookingModal } from "../context/BookingModalContext";
import StatusBadge from "../components/StatusBadge";
import CancelModal from "../components/CancelModal";
import RescheduleModal from "../components/RescheduleModal";
import { CalendarIcon } from "../components/Icons";
import { formatDate, formatFee } from "../utils/helpers";

const statusFilters = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

function MyBookings() {
  const { bookings, cancelBooking } = useBookings();
  const { openBooking } = useBookingModal();
  const [activeStatus, setActiveStatus] = useState("All");
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [bookingToReschedule, setBookingToReschedule] = useState(null);

  // Naye date wali booking upar
  const sortedBookings = [...bookings].sort((a, b) => b.date.localeCompare(a.date));

  const visibleBookings =
    activeStatus === "All"
      ? sortedBookings
      : sortedBookings.filter((b) => b.status === activeStatus);

  const countFor = (status) =>
    status === "All"
      ? bookings.length
      : bookings.filter((b) => b.status === status).length;

  // Cancel / reschedule sirf Pending ya Confirmed pe allowed hai
  const canModify = (booking) =>
    booking.status === "Pending" || booking.status === "Confirmed";

  const handleConfirmCancel = () => {
    cancelBooking(bookingToCancel.id);
    toast.success("Appointment cancelled.");
    setBookingToCancel(null);
  };

  // Table row aur mobile card dono ke liye same buttons
  const ActionButtons = ({ booking }) =>
    canModify(booking) ? (
      <div className="flex gap-2">
        <button
          onClick={() => setBookingToReschedule(booking)}
          className="text-xs font-semibold text-teal-600 border border-teal-600 hover:bg-teal-600 hover:text-white active:scale-95 px-3 py-1.5 rounded-lg transition-all"
        >
          Reschedule
        </button>
        <button
          onClick={() => setBookingToCancel(booking)}
          className="text-xs font-semibold text-red-500 border border-red-300 hover:bg-red-500 hover:text-white active:scale-95 px-3 py-1.5 rounded-lg transition-all"
        >
          Cancel
        </button>
      </div>
    ) : (
      <span className="text-xs text-gray-400">No actions</span>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 min-h-[70vh]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">My Bookings</h2>
          <p className="mt-1 text-gray-500">View and manage all your appointments.</p>
        </div>
        <button
          onClick={() => openBooking()}
          className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all"
        >
          + New Appointment
        </button>
      </div>

      {/* Status filter tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {statusFilters.map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeStatus === status
                ? "bg-teal-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-teal-600 hover:text-teal-600"
            }`}
          >
            {status} ({countFor(status)})
          </button>
        ))}
      </div>

      {visibleBookings.length === 0 ? (
        <div className="mt-8 text-center bg-white border border-dashed border-gray-300 rounded-xl py-14">
          <CalendarIcon className="w-12 h-12 mx-auto text-gray-300" />
          <h3 className="mt-3 font-semibold text-gray-800">No bookings found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {activeStatus === "All"
              ? "You haven't booked any appointments yet."
              : `You have no ${activeStatus.toLowerCase()} appointments.`}
          </p>
          <button
            onClick={() => openBooking()}
            className="inline-block mt-4 text-sm font-semibold text-teal-600 hover:underline"
          >
            Book an appointment
          </button>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block mt-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                <tr>
                  <th className="px-5 py-3">Ref</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Specialist</th>
                  <th className="px-5 py-3">Date & Time</th>
                  <th className="px-5 py-3">Fee</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visibleBookings.map((b) => {
                  const service = services.find((s) => s.id === b.serviceId);
                  const specialist = specialists.find((s) => s.id === b.specialistId);
                  return (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-gray-500">HL-{String(b.id).slice(-6)}</td>
                      <td className="px-5 py-4 font-medium text-gray-800">{service?.title}</td>
                      <td className="px-5 py-4 text-gray-600">{specialist?.name}</td>
                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(b.date)}
                        <span className="block text-xs text-gray-400">{b.timeSlot}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {service ? formatFee(service.fee) : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-5 py-4">
                        <ActionButtons booking={b} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden mt-6 space-y-4">
            {visibleBookings.map((b) => {
              const service = services.find((s) => s.id === b.serviceId);
              const specialist = specialists.find((s) => s.id === b.specialistId);
              return (
                <div key={b.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">{service?.title}</p>
                      <p className="text-sm text-gray-500">{specialist?.name}</p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>

                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-gray-500">
                      {formatDate(b.date)} • {b.timeSlot}
                    </span>
                    <span className="font-semibold text-teal-600">
                      {service ? formatFee(service.fee) : "—"}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">HL-{String(b.id).slice(-6)}</span>
                    <ActionButtons booking={b} />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Modals */}
      {bookingToCancel && (
        <CancelModal
          booking={bookingToCancel}
          onConfirm={handleConfirmCancel}
          onClose={() => setBookingToCancel(null)}
        />
      )}
      {bookingToReschedule && (
        <RescheduleModal
          booking={bookingToReschedule}
          onClose={() => setBookingToReschedule(null)}
        />
      )}
    </div>
  );
}

export default MyBookings;