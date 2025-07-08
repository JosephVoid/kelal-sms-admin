"use client";

import { Toaster, toaster } from "@/components/ui/toaster";
import { Box, Button, Input, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { loginAction } from "../lib/actions/login.action";
import { redirect } from "next/navigation";
import { useAuth } from "@/utils/providers/AuthProvider";
import Image from "next/image";
import Logo from "@/modules/landing/assets/logo.svg";

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
        role: login.user!.useraccounts[0].role,
      });
      toaster.create({
        title: "Login successful.",
        description: "Welcome back!",
        duration: 3000,
      });
      redirect("/dashboard");
    } else {
      toaster.create({
        title: "Login failed.",
        description: login.error ?? "",
        duration: 3000,
        type: "error",
      });
    }
  };

  return (
    <Box maxW="400px" className="w-1/3" p={8} borderRadius="lg">
      <div className="flex justify-center mb-5">
        <Image src={Logo} alt="Logo" height={100} width={100} />
      </div>
      <Heading mt={6} mb={6} textAlign="center">
        Sign In
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack>
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

          <Button colorScheme="blue" type="submit" width="full">
            Log In
          </Button>
        </VStack>
      </form>
      <Toaster />
    </Box>
  );
}
