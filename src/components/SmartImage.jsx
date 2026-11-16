import { useState } from "react";

const extensions = ["jpg", "jpeg", "png", "webp"];

// name: extension ke bagair path, jaise "/images/hero-doctor"
// eager: true ho to foran load hota hai (hero ki photo ke liye), warna scroll pe load hota hai
function SmartImage({ name, alt, className = "", fallback = null, eager = false }) {
  const [index, setIndex] = useState(0);

  if (index >= extensions.length) return fallback;

  return (
    <img
      src={`${name}.${extensions[index]}`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setIndex(index + 1)}
      className={className}
    />
  );
}

export default SmartImage;