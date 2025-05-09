export interface AnnouncementProps {
  id: number;
  owner: AnnouncementOwnerProps;
  title: string;
  content: string;
  category_name: string;
  created_at: string;
}

export interface AnnouncementOwnerProps {
  name: string;
  facebook_url?: string;
  instagram_url?: string;
}
