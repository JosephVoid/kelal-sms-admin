import React from "react";

export default function Spinner({ color = "black" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`h-5 w-5 animate-spin rounded-full border-2 border-t-transparent border-${color}`}
      ></div>
    </div>
  );
}
