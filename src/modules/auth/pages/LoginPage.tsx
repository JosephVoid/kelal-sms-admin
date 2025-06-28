import { redirect } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { getSession } from "../lib/helpers/session";

export default async function LoginPage() {
  const userId = await getSession();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <LoginForm />
    </div>
  );
}
