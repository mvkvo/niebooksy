export interface EventListProps {
  events: EventProps[];
}

export interface EventProps {
  id: number;
  owner: EventOwnerProps;
  title: string;
  content: string;
  category: string;
  slug: string;
  created_at: string;
}

export interface EventOwnerProps {
  username: string;
  name: string;
  surname: string;
  facebook_url?: string;
  instagram_url?: string;
}

export interface TagProps {
  name: string;
}
