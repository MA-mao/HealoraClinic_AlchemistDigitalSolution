import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "./Logo";
import { useBookingModal } from "../context/BookingModalContext";
import { PinIcon, PhoneIcon, MailIcon, ClockIcon } from "./Icons";

const quickLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "specialists", label: "Specialists" },
  { id: "my-bookings", label: "My Bookings" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const socials = [
  {
    name: "Facebook",
    content: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: "Instagram",
    content: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    content: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

function Footer() {
  const { openBooking } = useBookingModal();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    toast.success("Subscribed! Thank you.");
    setEmail("");
    setError("");
  };

  return (
    <footer className="mt-10">
      {/* CTA banner */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-10 sm:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 -mb-12 z-10 shadow-xl shadow-teal-900/20">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Get one step ahead of illness
            </h3>
            <p className="mt-2 text-teal-50">Book your appointment in under a minute.</p>
          </div>
          <button
            onClick={() => openBooking()}
            className="relative shrink-0 bg-white text-teal-700 font-semibold px-7 py-3 rounded-lg hover:-translate-y-0.5 hover:shadow-lg active:scale-95 transition-all duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-400 pt-24">
        <div className="max-w-6xl mx-auto px-4 pb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Logo className="w-9 h-9" />
              <span className="text-xl font-bold text-white">Healora</span>
            </div>
            <p className="mt-3 text-sm">
              Healthcare, Simplified. Book trusted specialists online in just a few clicks.
            </p>
            <div className="mt-4 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-teal-600 hover:text-white hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.content}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.id}>
                  <Link to={`/#${l.id}`} className="hover:text-teal-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <PinIcon className="w-4 h-4 mt-0.5 text-teal-400 shrink-0" />
                Clifton Block 5, Karachi, Pakistan
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-teal-400 shrink-0" />
                021-1234567
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-teal-400 shrink-0" />
                info@healora.com
              </li>
              <li className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-teal-400 shrink-0" />
                Mon - Sat, 9 AM - 5 PM
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <p className="text-sm">Get health tips and offers in your inbox.</p>
            <form onSubmit={handleSubscribe} noValidate className="mt-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 border focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  error ? "border-red-400" : "border-gray-700"
                }`}
              />
              {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                className="mt-2 w-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold py-2.5 rounded-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 text-center text-xs py-5">
          © 2026 Healora. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;