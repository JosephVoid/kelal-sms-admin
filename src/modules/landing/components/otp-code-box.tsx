import Spinner from "@/components/shared/spinner";
import React from "react";

export default function OTPCodeBox({
  onContinue,
  loading,
}: {
  onContinue: (otp: string) => void;
  loading: boolean;
}) {
  const [otp, setOTP] = React.useState("");

  function handleContinue() {
    onContinue(otp);
  }

  return (
    <div className="max-w-md rounded-xl bg-white p-6 shadow-lg space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Code</label>
        <input
          type="text"
          placeholder="* * * * * *"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black-200"
          onChange={(e) => setOTP(e.target.value)}
        />
        <label className="block text-xs font-light my-1 opacity-75">
          Enter the 6 digit code sent to your email
        </label>
      </div>
      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 cursor-pointer"
        onClick={handleContinue}
      >
        {loading ? <Spinner /> : "Continue"}
      </button>
    </div>
  );
}
