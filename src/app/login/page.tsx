import { Suspense } from "react";
import LoginForm from "@/components/auth/login-form";
import LoginError from "@/components/auth/login-error";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();
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
