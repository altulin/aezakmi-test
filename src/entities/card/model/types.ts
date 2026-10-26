export const PRIORITIES = ['Low', 'Medium', 'High'] as const;
export const STATUSES = ['To Do', 'In Progress', 'Done'] as const;
export const ASSIGNEES = [
  'Alex Johnson',
  'Maria Garcia',
  'John Smith',
] as const;

export type Priority = (typeof PRIORITIES)[number];
export type Status = (typeof STATUSES)[number];
export type Assignee = (typeof ASSIGNEES)[number];

export interface CardImage {
  id: string;
  name: string;
  url: string;
}

export interface Card {
  title: string;
  description: string;
  priority: Priority;
  status?: Status;
  assignee?: Assignee;
  deadline?: string;
  tags: string[];
  images: CardImage[];
}
