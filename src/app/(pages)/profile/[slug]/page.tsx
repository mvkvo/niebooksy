import { Typography } from '@/components/ui/typography';
import { getProfileByUsername } from '@/lib/db/profile';
import Link from 'next/link';

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}
export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;

  const profile = await getProfileByUsername(slug);

  if (!profile) {
    return <div>Nie znaleziono profilu</div>;
  }

  return (
    <div className="page">
      <Typography tag="h1" variant="headline" weight="bold">
        {profile.name} {profile.surname}
      </Typography>
      <Typography tag="h2" variant="headline">
        Wydarzenia
      </Typography>
      <ul>
        {profile.events.map((event) => (
          <li key={event.id}>
            <Link href={`/event/${event.slug}`}>
              <Typography tag="span">{event.title} </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
