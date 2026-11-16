import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Hash (#services) ho to us section tak, warna page ke upar tak scroll karo
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
}

export default ScrollToTop;