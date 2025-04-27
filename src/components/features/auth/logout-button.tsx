"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => (
  <button onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
    Wyloguj
  </button>
);
