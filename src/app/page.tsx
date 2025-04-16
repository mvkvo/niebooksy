import "./main.scss";

import Link from "next/link";
import { getServerSession } from "next-auth";
import { LogoutButton } from "@ui/auth/logout-button";

export default async function Home() {
  const session = await getServerSession();
  return (
    <div className="menu">
      {session ? (
        <LogoutButton />
      ) : (
        <>
          <Link href={"/login"}>Login</Link>
          <Link href={"/signup"}>Sign Up</Link>
        </>
      )}
      <Link href={"/dashboard"}>Dashboard</Link>
    </div>
  );
}
