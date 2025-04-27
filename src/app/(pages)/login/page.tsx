import { Suspense } from "react";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import LoginForm from "@/components/features/auth/login-form";
import LoginError from "@/components/features/auth/login-error";

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div>
      <Suspense fallback={<div>Ładowanie…</div>}>
        <LoginError />
      </Suspense>
      <LoginForm />
    </div>
  );
}
