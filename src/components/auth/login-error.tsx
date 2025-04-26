"use client";
import { useSearchParams } from "next/navigation";

export default function LoginError() {
  const params = useSearchParams();
  const errorCode = params.get("error") ?? "";
  const messages: Record<string, string> = {
    CredentialsSignin: "Nieprawidłowy e-mail lub hasło.",
    Default: "Wystąpił nieoczekiwany błąd.",
  };
  const error = errorCode ? messages[errorCode] || messages.Default : null;
  return error ? <p className="error">{error}</p> : null;
}
