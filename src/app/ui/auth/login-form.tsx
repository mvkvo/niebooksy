/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { LoginFormSchema } from "@lib/definitions";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
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
        redirect: false,
        email,
        password,
      });
      console.log(response);

      if (!response) {
        throw new Error("Network response was not ok");
      }

      // Process response here
      console.log("Login Successful", response);
      alert("Login Successful");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Login Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
      </div>
      {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}
      <div>
        <label htmlFor="password">Hasło</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="on"
        />
      </div>
      <button type="submit">Zaloguj się</button>
    </form>
  );
};

export default LoginForm;
