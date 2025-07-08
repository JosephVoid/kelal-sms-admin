import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendOtpEmail(email: string, otp: string) {
  return new Promise((resolve) => setTimeout(resolve, 1000));
  //   await resend.emails.send({
  //     from: 'noreply@yourdomain.com',
  //     to: email,
  //     subject: 'Your OTP Code',
  //     html: `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
  //   });
}
