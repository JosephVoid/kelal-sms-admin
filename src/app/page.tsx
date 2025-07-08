import LandingPage from "@/modules/landing/landing-page";
import { ToastProvider } from "@/modules/landing/lib/toastContext";

export default function Home() {
  return (
    <div className="">
      <ToastProvider>
        <LandingPage />
      </ToastProvider>
    </div>
  );
}
