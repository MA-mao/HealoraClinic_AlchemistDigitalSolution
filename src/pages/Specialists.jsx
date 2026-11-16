import { useState } from "react";
import specialists from "../data/specialists.json";
import SpecialistCard from "../components/SpecialistCard";
import Reveal from "../components/Reveal";
import { SearchIcon } from "../components/Icons";

const categories = ["All", ...new Set(specialists.map((s) => s.specialty))];

function Specialists() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = specialists.filter((s) => {
    const query = search.toLowerCase().trim();
    const matchesSearch =
      s.name.toLowerCase().includes(query) ||
      s.specialty.toLowerCase().includes(query);
    const matchesCategory =
      activeCategory === "All" || s.specialty === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-14">
      {/* Heading */}
      <Reveal>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Our Specialists</h2>
          <p className="mt-2 text-gray-500">
            Meet our experienced doctors and find the right one for you.
          </p>
        </div>
      </Reveal>

      {/* Search bar */}
      <div className="mt-8 max-w-md mx-auto relative">
        <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or specialty..."
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {/* Category filter */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
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

      {/* Result count */}
      <p className="mt-6 text-sm text-gray-500">
        Showing {filtered.length} of {specialists.length} specialists
      </p>

      {/* Cards or empty state */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 80}>
              <SpecialistCard specialist={s} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center bg-white border border-dashed border-gray-300 rounded-xl py-14">
          <SearchIcon className="w-12 h-12 mx-auto text-gray-300" />
          <h3 className="mt-3 font-semibold text-gray-800">No specialists found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try a different name or category.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-sm font-semibold text-teal-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Specialists;