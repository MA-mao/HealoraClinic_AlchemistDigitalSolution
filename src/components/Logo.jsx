function Logo({ className = "w-9 h-9" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" role="img" aria-label="Healora logo">
      <defs>
        <linearGradient id="healora-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#healora-grad)" />
      {/* Dil */}
      <path
        d="M24 35s-9-5.5-9-12.2C15 19 17.6 16.5 20.6 16.5c1.4 0 2.7.7 3.4 1.8.7-1.1 2-1.8 3.4-1.8 3 0 5.6 2.5 5.6 6.3C33 29.5 24 35 24 35z"
        fill="#ffffff"
      />
      {/* Heartbeat line */}
      <path
        d="M16.5 24.5h4l2-4 3 7 2-3.5h3.5"
        fill="none"
        stroke="#0d9488"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Logo;