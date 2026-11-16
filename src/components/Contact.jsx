import { useState } from "react";
import toast from "react-hot-toast";
import Reveal from "./Reveal";
import { PinIcon, PhoneIcon, MailIcon, ClockIcon } from "./Icons";

const info = [
  { Icon: PinIcon, title: "Address", text: "Clifton Block 5, Karachi, Pakistan" },
  { Icon: PhoneIcon, title: "Phone", text: "021-1234567" },
  { Icon: MailIcon, title: "Email", text: "info@healora.com" },
  { Icon: ClockIcon, title: "Working Hours", text: "Mon - Sat, 9 AM - 5 PM" },
];

const emptyForm = { name: "", email: "", message: "" };

function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (form.name.trim().length < 3) newErrors.name = "Please enter your name (min 3 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      newErrors.email = "Enter a valid email address.";
    if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    // Mock: message localStorage mein save hota hai (backend nahi hai)
    try {
      const saved = JSON.parse(localStorage.getItem("healora-messages") || "[]");
      saved.push({ ...form, id: Date.now() });
      localStorage.setItem("healora-messages", JSON.stringify(saved));
    } catch {
      // ignore
    }

    toast.success("Message sent! We will get back to you soon.");
    setForm(emptyForm);
    setErrors({});
  };

  const inputClass = (error) =>
    `w-full px-4 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
      error ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 py-14">
      <Reveal>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-2 text-gray-500">Have a question? We would love to hear from you.</p>
        </div>
      </Reveal>

      <div className="mt-10 grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {info.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="group h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">
                  <span className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </span>
                  <p className="mt-3 font-semibold text-gray-800">{title}</p>
                  <p className="text-sm text-gray-500">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-56">
              <iframe
                title="Healora location"
                src="https://maps.google.com/maps?q=Clifton,Karachi,Pakistan&z=13&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
          >
            <h3 className="font-semibold text-gray-800">Send us a message</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your name"
                className={inputClass(errors.name)}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@example.com"
                className={inputClass(errors.email)}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                rows="5"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="How can we help you?"
                className={inputClass(errors.message)}
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-semibold py-3 rounded-lg shadow-md shadow-teal-600/25 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export default Contact;