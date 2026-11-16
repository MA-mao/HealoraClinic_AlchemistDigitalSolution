import { Link } from "react-router-dom";
import { useBookingModal } from "../context/BookingModalContext";

function NotFound() {
  const { openBooking } = useBookingModal();

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 min-h-[70vh] text-center">
      <p className="text-7xl font-bold gradient-text">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-2 text-gray-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link
          to="/"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
        >
          Go Home
        </Link>
        <button
          onClick={() => openBooking()}
          className="border border-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-lg hover:bg-gray-50"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default NotFound;