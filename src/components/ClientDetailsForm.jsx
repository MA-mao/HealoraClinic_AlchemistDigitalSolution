function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

const inputClass = (error) =>
  `w-full px-4 py-2.5 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
    error ? "border-red-400" : "border-gray-200"
  }`;

function ClientDetailsForm({ values, errors, onChange }) {
  return (
    <div className="space-y-4">
      <Field label="Full Name *" error={errors.clientName}>
        <input
          type="text"
          value={values.clientName}
          onChange={(e) => onChange("clientName", e.target.value)}
          placeholder="e.g. Ali Raza"
          className={inputClass(errors.clientName)}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone Number *" error={errors.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="03001234567"
            className={inputClass(errors.phone)}
          />
        </Field>

        <Field label="Email Address *" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="ali@example.com"
            className={inputClass(errors.email)}
          />
        </Field>
      </div>

      <Field label="Notes (optional)" error={errors.notes}>
        <textarea
          rows="3"
          value={values.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          placeholder="Any symptoms or special requests..."
          className={inputClass(errors.notes)}
        />
        <p className="mt-1 text-xs text-gray-400 text-right">{values.notes.length}/200</p>
      </Field>
    </div>
  );
}

export default ClientDetailsForm;