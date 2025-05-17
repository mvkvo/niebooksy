import { Dashboard } from '@/components/features/dashboard';
/* import { EventForm } from '@/components/features/events';
import { getAllCategories } from '@/lib/db/categories'; */
import { getUserById } from '@/lib/db/users';
import getSession from '@/lib/getSession';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session || !session.user?.email) {
    return { success: false, message: 'Unauthorized' };
  }

  //const categories = await getAllCategories();
  const user = await getUserById(session?.user.id);

  return (
    <div className="dashboard-page">
      <Dashboard user={user} />
      {/* <EventForm categories={categories} /> */}
    </div>
  );
}
