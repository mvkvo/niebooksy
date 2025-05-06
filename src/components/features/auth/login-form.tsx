"use client";

import { LoginFormSchema } from "@/lib/definitions";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

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
      <Input id="email" label="Email" name="email" />
      <Input id="password" label="Hasło" name="password" inputType="password" />
      <Button disabled={isLoading} type="submit" hasArrow={false}>
        {isLoading ? "Logowanie..." : "Zaloguj się"}
      </Button>
    </form>
  );
};

export default LoginForm;
