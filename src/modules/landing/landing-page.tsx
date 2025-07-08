"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Logo from "./assets/logo.svg";
import Image from "next/image";
import SignUpBox from "./components/signup-box";
import OTPCodeBox from "./components/otp-code-box";
import { useAsync } from "@/utils/useAsync";
import { createUserAndAccount } from "../auth/lib/actions/create-user-and-account.action";
import { sendEmailOtp } from "../auth/lib/actions/send-email-otp.action";
import { verifyEmailOtp } from "../auth/lib/actions/verify-email-otp.action";
import { CreateUserInput } from "../auth/types";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/utils/providers/AuthProvider";
import { redirect } from "next/navigation";
import { useToast } from "./lib/toastContext";
import Link from "next/link";

export default function LandingPage() {
  const [showForm, setShowForm] = useState<"SIGNUP" | "OTP" | null>(null);
  const [userCreationData, setUserCreation] =
    React.useState<CreateUserInput | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  // Create reactive CSS variables with useMotionTemplate
  const x = useMotionTemplate`${springX}px`;
  const y = useMotionTemplate`${springY}px`;

  useEffect(() => {
    const moveGlow = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveGlow);
    return () => window.removeEventListener("mousemove", moveGlow);
  }, [mouseX, mouseY]);

  const auth = useAuth();
  const { showToast } = useToast();

  const { run: createUserAccount, loading: createUserAccountLoading } =
    useAsync(createUserAndAccount);
  const { run: sendOtp, loading: sendOtpLoading } = useAsync(sendEmailOtp);
  const { run: verifyOtp, loading: verifyOtpLoading } =
    useAsync(verifyEmailOtp);

  const handleSendOTP = async (creationData: CreateUserInput) => {
    setUserCreation(creationData);
    const result = await sendOtp(creationData.email);
    if (result.success) {
      showToast("OTP Sent!", "success");
      setShowForm("OTP");
    }
  };

  const handleUserCreation = async (otp: string) => {
    const result = await verifyOtp(otp, userCreationData!.email);
    if (result.success) {
      const creationResult = await createUserAccount(userCreationData!);
      if (creationResult.success) {
        showToast("Account Created!", "success");
        auth.setUser({ userId: creationResult.user?.id!, role: "owner" });
        redirect("/dashboard");
      } else {
        showToast(creationResult.message ?? "Error", "error");
      }
    } else {
      showToast(result.message ?? "Error", "error");
    }
  };

  return (
    <main className="relative min-h-screen bg-gray-100 text-black overflow-hidden">
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-0"
        style={
          {
            background:
              "radial-gradient(circle at var(--x) var(--y), rgba(0, 102, 255, 0.1), transparent 60%)",
            // Bind CSS variables here
            "--x": x,
            "--y": y,
          } as any
        } // TypeScript may require this cast
      />

      <div className="relative z-10 px-4 py-6 sm:px-8 max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-20">
          <div className="text-lg font-bold">
            <Image src={Logo} alt="Logo" height={50} width={50} />
          </div>
          <button className="text-sm px-4 py-2 rounded hover:outline-1 hover:outline-gray-500 transition-all cursor-pointer">
            <Link href={"/login"}>Sign In</Link>
          </button>
        </header>

        <section className="space-y-0 mb-10 text-4xl font-extrabold leading-tight sm:text-6xl">
          <div>🙅🏽‍♂️ No Paper Work!</div>
          <div>🙅🏽‍♀️ No Business License!</div>
          <div>🤖 Take the API</div>
          <div>💬 Send the SMS!</div>
        </section>

        <div className="mb-10 w-1/2">
          <p className="text-base sm:text-md font-extralight">
            Create your account now and start sending SMS OTP to your clients
          </p>
          <button
            className="mt-2 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
            onClick={() => setShowForm("SIGNUP")}
          >
            Create Account
          </button>
        </div>

        {showForm === "SIGNUP" && (
          <SignUpBox onContinue={handleSendOTP} loading={sendOtpLoading} />
        )}
        {showForm === "OTP" && (
          <OTPCodeBox
            onContinue={handleUserCreation}
            loading={verifyOtpLoading || createUserAccountLoading}
          />
        )}

        <section className="text-4xl leading-tight sm:text-4xl flex justify-between my-24 items-center">
          <div className="text-9xl font-extrabold">Steps</div>
          <div>➡️</div>
          <div className="space-y-2 text-start font-extralight">
            <div>✍🏽 Create Account</div>
            <div>🔑 Create API Key</div>
            <div>⚙️ Send POST Request</div>
            <div>💬 Users Receive SMS!</div>
          </div>
        </section>

        <section className="my-24 text-4xl font-extrabold leading-tight sm:text-6xl text-center">
          ✨ That's It ✨
        </section>
        {/* MODIFIED FOOTER SECTION */}
        <footer className="mt-20 flex justify-between items-center text-xs px-4 py-3 rounded-md">
          <span className="font-semibold text-lg">KELAL SMS</span>
          <span className="text-sm">+251920642556 For Support</span>
        </footer>
      </div>
    </main>
  );
}
