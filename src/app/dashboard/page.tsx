import { LogoutButton } from "@ui/auth/logout-button";
import { getServerSession } from "next-auth";

export const DashboardPage = async () => {
  const session = await getServerSession();

  return (
    <div>
      Hello, {session?.user?.email}!
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
