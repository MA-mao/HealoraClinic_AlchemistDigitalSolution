import DoctorAvatar from "./DoctorAvatar";
import SmartImage from "./SmartImage";
import { StarIcon } from "./Icons";
import { useBookingModal } from "../context/BookingModalContext";

const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function SpecialistCard({ specialist }) {
  const { openBooking } = useBookingModal();

  return (
    <div className="group h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-teal-100 to-emerald-100">
        <SmartImage
          name={`/images/doctors/doctor-${specialist.id}`}
          alt={specialist.name}
          className="w-full h-full object-cover object-[50%_15%] group-hover:scale-105 transition-transform duration-700"
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <DoctorAvatar id={specialist.id} className="w-36 h-36" />
            </div>
          }
        />
        <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur text-amber-500 text-xs font-bold px-2.5 py-1 rounded-full shadow">
          <StarIcon className="w-3.5 h-3.5" /> {specialist.rating}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 text-lg">{specialist.name}</h3>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="text-xs font-medium bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full">
            {specialist.specialty}
          </span>
          <span className="text-gray-500">{specialist.experience} yrs exp.</span>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium text-gray-500 mb-2">Available Days</p>
          <div className="flex flex-wrap gap-1.5">
            {allDays.map((day) => {
              const isAvailable = specialist.availableDays.includes(day);
              return (
                <span
                  key={day}
                  className={`text-xs px-2 py-1 rounded-md ${
                    isAvailable
                      ? "bg-teal-50 text-teal-700 font-medium"
                      : "bg-gray-100 text-gray-300"
                  }`}
                >
                  {day}
                </span>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => openBooking({ specialistId: specialist.id })}
          className="mt-auto block w-full text-center bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-sm font-semibold py-2.5 rounded-lg transition-all duration-300"
          style={{ marginTop: "1.25rem" }}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default SpecialistCard;