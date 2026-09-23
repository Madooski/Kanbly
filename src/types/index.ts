export type FieldId =
  | "student"
  | "marketer"
  | "hr"
  | "founder"
  | "freelancer"
  | "developer";

export interface Field {
  id: FieldId;
  title: string;
  icon: string;
}

export interface TaskCardData {
  tag: string;
  title: string;
  desc?: string;
  comments: number;
  time: string;
}

export interface BoardColumnData {
  title: string;
  count: number;
  cards: TaskCardData[];
}

export interface NavItem {
  label: string;
  icon: string;
  active: boolean;
}
