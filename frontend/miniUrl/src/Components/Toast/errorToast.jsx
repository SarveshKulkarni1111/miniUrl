import React, { useEffect } from "react";

export default function Toast({ message, onClose, type = "error" }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // auto close after 5s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg text-white z-50
        ${type === "error" ? "bg-red-500" : "bg-green-500"}`}
    >
      {message}
    </div>
  );
}
