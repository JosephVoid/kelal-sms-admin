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
import { Teko } from "next/font/google";
import { Button } from "@/components/components/ui/button";
import { Input } from "@/components/components/ui/input";
import { Card } from "@/components/components/ui/card";
import { Textarea } from "@/components/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/components/ui/tabs";
import { toast } from "sonner";
import CodeBox from "./components/code-box";

const teko = Teko({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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

  const { run: createUserAccount, loading: createUserAccountLoading } =
    useAsync(createUserAndAccount);
  const { run: sendOtp, loading: sendOtpLoading } = useAsync(sendEmailOtp);
  const { run: verifyOtp, loading: verifyOtpLoading } =
    useAsync(verifyEmailOtp);

  const handleSendOTP = async (creationData: CreateUserInput) => {
    setUserCreation(creationData);
    const result = await sendOtp(creationData.email);
    if (result.success) {
      toast("OTP Sent!");
      setShowForm("OTP");
    }
  };

  const handleUserCreation = async (otp: string) => {
    const result = await verifyOtp(otp, userCreationData!.email);
    if (result.success) {
      const creationResult = await createUserAccount(userCreationData!);
      if (creationResult.success) {
        toast("Account Created!");
        auth.setUser({ userId: creationResult.user?.id! });
        redirect("/dashboard");
      } else {
        toast(creationResult.message ?? "Error");
      }
    } else {
      toast(result.message ?? "Error");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f4f4f4] text-black overflow-hidden">
      {/* Mouse Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-full h-full z-0"
        style={
          {
            background:
              "radial-gradient(circle at var(--x) var(--y), rgba(102, 255, 51, 0.1), transparent 60%)",
            // Bind CSS variables here
            "--x": x,
            "--y": y,
          } as any
        } // TypeScript may require this cast
      />
      <header className="relative z-20 max-w-7xl mx-auto px-4 flex pt-8 justify-between">
        <div className="text-lg font-bold">
          <Image src={Logo} alt="Logo" height={50} width={50} />
        </div>
        <button className="text-sm px-4 py-2 rounded cursor-pointer">
          <Link href={"/login"}>Sign In</Link>
        </button>
      </header>
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        <div>
          <h1 className={`text-5xl md:text-8xl font-bold ${teko.className}`}>
            SMS OTP FOR STARTUPS
          </h1>
          <ul className="mt-6 space-y-2">
            <li>❌ No Business License Required</li>
            <li>❌ No Paper-work</li>
            <li>
              ✅ <b>Just sign up and send SMS OTPs</b>
            </li>
          </ul>
          <Button className="mt-6" onClick={() => setShowForm("SIGNUP")}>
            Create Account
          </Button>
          <div className="mt-10">
            <p className="text-3xl font-bold">
              0.75 <span className="text-xl">ETB/SMS</span>
            </p>
            <p className="text-xs text-gray-600 mt-1">
              ❗This service is only available in Ethiopia
            </p>
          </div>
        </div>
        <div>
          <CodeBox />
          <div className="mt-10">
            {showForm === "SIGNUP" && (
              <SignUpBox onContinue={handleSendOTP} loading={sendOtpLoading} />
            )}
            {showForm === "OTP" && (
              <OTPCodeBox
                onContinue={handleUserCreation}
                loading={verifyOtpLoading || createUserAccountLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
