import { Suspense } from "react";
import LoginForm from "@components/auth/login-form";
import LoginError from "@components/auth/login-error";

export default function LoginPage() {
  return (
    <div>
      <Suspense fallback={<div>Ładowanie…</div>}>
        <LoginError />
      </Suspense>
      <LoginForm />
    </div>
  );
}
