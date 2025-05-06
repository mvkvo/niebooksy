import Link from "next/link";
import getSession from "@/lib/getSession";
import AnnouncementForm from "@/components/features/annoucement/announcement-form";
import { Calendar } from "@/components/ui/calendar";

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div>
      <p>Hello, {session?.user?.email}!</p>
      <br />
      <Link href={"/"}>Homepage</Link>
      <br />

      <div>
        <AnnouncementForm />
      </div>
      <br />
      <div style={{ height: "800px" }}>
        <Calendar />
      </div>
    </div>
  );
}
