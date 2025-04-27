"use client";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import { useActionState } from "react";

export const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  async function signup(state: FormState, formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const repassword = formData.get("repassword");

    const validatedFields = SignupFormSchema.safeParse({
      email,
      password,
      repassword,
    });

    if (!validatedFields.success)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Registration Successful", response);
      alert("Registration Successful");
    } catch (error) {
      console.error("Registration Failed:", error);
      alert("Registration Failed");
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
      {state?.errors?.password && (
        <div>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <label htmlFor="repassword">Powtórz hasło</label>
        <input
          id="repassword"
          name="repassword"
          type="password"
          autoComplete="on"
        />
        {state?.errors?.repassword && <p>{state.errors.repassword}</p>}
      </div>
      <button disabled={pending} type="submit">
        Zarejestruj się
      </button>
    </form>
  );
};

export default SignupForm;
