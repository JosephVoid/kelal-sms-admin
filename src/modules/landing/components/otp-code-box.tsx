import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
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
    <div className="rounded-xs bg-white p-6 shadow-lg space-y-4">
      <div>
        <Input
          id="otp"
          type="text"
          placeholder="* * * * * *"
          onChange={(e) => setOTP(e.target.value)}
        />
        <p className="text-xs font-light opacity-75 mt-1">
          Enter the 6 digit code sent to your email
        </p>
      </div>
      <Button className="w-full" onClick={handleContinue} disabled={loading}>
        {loading ? <Spinner /> : "Continue"}
      </Button>
    </div>
  );
}
