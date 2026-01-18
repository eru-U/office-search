"use client";

import { taskCreate } from "@/actions/tasks/task-create";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onSuccess: () => void;
}

export const TaskAddInput = ({ onSuccess }: Props) => {
  const [title, setTitle] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleAdd = async () => {
    if (!title.trim() || isPending) return;
    setIsPending(true);
    try {
      await taskCreate(title);
      setTitle("");
      onSuccess();
      toast.success("タスクを追加しました");
    } catch {
      toast.error("追加に失敗しました");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-black/5 flex flex-col gap-2">
      <Input
        placeholder="新しいタスク..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="h-9 text-xs bg-white/70 border-none focus-visible:ring-1 focus-visible:ring-primary/30 shadow-inner"
        disabled={isPending}
      />
      <Button
        size="sm"
        variant="ghost"
        onClick={handleAdd}
        disabled={isPending}
        className="w-full h-8 text-xs font-bold gap-1 hover:bg-white/50 transition-colors"
      >
        <Plus className="h-3 w-3" /> 追加
      </Button>
    </div>
  );
};
