"use server";

import { deleteOTP, getEmailOtp } from "../db/index";
import { compare } from "bcryptjs";
import { isPassed } from "../../utils";

export async function verifyEmailOtp(inputOtp: string, email: string) {
  try {
    const record = await getEmailOtp(email);

    if (!record || !record.otp) {
      return { success: false, message: "No OTP found" };
    }

    const hashedOtp = record.otp;
    const now = new Date();

    if (record.expiresOn && isPassed(now, record.expiresOn)) {
      return { success: false, message: "OTP expired" };
    }

    const isMatch = await compare(inputOtp, hashedOtp);

    if (!isMatch) {
      return { success: false, message: "Invalid OTP" };
    }

    // delete OTP after successful verification
    await deleteOTP(record.id);

    return { success: true };
  } catch (error) {
    console.error("OTP verification failed:", error);
    return { success: false, message: "Verification failed" };
  }
}
