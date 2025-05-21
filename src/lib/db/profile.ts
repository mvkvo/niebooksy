import { Profile } from '@/types/user';
import { getEventsByUserId } from './events';
import { getUserByUsername } from './users';

export async function getProfileByUsername(username: string) {
  const user = await getUserByUsername(username);
  if (!user.id) return null;

  const events = await getEventsByUserId(user.id);

  const profile: Profile = {
    name: user.name,
    surname: user.surname,
    profile_picture: user.profile_picture,
    events,
  };

  return profile;
}
