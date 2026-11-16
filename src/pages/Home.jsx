import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import About from "../components/About";
import ServicesGrid from "../components/ServicesGrid";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Reveal from "../components/Reveal";
import Specialists from "./Specialists";
import MyBookings from "./MyBookings";

const steps = [
  { number: "1", title: "Choose a Service", text: "Pick the consultation or treatment you need." },
  { number: "2", title: "Select a Specialist", text: "Browse doctors by specialty and rating." },
  { number: "3", title: "Pick Date & Time", text: "See live available slots and choose one." },
  { number: "4", title: "Get Confirmation", text: "Receive your booking slip instantly." },
];

function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <About />
      <ServicesGrid />

      <section id="specialists" className="bg-white border-y border-gray-100">
        <Specialists />
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <Reveal>
          <h2 className="text-3xl font-bold text-center text-gray-900">How It Works</h2>
        </Reveal>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-teal-600/25">
                  {step.number}
                </div>
                <h3 className="mt-4 font-semibold text-gray-800">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="my-bookings" className="bg-white border-y border-gray-100">
        <MyBookings />
      </section>

      <Reviews />
      <FAQ />
      <Contact />
    </>
  );
}

export default Home;