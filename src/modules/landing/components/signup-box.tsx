"use client";

import React from "react";
import { CreateUserInput } from "@/modules/auth/types";
import Spinner from "@/components/shared/spinner";
import { Label } from "@/components/components/ui/label";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";

export default function SignUpBox({
  onContinue,
  loading,
}: {
  onContinue: ({
    name,
    email,
    phone,
    password,
    accountName,
  }: CreateUserInput) => void;
  loading: boolean;
}) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    accountName: "",
  });
  const [formError, setFormError] = React.useState({
    email: false,
    phone: false,
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleContinue() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const ethiopianPhoneRegex = /^\+251[79]\d{8}$/;

    console.log({ form });
    if (!emailRegex.test(form.email))
      setFormError({ ...formError, email: true });
    else if (!ethiopianPhoneRegex.test(form.phone))
      setFormError({ email: false, phone: true });
    else onContinue(form);
  }

  return (
    <div className="rounded-xs bg-white p-6 shadow-lg w-full space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-[48%]">
          <Input
            id="name"
            name="name"
            placeholder="Name"
            onChange={handleFormChange}
            value={form.name}
          />
        </div>

        <div className="w-full md:w-[48%]">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleFormChange}
            value={form.email}
          />
          {formError.email && (
            <p className="text-xs mt-1 text-red-500">Invalid Email</p>
          )}
        </div>

        <div className="w-full md:w-[48%]">
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+251 - -- -- -- --"
            onChange={handleFormChange}
            value={form.phone}
          />
          {formError.phone && (
            <p className="text-xs mt-1 text-red-500">Invalid Phone Number</p>
          )}
        </div>

        <div className="w-full md:w-[48%]">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleFormChange}
            value={form.password}
          />
        </div>

        <div className="w-full">
          <Input
            id="accountName"
            name="accountName"
            placeholder="Account Name"
            onChange={handleFormChange}
            value={form.accountName}
          />
        </div>
      </div>

      <Button
        className="w-full mt-4"
        onClick={handleContinue}
        disabled={loading}
      >
        {loading ? <Spinner /> : "Continue"}
      </Button>
    </div>
  );
}
