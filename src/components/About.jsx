import Reveal from "./Reveal";
import SmartImage from "./SmartImage";
import { CheckIcon, StethoscopeIcon } from "./Icons";

const highlights = [
  "Experienced, highly rated specialists",
  "Modern equipment and a clean, calm clinic",
  "Easy online booking with instant confirmation",
  "Flexible rescheduling and cancellation",
];

function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 py-14">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-teal-200 to-emerald-200 opacity-50 -rotate-2" />
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-teal-100 to-emerald-100">
              <SmartImage
                name="/images/about-clinic"
                alt="Healora clinic"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                fallback={
                  <div className="w-full h-full flex items-center justify-center text-teal-500">
                    <StethoscopeIcon className="w-20 h-20" />
                  </div>
                }
              />
            </div>
            <div className="absolute -bottom-5 -right-3 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-3 animate-float">
              <p className="text-2xl font-bold text-teal-600">10+</p>
              <p className="text-xs text-gray-500">Years of care</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <span className="text-sm font-semibold text-teal-600">About Healora</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Care that fits into your schedule
          </h2>
          <p className="mt-4 text-gray-600">
            Healora is a modern clinic that brings experienced specialists and simple online
            booking together. Choose your service, pick a doctor, and reserve a time that works
            for you, without phone calls or long queues.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <span className="mt-0.5 w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                  <CheckIcon className="w-3.5 h-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default About;