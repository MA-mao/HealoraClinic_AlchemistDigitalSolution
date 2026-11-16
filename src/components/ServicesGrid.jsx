import { useState } from "react";
import services from "../data/services.json";
import ServiceCard from "./ServiceCard";

// Services se unique categories nikal lo, aur "All" aage laga do
const categories = ["All", ...new Set(services.map((s) => s.category))];

function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="max-w-6xl mx-auto px-4 py-14">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
        <p className="mt-2 text-gray-500">
          Choose from a wide range of consultations and treatments.
        </p>
      </div>

      {/* Category filter */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-teal-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-teal-600 hover:text-teal-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}

export default ServicesGrid;