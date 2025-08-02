"use client";

import { Toaster, toaster } from "@/components/ui/toaster";
import { useState } from "react";
import { loginAction } from "../lib/actions/login.action";
import { redirect } from "next/navigation";
import { useAuth } from "@/utils/providers/AuthProvider";
import Image from "next/image";
import Logo from "@/modules/landing/assets/logo.svg";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { toast } from "sonner";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

export default function LoginForm() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const login = await loginAction(formData);

    if (login.success) {
      auth.setUser({
        userId: login.user!.id,
      });
      toast("Login successful", { icon: <FaCheck /> });
      redirect("/dashboard");
    } else {
      toast("Login failed " + login.error, { icon: <FaExclamationTriangle /> });
    }
  };

  return (
    <Box className="w-full md:w-1/3" p={8} borderRadius="lg">
      <div className="flex justify-center mb-5">
        <Image src={Logo} alt="Logo" height={100} width={100} />
      </div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center mb-2">
        Sign In
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link href="login/forgot-password" className="flex justify-end">
            <small className="text-muted-foreground text-sm leading-none font-medium">
              Forgot Password?
            </small>
          </Link>
          <Button className="w-full mt-3" onClick={handleSubmit}>
            Log In
          </Button>
        </div>
      </form>
    </Box>
  );
}
