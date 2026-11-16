import { useEffect, useState } from "react";

function CountUp({ end, decimals = 0, suffix = "", duration = 1500 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(end);
      return;
    }

    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // shuru mein tez, end mein slow
      setValue(end * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return (
    <>
      {value.toFixed(decimals)}
      {suffix}
    </>
  );
}

export default CountUp;