"use client";

import { Toaster, toaster } from "@/components/ui/toaster";
import { Box, Button, Input, Heading, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login logic
    if (email && password) {
      toaster.create({
        title: "Login successful.",
        description: "Welcome back!",
        duration: 3000,
      });
    } else {
      toaster.create({
        title: "Login failed.",
        description: "Please fill in both fields.",
        duration: 3000,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" p={8} borderRadius="lg">
      <Heading mb={6} textAlign="center">
        Login
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="••••••••"
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
