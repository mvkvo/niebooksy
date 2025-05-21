import type { Event } from '@/types/event';

export type User = {
  id?: string;
  name: string;
  surname: string;
  email?: string;
  profile_picture?: string;
};

export type Profile = {
  name: string;
  surname: string;
  events: Event[];
  profile_picture?: string;
};
