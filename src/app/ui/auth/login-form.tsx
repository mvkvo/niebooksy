"use client";

import { FormEvent, useState } from "react";

import { signIn } from "next-auth/react";
import { LoginFormSchema } from "@lib/definitions";

type FieldErrors = Record<string, string[]>;

export default function LoginForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setMessage("");
    setIsSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const email = fd.get("email")?.toString() || "";
    const password = fd.get("password")?.toString() || "";

    // 1) Walidacja
    const parsed = LoginFormSchema.safeParse({ email, password });
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // 2) Próba zalogowania
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    if (!res) {
      setMessage("Błąd sieci, spróbuj ponownie.");
      setIsSubmitting(false);
      return;
    }
    if (!res.ok) {
      setMessage("Nieprawidłowy email lub hasło.");
      setIsSubmitting(false);
      return;
    }

    // 3) Sukces → przejście na dashboard
    window.location.href = res.url!;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-600">{errors.email.join(", ")}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Hasło</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="on"
          required
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-600">{errors.password.join(", ")}</p>
        )}
      </div>

      {message && <p className="text-red-600">{message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? "Ładowanie…" : "Zaloguj się"}
      </button>
    </form>
  );
}
