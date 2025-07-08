"use client";

import React from "react";

export default function SignUpBox({
  onContinue,
}: {
  onContinue: ({
    name,
    email,
    phone,
    password,
  }: {
    [key: string]: string;
  }) => void;
}) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  }

  function handleContinue() {
    onContinue(form);
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
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          name="phone"
          type="tel"
          placeholder="+251 - -- -- -- --"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleFormChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onChange={handleFormChange}
        />
      </div>
      <button
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}
