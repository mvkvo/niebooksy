"use client";

import { error } from "console";
import { login } from "@actions/auth";
import { useActionState } from "react";

export const LoginForm = () => {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Hasło</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Zaloguj się</button>
    </form>
  );
};

export default LoginForm;
