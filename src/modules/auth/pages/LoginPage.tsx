import { redirect } from "next/navigation";
import LoginForm from "../components/LoginForm";
import { getSession } from "../lib/helpers/session";
import { Provider } from "@/components/ui/provider";

export default async function LoginPage() {
  const session = await getSession();

  if (session?.userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Provider>
        <LoginForm />
      </Provider>
    </div>
  );
}
