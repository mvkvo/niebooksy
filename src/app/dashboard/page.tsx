import { LogoutButton } from "@ui/auth/logout-button";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div>
      Hello, {session?.user?.email}!
      <LogoutButton />
    </div>
  );
}
