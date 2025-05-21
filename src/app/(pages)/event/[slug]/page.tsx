import { Typography } from '@/components/ui/typography';
import { getEventBySlug } from '@/lib/db/events';
import Link from 'next/link';

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
    <div className="page">
      <Typography tag="h1" variant="headline">
        {event.title}
      </Typography>
      <Link href={`/profile/${event.owner.username}`}>
        <Typography tag="h3" variant="body" weight="bold">
          {`Owner: ${event.owner.name} ${event.owner.surname}`}
        </Typography>
      </Link>
      <Typography tag="p" variant="body">
        {event.content}
      </Typography>
    </div>
  );
}
