"use server";

import { saveOtpToDb } from "../db";
import { sendOtpEmail } from "../helpers/otp-emailer";

export async function sendEmailOtp(email: string) {
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("OTP", otpCode);
  try {
    await saveOtpToDb(otpCode, email);
    await sendOtpEmail(email, otpCode);
    return { success: true };
  } catch (error) {
    console.error("OTP send failed:", error);
    return { success: false, message: "Failed to send OTP" };
  }
}
