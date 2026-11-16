const steps = ["Service", "Specialist", "Date & Time", "Details"];

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-start max-w-2xl mx-auto">
      {steps.map((label, index) => {
        const number = index + 1;
        const isDone = number < currentStep;
        const isActive = number === currentStep;

        return (
          <div key={label} className="flex items-start flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                  isDone || isActive
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-500"
                } ${isActive ? "ring-4 ring-teal-100" : ""}`}
              >
                {isDone ? "✓" : number}
              </div>
              <span
                className={`mt-1 text-xs hidden sm:block ${
                  isActive ? "text-teal-700 font-semibold" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>

            {number < steps.length && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-4 ${
                  isDone ? "bg-teal-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator;