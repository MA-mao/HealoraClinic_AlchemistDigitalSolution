import Reveal from "./Reveal";
import { ShieldIcon, CalendarIcon, ClockIcon, HeartIcon } from "./Icons";

const points = [
  { Icon: ShieldIcon, title: "Verified Specialists", text: "Every doctor is experienced and highly rated by patients." },
  { Icon: CalendarIcon, title: "Instant Booking", text: "Reserve your slot in under a minute, no phone calls." },
  { Icon: ClockIcon, title: "Live Availability", text: "See booked and free slots in real time before you choose." },
  { Icon: HeartIcon, title: "Caring Service", text: "Easy rescheduling and cancellation whenever plans change." },
];

function WhyChooseUs() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-14">
      <Reveal>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Why People Trust Healora</h2>
          <p className="mt-2 text-gray-500">Quality care, made convenient from start to finish.</p>
        </div>
      </Reveal>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {points.map(({ Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 100}>
            <div className="group h-full bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                <Icon />
              </div>
              <h3 className="mt-4 font-semibold text-gray-800">{title}</h3>
              <p className="mt-1 text-sm text-gray-500">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;