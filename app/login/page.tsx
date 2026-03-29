import { Suspense } from "react";
import Image from "next/image";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-card">
      <div className="relative lg:w-3/5 lg:h-screen w-full h-48 sm:h-64">
        <Image
          src="/images/login/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex items-center justify-center lg:w-2/5 w-full p-4 sm:p-6 lg:p-8">
        <Suspense fallback={<div className="text-center">Loading login form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}