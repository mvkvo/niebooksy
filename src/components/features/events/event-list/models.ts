export interface EventsProps {
  events: EventProps[];
}

export interface EventProps {
  id: number;
  owner: EventOwnerProps;
  title: string;
  content: string;
  category_name: string;
  slug: string;
  created_at: string;
}

export interface EventOwnerProps {
  name: string;
  facebook_url?: string;
  instagram_url?: string;
}

export interface TagProps {
  name: string;
}
