"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import type { useraccounts } from "@/prisma/client";

type UserType = Pick<useraccounts, "userId" | "role"> | null;

const AuthContext = createContext<
  | {
      user: UserType;
      setUser: (user: UserType) => void;
      logUserOut: () => void;
    }
  | undefined
>(undefined);

const STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserType>(null);

  // Load from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserState(parsed);
      } catch (e) {
        console.error("Failed to parse stored user");
      }
    }
  }, []);

  const setUser = (user: UserType) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setUserState(user?.userId ? user : null);
  };

  const logUserOut = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
