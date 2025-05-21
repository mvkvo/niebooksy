import type { User } from '@/types/user';
import type { Event } from '@/types/event';
export interface DashboardProps {
  user: User;
  events: Event[];
}

export interface SettingsProps {
  user: User;
  events: Event[];
}

export interface DashboardInformationProps {
  user: User;
}

export interface DashboardEventsProps {
  events: Event[];
}
