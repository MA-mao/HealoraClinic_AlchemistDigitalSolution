import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import seedReviews from "../data/reviews.json";
import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { StarIcon } from "./Icons";
import { formatDate, getTodayString } from "../utils/helpers";

const STORAGE_KEY = "healora-reviews";

function Stars({ value, className = "w-4 h-4" }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= value ? "text-amber-400" : "text-gray-200"}>
          <StarIcon className={className} />
        </span>
      ))}
    </div>
  );
}

function Avatar({ review }) {
  const initial = review.name.trim()[0]?.toUpperCase() || "?";
  const fallback = (
    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-bold flex items-center justify-center">
      {initial}
    </div>
  );

  if (!review.photo) return fallback;

  return (
    <SmartImage
      name={`/images/patients/${review.photo}`}
      alt={review.name}
      className="w-11 h-11 rounded-full object-cover"
      fallback={fallback}
    />
  );
}

function Reviews() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : seedReviews;
    } catch {
      return seedReviews;
    }
  });
  const [form, setForm] = useState({ name: "", rating: 0, comment: "" });
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const total = reviews.length;
  const average = total ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
  const countFor = (star) => reviews.filter((r) => r.rating === star).length;

  const sorted = [...reviews].sort((a, b) => b.id - a.id);
  const visible = showAll ? sorted : sorted.slice(0, 6);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const name = form.name.trim();
    const comment = form.comment.trim();

    if (name.length < 3) newErrors.name = "Please enter your name (min 3 characters).";
    if (form.rating === 0) newErrors.rating = "Please select a rating.";
    if (comment.length < 10) newErrors.comment = "Please write at least 10 characters.";
    if (comment.length > 300) newErrors.comment = "Feedback cannot exceed 300 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name,
      rating: form.rating,
      comment,
      date: getTodayString(),
    };
    setReviews((prev) => [newReview, ...prev]);
    setForm({ name: "", rating: 0, comment: "" });
    setErrors({});
    toast.success("Thank you for your feedback!");
  };

  const inputClass = (error) =>
    `w-full px-4 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
      error ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <section id="reviews" className="max-w-6xl mx-auto px-4 py-14">
      <Reveal>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">What Our Patients Say</h2>
          <p className="mt-2 text-gray-500">Real feedback from people who booked with Healora.</p>
        </div>
      </Reveal>

      <div className="mt-10 grid lg:grid-cols-3 gap-6">
        {/* Left: summary + form */}
        <div className="space-y-6">
          <Reveal>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-4">
                <p className="text-5xl font-extrabold text-gray-900">{average.toFixed(1)}</p>
                <div>
                  <Stars value={Math.round(average)} className="w-5 h-5" />
                  <p className="mt-1 text-sm text-gray-500">{total} reviews</p>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="w-3">{star}</span>
                    <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400 transition-all duration-700"
                        style={{ width: total ? `${(countFor(star) / total) * 100}%` : "0%" }}
                      />
                    </div>
                    <span className="w-4 text-right">{countFor(star)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
            >
              <h3 className="font-semibold text-gray-800">Share your feedback</h3>

              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors({ ...errors, name: "" });
                  }}
                  className={inputClass(errors.name)}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onMouseEnter={() => setHover(n)}
                      onClick={() => {
                        setForm({ ...form, rating: n });
                        setErrors({ ...errors, rating: "" });
                      }}
                      className={`transition-transform duration-200 hover:scale-125 active:scale-95 ${
                        n <= (hover || form.rating) ? "text-amber-400" : "text-gray-200"
                      }`}
                      aria-label={`${n} star`}
                    >
                      <StarIcon className="w-8 h-8" />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
              </div>

              <div>
                <textarea
                  rows="3"
                  placeholder="Tell us about your experience..."
                  value={form.comment}
                  onChange={(e) => {
                    setForm({ ...form, comment: e.target.value });
                    setErrors({ ...errors, comment: "" });
                  }}
                  className={inputClass(errors.comment)}
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-red-500">{errors.comment}</p>
                  <p className="text-xs text-gray-400">{form.comment.length}/300</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold py-2.5 rounded-lg transition-all duration-300"
              >
                Submit Feedback
              </button>
            </form>
          </Reveal>
        </div>

        {/* Right: review cards */}
        <div className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-4">
            {visible.map((r, i) => (
              <Reveal key={r.id} delay={(i % 2) * 100}>
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">
                  <div className="flex items-center gap-3">
                    <Avatar review={r} />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{r.name}</p>
                      <p className="text-xs text-gray-400">{formatDate(r.date)}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Stars value={r.rating} />
                  </div>
                  <p className="mt-3 text-sm text-gray-600">{r.comment}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {sorted.length > 6 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-sm font-semibold text-teal-600 border border-teal-600 hover:bg-teal-600 hover:text-white px-5 py-2 rounded-lg transition-all duration-300"
              >
                {showAll ? "Show less" : `Show all ${sorted.length} reviews`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Reviews;