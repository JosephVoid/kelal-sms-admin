"use client";

import React from "react";
import { CreateUserInput } from "@/modules/auth/types";
import Spinner from "@/components/shared/spinner";

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
    <div className="max-w-md rounded-xl bg-white p-6 shadow-lg space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleFormChange}
          value={form.name}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleFormChange}
          value={form.email}
        />
        {formError.email && (
          <label className="block text-xs mt-1 text-red-400">
            Invalid Email
          </label>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          name="phone"
          type="tel"
          placeholder="+251 - -- -- -- --"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleFormChange}
          value={form.phone}
        />
        {formError.phone && (
          <label className="block text-xs mt-1 text-red-400">
            Invalid Phone Number
          </label>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleFormChange}
          value={form.password}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Account Name</label>
        <input
          type="text"
          name="accountName"
          placeholder="Account Name"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleFormChange}
          value={form.accountName}
        />
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
