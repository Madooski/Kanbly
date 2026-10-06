import {
  GraduationCap,
  Megaphone,
  Network,
  Rocket,
  Briefcase,
  Terminal,
  LayoutDashboard,
  Archive,
  Settings,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

export const FIELD_ICONS: Record<string, LucideIcon> = {
  school: GraduationCap,
  campaign: Megaphone,
  account_tree: Network,
  rocket_launch: Rocket,
  work: Briefcase,
  terminal: Terminal,
};

export const NAV_ICONS: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  archive: Archive,
  settings: Settings,
};

export const getFieldIcon = (iconName: string): LucideIcon => {
  return FIELD_ICONS[iconName] || LayoutGrid;
};

export const getNavIcon = (iconName: string): LucideIcon => {
  return NAV_ICONS[iconName] || LayoutGrid;
};
