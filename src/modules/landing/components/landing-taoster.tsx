// components/Toaster.tsx
import React, { useEffect, useState } from "react";

interface ToasterProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toaster({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: ToasterProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for animation to finish
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`
          transform transition-all duration-300 ease-out
          ${visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}
          ${typeClasses[type]} text-white px-4 py-2 rounded shadow-lg flex items-center justify-between
        `}
      >
        <span>{message}</span>
        <button className="ml-4 font-bold" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
