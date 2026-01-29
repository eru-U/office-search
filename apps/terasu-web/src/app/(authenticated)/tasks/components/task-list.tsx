// apps\terasu-web\src\app\(authenticated)\tasks\components\task-list.tsx
"use client";

// biome-ignore assist/source/organizeImports: <>
import { taskFetch } from "@/actions/tasks/task-fetch";
import { taskUpdateStatus } from "@/actions/tasks/task-status-update-action";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { TaskAddInput } from "./task-add-input";
import { TaskCard } from "./task-card";
import type { Task } from "./type";

type ColumnType = "TODO" | "TODAY" | "DONE";

interface Column {
  id: ColumnType;
  label: string;
  color: string;
  dot: string;
}

const COLUMNS: Column[] = [
  {
    id: "TODO",
    label: "タスク",
    color: "bg-emerald-50/60 border-emerald-100",
    dot: "bg-emerald-500",
  },
  {
    id: "TODAY",
    label: "今日のタスク",
    color: "bg-amber-50/60 border-amber-100",
    dot: "bg-amber-500",
  },
  {
    id: "DONE",
    label: "作業終了",
    color: "bg-violet-50/60 border-violet-100",
    dot: "bg-violet-500",
  },
] as const;

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
  );

  const loadTasks = useCallback(async () => {
    try {
      const result = await taskFetch();
      setTasks(result as unknown as Task[]);
    } catch {
      toast.error("タスクの読み込みに失敗しました。");
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as ColumnType;
    const task = tasks.find((t) => t.id === taskId);

    if (!task || task.status === newStatus) return;

    const prevTasks = [...tasks];

    // ステータス更新に合わせて completedAt も楽観的にアップデートする
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              completedAt:
                newStatus === "DONE" ? (t.completedAt ?? new Date()) : null,
            }
          : t,
      ),
    );

    try {
      await taskUpdateStatus(taskId, newStatus);
      toast.success("ステータスを更新しました");
      // サーバー側の正確な値（完了時刻など）と同期するため再取得
      await loadTasks();
    } catch {
      setTasks(prevTasks);
      toast.error("更新に失敗しました");
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-0 w-full h-full pt-8 pb-4 px-20">
        <div className="flex gap-4 w-full h-[calc(100vh-80px)] min-h-120">
          {COLUMNS.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={tasks}
              onRefresh={loadTasks}
            />
          ))}
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <div className="rotate-3 scale-105 transition-transform duration-200 pointer-events-none shadow-2xl">
            <TaskCard task={activeTask} onRefresh={loadTasks} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const TaskColumn = ({
  column,
  tasks,
  onRefresh,
}: {
  column: Column;
  tasks: Task[];
  onRefresh: () => void;
}) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col flex-1 min-w-80 rounded-2xl ${column.color} border p-3 shadow-sm`}
    >
      <div className="flex items-center justify-between mb-5 px-2 pt-1 text-foreground/70">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${column.dot}`} />
          <h3 className="font-bold text-sm tracking-tight text-slate-600">
            {column.label}
          </h3>
        </div>
        <Badge
          variant="outline"
          className="bg-white/50 border-none font-mono text-[10px]"
        >
          タスク数 {tasks.filter((t) => t.status === column.id).length}
        </Badge>
      </div>
      <ScrollArea className="flex-1 px-1">
        <div className="flex flex-col gap-3 pb-4">
          {tasks
            .filter((task) => task.status === column.id)
            .map((task) => (
              <TaskCard key={task.id} task={task} onRefresh={onRefresh} />
            ))}
        </div>
      </ScrollArea>
      {column.id === "TODO" && <TaskAddInput onSuccess={onRefresh} />}
    </div>
  );
};
