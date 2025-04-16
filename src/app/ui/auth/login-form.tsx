"use client";

import { FormState, LoginFormSchema } from "@lib/definitions";
import { useActionState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [state, action, pending] = useActionState(login, undefined);
  const router = useRouter();

  async function login(state: FormState, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const validatedFields = LoginFormSchema.safeParse({
      email,
      password,
    });

    if (!validatedFields.success)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
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
  }

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div>
        <label htmlFor="password">Hasło</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="on"
        />
      </div>
      <button disabled={pending} type="submit">
        Zaloguj się
      </button>
    </form>
  );
};

export default LoginForm;
