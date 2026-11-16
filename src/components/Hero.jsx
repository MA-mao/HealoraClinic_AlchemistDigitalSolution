import { Link } from "react-router-dom";
import CountUp from "./CountUp";
import SmartImage from "./SmartImage";
import { useBookingModal } from "../context/BookingModalContext";
import { StarIcon, CheckIcon, StethoscopeIcon } from "./Icons";

const delay = (ms) => ({ animationDelay: `${ms}ms` });

function Hero() {
  const { openBooking } = useBookingModal();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-teal-300/40 blur-3xl animate-blob pointer-events-none" />
      <div
        className="absolute top-40 -right-24 w-96 h-96 rounded-full bg-cyan-300/40 blur-3xl animate-blob pointer-events-none"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-emerald-200/50 blur-3xl animate-blob pointer-events-none"
        style={{ animationDelay: "8s" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div>
          <span
            className="animate-fade-up inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-teal-100 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm"
            style={delay(0)}
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 pulse-dot" />
            Online booking open now
          </span>

          <h1
            className="animate-fade-up mt-5 text-4xl md:text-6xl font-extrabold leading-tight text-gray-900"
            style={delay(120)}
          >
            Healthcare, <span className="gradient-text">Simplified.</span>
          </h1>

          <p
            className="animate-fade-up mt-5 text-gray-600 text-base md:text-lg max-w-md"
            style={delay(240)}
          >
            Book appointments with experienced specialists in just a few clicks.
            No calls, no waiting in queues.
          </p>

          <div className="animate-fade-up mt-8 flex flex-wrap gap-3" style={delay(360)}>
            <button
              onClick={() => openBooking()}
              className="group bg-teal-600 hover:bg-teal-700 text-white font-semibold px-7 py-3 rounded-lg shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              Book Appointment
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
            <Link
              to="/#services"
              className="bg-white/80 backdrop-blur border border-gray-200 hover:border-teal-600 hover:text-teal-600 text-gray-700 font-semibold px-7 py-3 rounded-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              View Services
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up mt-10 flex gap-8" style={delay(480)}>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                <CountUp end={8} suffix="+" />
              </p>
              <p className="text-sm text-gray-500">Specialists</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                <CountUp end={4.8} decimals={1} />
              </p>
              <p className="text-sm text-gray-500">Avg. Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                <CountUp end={10} suffix="+" />
              </p>
              <p className="text-sm text-gray-500">Years Experience</p>
            </div>
          </div>
        </div>

        {/* Right: doctor photo */}
        <div className="animate-fade-up" style={delay(300)}>
          <div className="relative max-w-xs md:max-w-sm mx-auto">
            {/* Peeche rangeen shape */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-gradient-to-br from-teal-400 to-emerald-400 opacity-30" />

            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-teal-900/15 bg-gradient-to-br from-teal-100 to-emerald-100">
              <SmartImage
                name="/images/hero-doctor"
                alt="Healora doctor"
                eager
                className="w-full h-full object-cover"
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-teal-600">
                    <StethoscopeIcon className="w-24 h-24" />
                  </div>
                }
              />
            </div>

            {/* Floating badges */}
            <div
              className="absolute -top-4 -left-4 sm:-left-8 z-10 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2 flex items-center gap-2 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <span className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
                <StarIcon />
              </span>
              <div>
                <p className="text-sm font-bold text-gray-800 leading-none">4.8 Rating</p>
                <p className="text-[10px] text-gray-400">Patient reviews</p>
              </div>
            </div>

            <div
              className="absolute -bottom-4 -right-2 sm:-right-6 z-10 bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2 flex items-center gap-2 animate-float"
              style={{ animationDelay: "2.5s" }}
            >
              <span className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                <CheckIcon className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-gray-800 leading-none">Instant Slip</p>
                <p className="text-[10px] text-gray-400">After booking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;