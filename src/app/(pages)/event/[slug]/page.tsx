import { getEventBySlug } from '@/lib/db/events';

interface EventPageProps {
  params: Promise<{ slug: string }>;
}
export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;

  const event = await getEventBySlug(slug);

  if (!event) {
    return <div>Nie znaleziono wydarzenia</div>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.content}</p>
    </div>
  );
}
