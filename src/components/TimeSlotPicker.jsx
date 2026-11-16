import timeSlots from "../data/timeSlots.json";
import { useBookings } from "../context/BookingContext";
import { getDayName } from "../utils/helpers";

// Kal se shuru karke agle "count" din ki dates banata hai
const getNextDates = (count) => {
  const dates = [];
  for (let i = 1; i <= count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    dates.push(`${d.getFullYear()}-${month}-${day}`);
  }
  return dates;
};

function TimeSlotPicker({ specialist, date, timeSlot, onDateChange, onSlotChange }) {
  const { isSlotBooked } = useBookings();
  const dates = getNextDates(14);

  if (!specialist) {
    return <p className="text-sm text-gray-500">Please select a specialist first.</p>;
  }

  return (
    <div>
      {/* Date selection */}
      <p className="text-sm font-medium text-gray-700 mb-2">Select a date</p>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dates.map((d) => {
          const dayName = getDayName(d);
          const dateObj = new Date(d + "T00:00:00");
          const isAvailable = specialist.availableDays.includes(dayName);
          const isSelected = date === d;

          return (
            <button
              key={d}
              type="button"
              disabled={!isAvailable}
              onClick={() => onDateChange(d)}
              className={`shrink-0 w-16 py-2 rounded-lg border text-center transition ${
                isSelected
                  ? "bg-teal-600 border-teal-600 text-white"
                  : isAvailable
                  ? "bg-white border-gray-200 hover:border-teal-600 text-gray-700"
                  : "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <span className="block text-xs">{dayName}</span>
              <span className="block text-lg font-bold">{dateObj.getDate()}</span>
              <span className="block text-xs">
                {dateObj.toLocaleDateString("en-GB", { month: "short" })}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Greyed out dates: {specialist.name} is not available on these days.
      </p>

      {/* Time slots */}
      {date && (
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Select a time slot</p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-white border border-teal-600"></span> Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-teal-600"></span> Selected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-gray-200"></span> Booked
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const booked = isSlotBooked(specialist.id, date, slot);
              const selected = timeSlot === slot;

              return (
                <button
                  key={slot}
                  type="button"
                  disabled={booked}
                  onClick={() => onSlotChange(slot)}
                  className={`py-2 rounded-lg text-sm font-medium border transition ${
                    selected
                      ? "bg-teal-600 border-teal-600 text-white"
                      : booked
                      ? "bg-gray-200 border-gray-200 text-gray-400 line-through cursor-not-allowed"
                      : "bg-white border-teal-600 text-teal-700 hover:bg-teal-50"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeSlotPicker;