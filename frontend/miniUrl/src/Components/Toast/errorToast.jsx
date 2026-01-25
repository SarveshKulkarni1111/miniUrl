import { useEffect } from "react";

export default function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === "error";

  return (
    <div className="fixed top-5 right-5 z-50 animate-slide-in">
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg backdrop-blur-md
        ${isError ? "bg-red-600/80" : "bg-emerald-500/90"} text-white`}
      >
        {/* Icon */}
        <span className="text-lg">
          {isError ? "⚠️" : "✅"}
        </span>

        {/* Message */}
        <p className="text-sm font-medium">{message}</p>

        {/* Close */}
        <button
          onClick={onClose}
          className="ml-2 text-white/70 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
