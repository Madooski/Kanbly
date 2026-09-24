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

export type TaskStatus = 'drafting' | 'review' | 'scheduled';
export type TaskStage = 'planning' | 'active' | 'published';

export interface TaskCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  avatars: string[];
  comments: number;
  dueDate: string;
  status: TaskStatus;
  stage: TaskStage;
}

export interface BoardColumnData {
  title: string;
  count: number;
  cards: TaskCard[];
}

export interface NavItem {
  label: string;
  icon: string;
  active: boolean;
}
