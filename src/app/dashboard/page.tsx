import AnnouncementForm from "@components/announcement-form";
import { LogoutButton } from "@components/auth/logout-button";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession();

  return (
    <div>
      <p>Hello, {session?.user?.email}!</p>
      <br />
      <Link href={"/"}>Homepage</Link>
      <br />
      <LogoutButton />

      <div>
        <br />
        <AnnouncementForm />
      </div>
    </div>
  );
}
