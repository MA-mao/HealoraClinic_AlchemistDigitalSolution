import { Link } from "react-router-dom";
import services from "../data/services.json";
import specialists from "../data/specialists.json";
import { formatDate, formatFee } from "../utils/helpers";
import { PrinterIcon } from "./Icons";

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-dashed border-gray-200 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800 text-right">{value}</span>
    </div>
  );
}

function ConfirmationSlip({ booking, onBookAnother, onClose }) {
  const service = services.find((s) => s.id === booking.serviceId);
  const specialist = specialists.find((s) => s.id === booking.specialistId);
  const bookingRef = `HL-${String(booking.id).slice(-6)}`;

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center no-print">
        <svg className="w-20 h-20 mx-auto" viewBox="0 0 52 52" aria-hidden="true">
          <circle
            className="tick-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="2"
          />
          <path
            className="tick-check"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27l8 8 16-16"
          />
        </svg>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">Booking Received!</h1>
        <p className="mt-1 text-gray-500">
          Your appointment request has been submitted. Status: Pending.
        </p>
      </div>

      {/* Slip */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold">Healora</p>
            <p className="text-xs text-teal-100">Appointment Slip</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-teal-100">Booking Ref</p>
            <p className="font-bold">{bookingRef}</p>
          </div>
        </div>

        <div className="px-6 py-4">
          <Row label="Patient" value={booking.clientName} />
          <Row label="Phone" value={booking.phone} />
          <Row label="Email" value={booking.email} />
          <Row label="Service" value={service?.title} />
          <Row label="Specialist" value={specialist?.name} />
          <Row label="Date" value={formatDate(booking.date)} />
          <Row label="Time" value={booking.timeSlot} />
          <Row label="Status" value={booking.status} />
          {booking.notes && <Row label="Notes" value={booking.notes} />}

          <div className="flex justify-between pt-4">
            <span className="font-semibold text-gray-800">Total Fee</span>
            <span className="text-lg font-bold text-teal-600">
              {service ? formatFee(service.fee) : "—"}
            </span>
          </div>

          <p className="mt-5 text-xs text-gray-400 text-center">
            Please arrive 10 minutes early and bring this slip with you.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap justify-center gap-3 no-print">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold transition-all"
        >
          <PrinterIcon className="w-4 h-4" />
          Print Slip
        </button>
        <Link
          to="/#my-bookings"
          onClick={onClose}
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          View My Bookings
        </Link>
        <button
          onClick={onBookAnother}
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          Book Another
        </button>
      </div>
    </div>
  );
}

export default ConfirmationSlip;