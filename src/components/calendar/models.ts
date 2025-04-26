export interface EventInputProps {
  title: string;
  description?: string;
  start: string;
  end?: string;
}

export interface CalendarProps {
  userId?: number | undefined;
  events?: EventInputProps[];
}

export interface EventProps {
  id: Number;
  user_id: Number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  created_at: Date;
}
