import services from "../data/services.json";
import specialists from "../data/specialists.json";
import { formatDate } from "../utils/helpers";
import { AlertIcon } from "./Icons";

function CancelModal({ booking, onConfirm, onClose }) {
  const service = services.find((s) => s.id === booking.serviceId);
  const specialist = specialists.find((s) => s.id === booking.specialistId);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="modal-pop bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <AlertIcon className="w-6 h-6" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Cancel appointment?</h3>
        <p className="mt-2 text-sm text-gray-500">
          {service?.title} with {specialist?.name} on {formatDate(booking.date)} at{" "}
          {booking.timeSlot}. This cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Keep it
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold transition-all"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelModal;