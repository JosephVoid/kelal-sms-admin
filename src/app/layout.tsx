import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/utils/providers/AuthProvider";
import { Toaster } from "@/components/components/ui/sonner";

export const metadata: Metadata = {
  title: "Kelal SMS",
  description: "Send SMS OTP right now",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster toastOptions={{ className: "!rounded-xs" }} />
      </body>
    </html>
  );
}
