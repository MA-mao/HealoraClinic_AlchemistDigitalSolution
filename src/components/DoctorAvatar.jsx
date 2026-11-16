// Har doctor ke liye gender, skin tone aur hair colour
const looks = {
  1: { female: true, skin: "#f1c7a5", hair: "#2b1b17", bg: "#ccfbf1" },
  2: { female: false, skin: "#e0ac82", hair: "#1c1412", bg: "#cffafe" },
  3: { female: true, skin: "#f4d0b0", hair: "#3a2418", bg: "#d1fae5" },
  4: { female: false, skin: "#c68b63", hair: "#111111", bg: "#ccfbf1" },
  5: { female: true, skin: "#e8b994", hair: "#1c1412", bg: "#cffafe" },
  6: { female: false, skin: "#d9a37a", hair: "#6b7280", bg: "#d1fae5" },
  7: { female: true, skin: "#f1c7a5", hair: "#5a3a22", bg: "#ccfbf1" },
  8: { female: false, skin: "#e0ac82", hair: "#2b1b17", bg: "#cffafe" },
};

function DoctorAvatar({ id, className = "w-14 h-14" }) {
  const look = looks[id] || looks[1];

  return (
    <svg
      className={`${className} rounded-full shrink-0`}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Doctor illustration"
    >
      <rect width="100" height="100" fill={look.bg} />

      {/* Female: peeche ke lambe baal */}
      {look.female && (
        <path d="M28 48C28 20 72 20 72 48L75 80H25Z" fill={look.hair} />
      )}

      {/* White coat */}
      <path d="M10 100C12 78 30 72 50 72S88 78 90 100Z" fill="#ffffff" />
      <path d="M42 72L50 90L58 72Z" fill="#14b8a6" />

      {/* Stethoscope */}
      <path
        d="M34 76C34 90 44 92 46 86"
        fill="none"
        stroke="#334155"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="46" cy="86" r="2.500" fill="#334155" />

      {/* Neck + head */}
      <rect x="44" y="58" width="12" height="16" rx="5" fill={look.skin} />
      <ellipse cx="50" cy="44" rx="15" ry="17" fill={look.skin} />

      {/* Hair upar */}
      {look.female ? (
        <path d="M34 44C32 22 68 22 66 44C60 32 42 32 34 44Z" fill={look.hair} />
      ) : (
        <path d="M35 42C34 24 66 24 65 42C62 34 38 34 35 42Z" fill={look.hair} />
      )}

      {/* Aankhein + muskurahat */}
      <circle cx="44" cy="46" r="1.600" fill="#1f2937" />
      <circle cx="56" cy="46" r="1.600" fill="#1f2937" />
      <path
        d="M44 53C47 56 53 56 56 53"
        fill="none"
        stroke="#9a3412"
        strokeWidth="1.500"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default DoctorAvatar;