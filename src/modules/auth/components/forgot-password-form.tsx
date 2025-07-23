"use client";

import { useState } from "react";
import { loginAction } from "../lib/actions/login.action";
import { redirect } from "next/navigation";
import { useAuth } from "@/utils/providers/AuthProvider";
import Image from "next/image";
import Logo from "@/modules/landing/assets/logo.svg";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { useAsync } from "@/utils/useAsync";
import { sendEmailOtp } from "../lib/actions/send-email-otp.action";
import { toast } from "sonner";
import Spinner from "@/components/shared/spinner";
import FetchUserByEmailAction from "../lib/actions/fetch-user-by-email.action";
import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import { FaCheck } from "react-icons/fa";
import { verifyEmailOtp } from "../lib/actions/verify-email-otp.action";
import { updatePasswordAction } from "../lib/actions/update-user-password.action";

export default function ForgotPassword() {
  const [form, setForm] = useState<"REQUEST" | "OTP-VERIFY" | "NEW-PASS">(
    "REQUEST"
  );
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    redirect("/login");
  };

  return (
    <Box className="w-1/3" p={8} borderRadius="lg">
      {form === "REQUEST" && (
        <RequestOTP
          onDone={(email) => {
            (setForm("OTP-VERIFY"), setEmail(email));
          }}
        />
      )}
      {form === "OTP-VERIFY" && (
        <VerifyOTP onDone={() => setForm("NEW-PASS")} email={email} />
      )}
      {form === "NEW-PASS" && (
        <SetNewPassword email={email} onDone={handleLogin} />
      )}
    </Box>
  );
}

function RequestOTP({ onDone }: { onDone: (email: string) => void }) {
  const [email, setEmail] = useState("");
  const { run: sendEmail, loading } = useAsync(sendEmailOtp);
  const { run: getUser } = useAsync(FetchUserByEmailAction);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    if (!isValidEmail) {
      toast("Invalid email");
      return;
    }

    try {
      const user = await getUser(email);
      if (!user) {
        toast("Account doesn't exist");
        return;
      }

      const response = await sendEmail(email);
      if (response.success) {
        onDone(email);
        toast("Email Sent!", { icon: <FaCheck /> });
      } else {
        toast(response.message, { icon: <FaCheck /> });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        <Image src={Logo} alt="Logo" height={100} width={100} />
      </div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center mb-2">
        Enter your Email
      </h3>
      <form>
        <div className="flex flex-col">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            className="w-full mt-4"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Spinner color="white" /> : "Send Request"}
          </Button>
        </div>
      </form>
    </>
  );
}

function VerifyOTP({ email, onDone }: { email: string; onDone: () => void }) {
  const [otp, setOTP] = useState("");
  const { run, loading } = useAsync(verifyEmailOtp);

  const handleSubmit = async (e: React.FormEvent) => {
    const response = await run(otp, email);
    if (response.success) {
      toast("Verified!", { icon: <FaCheck /> });
      onDone();
    } else {
      toast(response.message);
      return;
    }
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        <Image src={Logo} alt="Logo" height={100} width={100} />
      </div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center mb-2">
        We've sent you a 6-digit code
      </h3>
      <div>
        <div className="flex flex-col">
          <Input
            type="number"
            placeholder="Enter 6-digit Code"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <Button className="w-full mt-4" onClick={handleSubmit}>
            {loading ? <Spinner color="white" /> : "Verify Code"}
          </Button>
        </div>
      </div>
    </>
  );
}

function SetNewPassword({
  email,
  onDone,
}: {
  email: string;
  onDone: () => void;
}) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { run, loading } = useAsync(updatePasswordAction);

  const handleSubmit = async () => {
    const response = await run(email, password);
    if (response.success) {
      toast("Password Updated!, Now Sign in again", { icon: <FaCheck /> });
      onDone();
    }
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        <Image src={Logo} alt="Logo" height={100} width={100} />
      </div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center mb-2">
        Enter your new Password
      </h3>
      <div>
        <div className="flex flex-col gap-2">
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Button
            className="w-full mt-2"
            onClick={handleSubmit}
            disabled={password !== passwordConfirm}
          >
            {loading ? <Spinner color="white" /> : "Save Password"}
          </Button>
        </div>
      </div>
    </>
  );
}
