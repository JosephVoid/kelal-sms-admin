import { redirect } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { getSession } from "../lib/helpers/session";
import { Provider } from "@/components/ui/provider";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import ForgotPassword from "../components/forgot-password-form";

export default async function ForgotPasswordPage() {
  const session = await getSession();

  if (session?.userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="absolute top-10 left-10">
        <Link href={"/"}>
          <FaArrowLeft />
        </Link>
      </div>
      <ForgotPassword />
    </div>
  );
}
