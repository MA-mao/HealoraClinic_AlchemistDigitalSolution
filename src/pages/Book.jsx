import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import services from "../data/services.json";
import specialists from "../data/specialists.json";
import { useBookings } from "../context/BookingContext";
import StepIndicator from "../components/StepIndicator";
import TimeSlotPicker from "../components/TimeSlotPicker";
import ClientDetailsForm from "../components/ClientDetailsForm";
import ConfirmationSlip from "../components/ConfirmationSlip";
import { formatDate, formatFee } from "../utils/helpers";

const emptyForm = { clientName: "", phone: "", email: "", notes: "" };

// Form validation: errors ka object wapas karta hai (khali = sab theek)
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

function Book() {
  const { addBooking, isSlotBooked } = useBookings();

  // URL se service/specialist pehle se select karne ke liye (?service=3 ya ?specialist=2)
  const [searchParams] = useSearchParams();
  const serviceParam = Number(searchParams.get("service"));
  const specialistParam = Number(searchParams.get("specialist"));

  const validService = services.find((s) => s.id === serviceParam);
  const validSpecialist = specialists.find((s) => s.id === specialistParam);

  const initialSpecialistId =
    validSpecialist &&
    (!validService || validService.category === validSpecialist.specialty)
      ? validSpecialist.id
      : null;

  const [step, setStep] = useState(validService ? 2 : 1);
  const [serviceId, setServiceId] = useState(validService ? validService.id : null);
  const [specialistId, setSpecialistId] = useState(initialSpecialistId);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedSpecialist = specialists.find((s) => s.id === specialistId);

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
    // Jis field mein user type kar raha hai uska error hata do
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleConfirm = () => {
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    // Double booking se bachao: confirm se pehle slot dobara check karo
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetAll = () => {
    setStep(1);
    setServiceId(null);
    setSpecialistId(null);
    setDate("");
    setTimeSlot("");
    setForm(emptyForm);
    setErrors({});
    setConfirmedBooking(null);
  };

  const canContinue =
    (step === 1 && serviceId) ||
    (step === 2 && specialistId) ||
    (step === 3 && date && timeSlot);

  // Booking ho gayi: slip dikhao
  if (confirmedBooking) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-[70vh]">
        <ConfirmationSlip booking={confirmedBooking} onBookAnother={resetAll} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-[70vh]">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
        <p className="mt-2 text-gray-500">Complete the steps below to reserve your slot.</p>
      </div>

      <div className="mt-8">
        <StepIndicator currentStep={step} />
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        {/* Left: step content */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-5 sm:p-6">
          {/* STEP 1: Service */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Choose a service</h2>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceSelect(service)}
                    className={`text-left p-4 rounded-lg border transition ${
                      serviceId === service.id
                        ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600"
                        : "border-gray-200 hover:border-teal-600"
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

          {/* STEP 2: Specialist */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Choose a specialist</h2>
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
                    className={`text-left p-4 rounded-lg border transition ${
                      specialistId === s.id
                        ? "border-teal-600 bg-teal-50 ring-1 ring-teal-600"
                        : "border-gray-200 hover:border-teal-600"
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{s.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {s.experience} yrs experience • ⭐ {s.rating}
                    </p>
                    <p className="text-xs text-teal-700 mt-2">
                      Available: {s.availableDays.join(", ")}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Date & time */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Pick a date & time</h2>
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

          {/* STEP 4: Client details */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Your details</h2>
              <p className="text-sm text-gray-500 mt-1 mb-4">
                We'll use these to confirm your appointment.
              </p>
              <ClientDetailsForm values={form} errors={errors} onChange={handleFormChange} />
            </div>
          )}

          {/* Back / Continue / Confirm buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!canContinue}
                className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>

        {/* Right: booking summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-fit lg:sticky lg:top-24">
          <h3 className="font-semibold text-gray-800">Booking Summary</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Service</span>
              <span className="font-medium text-right">{selectedService?.title || "—"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Specialist</span>
              <span className="font-medium text-right">{selectedSpecialist?.name || "—"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-right">{date ? formatDate(date) : "—"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Time</span>
              <span className="font-medium text-right">{timeSlot || "—"}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <span className="font-semibold text-gray-800">Total Fee</span>
            <span className="font-bold text-teal-600">
              {selectedService ? formatFee(selectedService.fee) : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;