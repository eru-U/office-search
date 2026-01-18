export type PriorityType = "HIGH" | "MEDIUM" | "LOW";

export interface JobHuntingAxis {
  id: string;
  content: string | null;
  priorityType: PriorityType | null;
  displayOrder: number | null;
  createdAt: Date | null;
}
