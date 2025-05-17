export interface SidebarProps {
  elements: SidebarElementProps[];
  active: string;
  onSelect: (tab: string) => void;
}

export interface SidebarElementProps {
  title: string;
  id: string;
}
