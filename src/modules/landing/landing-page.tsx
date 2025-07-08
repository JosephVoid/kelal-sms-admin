"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Logo from "./assets/logo.svg";
import Image from "next/image";

export default function LandingPage() {
  const [showForm, setShowForm] = useState(false);

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
          <button className="text-sm underline">Sign In</button>
        </header>

        <section className="space-y-0 mb-10 text-4xl font-extrabold leading-tight sm:text-6xl">
          <div>🙅🏽‍♂️ No Paper Work!</div>
          <div>🙅🏽‍♀️ No Business License!</div>
          <div>🤖 Take the API</div>
          <div>💬 Send the SMS!</div>
        </section>

        <div className="mb-6 w-1/2">
          <p className="text-base sm:text-md font-extralight">
            Create your account now and start sending SMS OTP to your clients
          </p>
          <button
            className="mt-2 rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
            onClick={() => setShowForm(!showForm)}
          >
            Create Account
          </button>
        </div>

        {showForm && (
          <div className="max-w-md rounded-xl bg-white p-6 shadow-lg space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                placeholder="Phone"
                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
              Continue
            </button>
          </div>
        )}

        <section className="my-20 py-10 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-y-8 text-base font-medium text-center my-4">
            {/* Row 1 */}
            <div className="flex flex-col items-center">
              <div className="text-8xl mb-2 font-extrabold">✍🏽</div>{" "}
              {/* Phone emoji for Sign Up */}
              <div className="font-bold"> Sign Up</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-8xl mb-2  font-extrabold">🔑</div>{" "}
              {/* Key emoji for Password */}
              <div className="font-bold"> Create API Key</div>
            </div>
            {/* Row 2 */}
            <div className="flex flex-col items-center">
              <div className="text-8xl mb-2  font-extrabold">⚙️</div>{" "}
              {/* No entry emoji for No Business License! */}
              <div className="font-bold"> Send Request</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-8xl mb-2  font-extrabold">💬</div>{" "}
              {/* Gear emoji for Get API Key */}
              <div className="font-bold"> Receive SMS!</div>
            </div>
          </div>
        </section>

        <section className="space-y-0 mb-10 text-4xl font-extrabold leading-tight sm:text-6xl text-center">
          That's It
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
