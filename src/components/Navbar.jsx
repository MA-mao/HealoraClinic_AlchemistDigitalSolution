import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useBookingModal } from "../context/BookingModalContext";

// Order bilkul page ke sections ke order jaisa hai
const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "specialists", label: "Specialists" },
  { id: "my-bookings", label: "My Bookings" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const { openBooking } = useBookingModal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: jo section screen ke beech mein ho, uska link highlight
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const linkClass = (id) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
      pathname === "/" && active === id
        ? "bg-teal-50 text-teal-700"
        : "text-gray-600 hover:text-teal-600 hover:bg-gray-50"
    }`;

  return (
    <nav
      className={`sticky top-0 z-40 bg-white/75 backdrop-blur-lg border-b transition-all duration-300 ${
        scrolled ? "border-gray-200 shadow-md" : "border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/#home" className="flex items-center gap-2">
          <Logo className="w-9 h-9 drop-shadow-md" />
          <span className="text-xl font-bold text-gray-800">Healora</span>
        </Link>

        {/* Desktop (lg se upar) */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.id} to={`/#${l.id}`} className={linkClass(l.id)}>
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => openBooking()}
            className="ml-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-md shadow-teal-600/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          >
            Book Appointment
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden step-slide border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.id}
              to={`/#${l.id}`}
              className={linkClass(l.id)}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openBooking();
            }}
            className="mt-2 text-center bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
          >
            Book Appointment
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;