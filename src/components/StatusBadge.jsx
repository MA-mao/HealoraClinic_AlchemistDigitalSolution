const styles = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Confirmed: "bg-teal-50 text-teal-700 border-teal-200",
  Completed: "bg-blue-50 text-blue-700 border-blue-200",
  Cancelled: "bg-red-50 text-red-600 border-red-200",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${
        styles[status] || "bg-gray-100 text-gray-600 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;