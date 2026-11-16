// Date ko "Mon", "Tue" jaisa short day name mein convert karta hai
export const getDayName = (dateString) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(dateString + "T00:00:00").getDay()];
};

// "2026-11-16" ko "16 Nov 2026" bana deta hai
export const formatDate = (dateString) => {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Fee ko "Rs. 1,500" format mein dikhata hai
export const formatFee = (fee) => `Rs. ${fee.toLocaleString("en-PK")}`;

// Aaj ki date "YYYY-MM-DD" format mein
export const getTodayString = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};