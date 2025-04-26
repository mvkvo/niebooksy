import AnnouncementForm from "@/components/announcement-form";
import { LogoutButton } from "@/components/auth/logout-button";
import { Calendar } from "@/components/calendar/calendar";
import getSession from "@/lib/getSession";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  const userId = session?.user.id ? parseInt(session?.user.id, 10) : undefined;
  console.log("user i d:", userId);
  return (
    <div>
      <p>Hello, {session?.user?.email}!</p>
      <br />
      <Link href={"/"}>Homepage</Link>
      <br />
      <LogoutButton />
      <br />
      <div>
        <AnnouncementForm />
      </div>
      <br />
      <div style={{ height: "800px" }}>
        <Calendar userId={userId} />
      </div>
    </div>
  );
}
