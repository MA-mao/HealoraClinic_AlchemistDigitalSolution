import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import services from "../data/services.json";
import specialists from "../data/specialists.json";
import { useBookings } from "../context/BookingContext";
import { useBookingModal } from "../context/BookingModalContext";
import StepIndicator from "./StepIndicator";
import TimeSlotPicker from "./TimeSlotPicker";
import ClientDetailsForm from "./ClientDetailsForm";
import ConfirmationSlip from "./ConfirmationSlip";
import { CloseIcon } from "./Icons";
import { formatDate, formatFee } from "../utils/helpers";

const emptyForm = { clientName: "", phone: "", email: "", notes: "" };

const validateForm = (values) => {
  const errors = {};

  const name = values.clientName.trim();
  if (!name) errors.clientName = "Name is required.";
  else if (name.length < 3) errors.clientName = "Name must be at least 3 characters.";
  else if (!/^[A-Za-z\s.'-]+$/.test(name)) errors.clientName = "Name can only contain letters.";

  const phone = values.phone.replace(/[\s-]/g, "");
  if (!phone) errors.phone = "Phone number is required.";
  else if (!/^03\d{9}$/.test(phone)) errors.phone = "Enter a valid number, e.g. 03001234567.";

  const email = values.email.trim();
  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";

  if (values.notes.length > 200) errors.notes = "Notes cannot exceed 200 characters.";

  return errors;
};

function BookingWizard({ preset, onClose, onRestart }) {
  const { addBooking, isSlotBooked } = useBookings();

  const presetService = services.find((s) => s.id === preset.serviceId);
  const presetSpecialist = specialists.find((s) => s.id === preset.specialistId);

  const initialSpecialistId =
    presetSpecialist &&
    (!presetService || presetService.category === presetSpecialist.specialty)
      ? presetSpecialist.id
      : null;

  const [step, setStep] = useState(presetService ? 2 : 1);
  const [serviceId, setServiceId] = useState(presetService ? presetService.id : null);
  const [specialistId, setSpecialistId] = useState(initialSpecialistId);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedSpecialist = specialists.find((s) => s.id === specialistId);

  // Doctor ke card se aaye ho to sirf us doctor ki category ki services dikhao
  const serviceList =
    !presetService && presetSpecialist
      ? services.filter((s) => s.category === presetSpecialist.specialty)
      : services;

  const matchingSpecialists = selectedService
    ? specialists.filter((s) => s.specialty === selectedService.category)
    : [];

  const handleServiceSelect = (service) => {
    setServiceId(service.id);
    if (selectedSpecialist && selectedSpecialist.specialty !== service.category) {
      setSpecialistId(null);
      setDate("");
      setTimeSlot("");
    }
  };

  const handleSpecialistSelect = (specialist) => {
    setSpecialistId(specialist.id);
    setDate("");
    setTimeSlot("");
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setTimeSlot("");
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleConfirm = () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    if (isSlotBooked(specialistId, date, timeSlot)) {
      toast.error("Sorry, this slot was just booked. Please pick another.");
      setTimeSlot("");
      setStep(3);
      return;
    }

    const newBooking = addBooking({
      serviceId,
      specialistId,
      date,
      timeSlot,
      clientName: form.clientName.trim(),
      phone: form.phone.replace(/[\s-]/g, ""),
      email: form.email.trim(),
      notes: form.notes.trim(),
    });

    setConfirmedBooking(newBooking);
    toast.success("Appointment booked successfully!");
  };

  const canContinue =
    (step === 1 && serviceId) ||
    (step === 2 && specialistId) ||
    (step === 3 && date && timeSlot);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 no-print">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {confirmedBooking ? "Booking Complete" : "Book an Appointment"}
          </h2>
          <p className="text-xs text-gray-500">
            {confirmedBooking
              ? "Your slip is ready."
              : "Complete the steps below to reserve your slot."}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 flex items-center justify-center transition"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>

      {confirmedBooking ? (
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6">
          <ConfirmationSlip
            booking={confirmedBooking}
            onBookAnother={onRestart}
            onClose={onClose}
          />
        </div>
      ) : (
        <>
          <div className="px-5 sm:px-6 pt-5 no-print">
            <StepIndicator currentStep={step} />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">
            <div key={step} className="step-slide">
              {step === 1 && (
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Choose a service</h3>
                  {!presetService && presetSpecialist && (
                    <p className="text-sm text-gray-500 mt-1">
                      Showing {presetSpecialist.specialty} services for {presetSpecialist.name}
                    </p>
                  )}
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {serviceList.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleServiceSelect(service)}
                        className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                          serviceId === service.id
                            ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600"
                            : "border-gray-200 hover:border-teal-600 hover:-translate-y-0.5"
                        }`}
                      >
                        <p className="font-semibold text-gray-800">{service.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {service.category} • {service.duration} min
                        </p>
                        <p className="mt-2 font-bold text-teal-600">{formatFee(service.fee)}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Choose a specialist</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Showing {selectedService?.category} specialists for{" "}
                    <span className="font-medium">{selectedService?.title}</span>
                  </p>
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">
                    {matchingSpecialists.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => handleSpecialistSelect(s)}
                        className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                          specialistId === s.id
                            ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600"
                            : "border-gray-200 hover:border-teal-600 hover:-translate-y-0.5"
                        }`}
                      >
                        <p className="font-semibold text-gray-800">{s.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {s.experience} yrs experience • Rating {s.rating}
                        </p>
                        <p className="text-xs text-teal-700 mt-2">
                          Available: {s.availableDays.join(", ")}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Pick a date & time</h3>
                  <div className="mt-4">
                    <TimeSlotPicker
                      specialist={selectedSpecialist}
                      date={date}
                      timeSlot={timeSlot}
                      onDateChange={handleDateChange}
                      onSlotChange={setTimeSlot}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-base font-semibold text-gray-800">Your details</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    We'll use these to confirm your appointment.
                  </p>
                  <ClientDetailsForm values={form} errors={errors} onChange={handleFormChange} />
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4 text-sm">
              <p className="font-semibold text-gray-800 mb-3">Booking Summary</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <span className="text-gray-500">Service</span>
                <span className="font-medium text-right">{selectedService?.title || "—"}</span>
                <span className="text-gray-500">Specialist</span>
                <span className="font-medium text-right">{selectedSpecialist?.name || "—"}</span>
                <span className="text-gray-500">Date</span>
                <span className="font-medium text-right">{date ? formatDate(date) : "—"}</span>
                <span className="text-gray-500">Time</span>
                <span className="font-medium text-right">{timeSlot || "—"}</span>
                <span className="text-gray-800 font-semibold pt-2 border-t border-gray-200">
                  Total Fee
                </span>
                <span className="font-bold text-teal-600 text-right pt-2 border-t border-gray-200">
                  {selectedService ? formatFee(selectedService.fee) : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-5 sm:px-6 py-4 border-t border-gray-100 flex justify-between no-print">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!canContinue}
                className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold transition-all"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

function BookingModal() {
  const { isOpen, preset, openCount, closeBooking, openBooking } = useBookingModal();

  // Esc se band ho, aur modal khula ho to peeche ka page scroll na ho
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeBooking();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null;

  return (
    <div className="modal-overlay modal-backdrop fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4">
      <div className="modal-panel modal-pop bg-white w-full sm:max-w-3xl rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[90vh]">
        {/* key badalne se har baar naya wizard shuru hota hai */}
        <BookingWizard
          key={openCount}
          preset={preset}
          onClose={closeBooking}
          onRestart={() => openBooking()}
        />
      </div>
    </div>
  );
}

export default BookingModal;