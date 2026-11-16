import { formatFee } from "../utils/helpers";
import { useBookingModal } from "../context/BookingModalContext";
import SmartImage from "./SmartImage";
import {
  StethoscopeIcon,
  ToothIcon,
  SparkleIcon,
  EyeIcon,
  ChildIcon,
  HeartIcon,
  ClockIcon,
} from "./Icons";

const categoryIcons = {
  General: StethoscopeIcon,
  Dental: ToothIcon,
  Skin: SparkleIcon,
  Eye: EyeIcon,
  "Child Care": ChildIcon,
  "Mental Health": HeartIcon,
};

function ServiceCard({ service }) {
  const { openBooking } = useBookingModal();
  const Icon = categoryIcons[service.category] || StethoscopeIcon;

  return (
    <div className="group h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-teal-100 to-emerald-100">
        <SmartImage
          name={`/images/services/${service.image}`}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          fallback={
            <div className="w-full h-full flex items-center justify-center text-teal-500">
              <Icon className="w-14 h-14" />
            </div>
          }
        />
        <span className="absolute top-3 left-3 text-xs font-medium bg-white/90 backdrop-blur text-gray-700 px-3 py-1 rounded-full">
          {service.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-3">
          <span className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
            <Icon className="w-5 h-5" />
          </span>
          <h3 className="text-lg font-semibold text-gray-800 leading-snug">{service.title}</h3>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
          <ClockIcon className="w-4 h-4" />
          {service.duration} min
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between">
          <span className="text-lg font-bold text-teal-600">{formatFee(service.fee)}</span>
          <button
            onClick={() => openBooking({ serviceId: service.id })}
            className="text-sm font-semibold text-teal-600 border border-teal-600 hover:bg-teal-600 hover:text-white active:scale-95 px-4 py-1.5 rounded-lg transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;