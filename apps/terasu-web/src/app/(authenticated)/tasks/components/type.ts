export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  deadline: Date | null;
  createdAt: Date;
  completedAt: Date | null;
  company: {
    name: string;
  } | null;
  schedule: {
    title: string;
  } | null;
}


