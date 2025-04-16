"use client";

import { error } from "console";
import { signup } from "@actions/auth";
import { useActionState } from "react";

export const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);
  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div>
        <label htmlFor="password">Hasło</label>
        <input id="password" name="password" type="password" />
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
        <input id="repassword" name="repassword" type="password" />
        {state?.errors?.repassword && <p>{state.errors.repassword}</p>}
      </div>
      <button disabled={pending} type="submit">
        Zarejestruj się
      </button>
    </form>
  );
};

export default SignupForm;
