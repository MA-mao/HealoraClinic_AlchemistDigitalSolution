import { useState } from "react";
import Reveal from "./Reveal";
import { ChevronIcon } from "./Icons";

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "Click Book Appointment, choose a service and specialist, pick a date and an available time slot, then enter your details. You get a confirmation slip right away.",
  },
  {
    q: "Can I cancel or reschedule my booking?",
    a: "Yes. Open My Bookings and use the Reschedule or Cancel buttons on any Pending or Confirmed appointment.",
  },
  {
    q: "What do the booking statuses mean?",
    a: "Pending means the clinic has received your request, Confirmed means it is approved, Completed means the visit is done, and Cancelled means it was cancelled.",
  },
  {
    q: "Why can't I select some dates or time slots?",
    a: "Greyed out dates are days the specialist is not available. Greyed out time slots are already booked by someone else.",
  },
  {
    q: "Do I need to pay online?",
    a: "No. The fee is shown for reference and is paid at the clinic during your visit.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-14">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-2 text-gray-500">Quick answers to common questions.</p>
          </div>
        </Reveal>

        <div className="mt-8 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  className={`rounded-xl border transition-colors duration-300 ${
                    isOpen ? "border-teal-200 bg-teal-50/40" : "border-gray-100 bg-white"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                  >
                    <span className="font-medium text-gray-800">{item.q}</span>
                    <ChevronIcon
                      className={`w-5 h-5 shrink-0 text-teal-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm text-gray-600">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;