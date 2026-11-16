import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BookingProvider } from "./context/BookingContext";
import { BookingModalProvider, useBookingModal } from "./context/BookingModalContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BookingModal from "./components/BookingModal";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const SPLASH_KEY = "healora-splash-seen";

// Splash tab dikhao jab: is session mein pehle nahi dikhi, aur user ne animation off nahi ki
const shouldShowSplash = () => {
  try {
    if (sessionStorage.getItem(SPLASH_KEY)) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return true;
  } catch {
    return false;
  }
};

// /book?service=3 jaise purane links: modal kholo aur home par bhej do
function BookRoute() {
  const { openBooking } = useBookingModal();
  const [params] = useSearchParams();

  useEffect(() => {
    openBooking({
      serviceId: Number(params.get("service")) || null,
      specialistId: Number(params.get("specialist")) || null,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Navigate to="/" replace />;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <main key={location.pathname} className="page-fade">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookRoute />} />
        <Route path="/specialists" element={<Navigate to="/#specialists" replace />} />
        <Route path="/my-bookings" element={<Navigate to="/#my-bookings" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(shouldShowSplash);

  const finishSplash = useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      // ignore
    }
    setShowSplash(false);
  }, []);

  // Splash ke dauran sirf splash dikhti hai, website uske baad load hoti hai,
  // taake hero ki animations splash khatam hone par shuru hon
  if (showSplash) {
    return <SplashScreen onFinish={finishSplash} />;
  }

  return (
    <BookingProvider>
      <BrowserRouter>
        <BookingModalProvider>
          <ScrollToTop />
          <div className="app-shell min-h-screen bg-gray-50 text-gray-800">
            <Navbar />
            <AppRoutes />
            <Footer />
          </div>
          <BookingModal />
          <Toaster position="top-right" />
        </BookingModalProvider>
      </BrowserRouter>
    </BookingProvider>
  );
}

export default App;