import { redirect } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { getSession } from "../lib/helpers/session";

export default async function LoginPage() {
  const session = await getSession();

  if (session?.userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <LoginForm />
    </div>
  );
}
