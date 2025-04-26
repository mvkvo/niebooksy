/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LoginFormSchema } from "@lib/definitions";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    console.log({ email, password });

    const validatedFields = LoginFormSchema.safeParse({
      email,
      password,
    });

    if (!validatedFields.success)
      return { errors: validatedFields.error.flatten().fieldErrors };

    try {
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
      });
      console.log(response);
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Hasło</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="on"
        />
      </div>
      <button disabled={isLoading} type="submit">
        {isLoading ? "Logowanie..." : "Zaloguj się"}
      </button>
    </form>
  );
};

export default LoginForm;
