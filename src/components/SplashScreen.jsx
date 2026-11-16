import { useEffect, useState } from "react";

function SplashScreen({ onFinish }) {
  const [leaving, setLeaving] = useState(false);

  // 2.2s baad fade-out shuru, 0.5s baad splash band
  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 4200);
    const t2 = setTimeout(onFinish, 4700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  const skip = () => {
    setLeaving(true);
    setTimeout(onFinish, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-500 ${
        leaving ? "splash-leave" : ""
      }`}
    >
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-blob" />
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl animate-blob"
        style={{ animationDelay: "3s" }}
      />

      {/* Logo */}
      <div className="splash-heart relative">
        <svg className="w-28 h-28 heart-beat drop-shadow-2xl" viewBox="0 0 48 48" role="img" aria-label="Healora">
          <rect width="48" height="48" rx="12" fill="#ffffff" />
          <path
            d="M24 35s-9-5.5-9-12.2C15 19 17.6 16.5 20.6 16.5c1.4 0 2.7.7 3.4 1.8.7-1.1 2-1.8 3.4-1.8 3 0 5.6 2.5 5.6 6.3C33 29.5 24 35 24 35z"
            fill="#14b8a6"
          />
          <path
            d="M16.5 24.5h4l2-4 3 7 2-3.5h3.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Heartbeat line (khud ba khud draw hoti hai) */}
      <svg className="mt-6 w-64 sm:w-80 h-16" viewBox="0 0 300 80" fill="none" aria-hidden="true">
        <path
          className="ecg-line"
          d="M0 40H90L105 40L115 12L130 68L145 24L155 40H300"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Name + tagline */}
      <h1
        className="animate-fade-up mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-white"
        style={{ animationDelay: "700ms" }}
      >
        Healora
      </h1>
      <p
        className="animate-fade-up mt-2 text-teal-50 tracking-wide"
        style={{ animationDelay: "1000ms" }}
      >
        Healthcare, Simplified.
      </p>

      {/* Progress bar */}
      <div className="mt-8 w-44 h-1 rounded-full bg-white/25 overflow-hidden">
        <div className="splash-bar h-full w-full rounded-full bg-white" />
      </div>

      <button
        onClick={skip}
        className="absolute bottom-6 right-6 text-xs font-medium text-white/80 hover:text-white border border-white/30 hover:border-white px-3 py-1.5 rounded-full transition"
      >
        Skip
      </button>
    </div>
  );
}

export default SplashScreen;