import { Dashboard } from '@/components/features/dashboard';
import { getEventsByUserId } from '@/lib/db/events';
import { getUserById } from '@/lib/db/users';
import getSession from '@/lib/getSession';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session || !session.user?.email) {
    return { success: false, message: 'Unauthorized' };
  }

  //const categories = await getAllCategories();
  const user = await getUserById(session?.user.id);
  const events = await getEventsByUserId(session?.user.id);

  return (
    <div className="page">
      <Dashboard user={user} events={events} />
      {/* <EventForm categories={categories} /> */}
    </div>
  );
}
