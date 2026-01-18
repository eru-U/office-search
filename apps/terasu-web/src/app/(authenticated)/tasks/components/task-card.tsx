"use client";

import { taskUpdateStatus } from "@/actions/tasks/task-status-update-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { format, isBefore, isSameDay, startOfDay } from "date-fns";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  CheckSquare,
  History,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import type { Task } from "./type";

interface Props {
  task: Task;
  onRefresh: () => void;
  isOverlay?: boolean;
}

export const TaskCard = ({ task, onRefresh, isOverlay = false }: Props) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging && !isOverlay ? 0.3 : 1,
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await taskUpdateStatus(task.id, newStatus);
      onRefresh();
      toast.success("ステータスを更新しました");
    } catch {
      toast.error("更新に失敗しました");
    }
  };

  const getDeadlineColor = (date: Date | null) => {
    if (!date) return "text-slate-400";
    const today = startOfDay(new Date());
    const target = startOfDay(new Date(date));
    if (isSameDay(target, today)) return "text-orange-600 font-bold";
    if (isBefore(target, today)) return "text-red-600 font-bold";
    return "text-slate-600 font-medium";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={isOverlay ? "pointer-events-none" : ""}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Card
            className={`cursor-grab active:cursor-grabbing transition-all bg-white overflow-hidden ${
              isOverlay
                ? "shadow-2xl border-primary/50 ring-2 ring-primary/10"
                : "shadow-sm border-slate-200 hover:border-primary/30 hover:shadow-md"
            }`}
          >
            <div className="p-2.5 space-y-1.5">
              <h4 className="text-[13px] font-bold leading-tight text-slate-800 line-clamp-2">
                {task?.title ?? "無題"}
              </h4>

              <div className="flex items-center justify-between border-t pt-1.5 mt-1 border-slate-50">
                <div className="flex items-center gap-3 text-[10px]">
                  <div className="flex items-center gap-1 text-slate-400 shrink-0">
                    <History className="w-3 h-3" />
                    <span className="opacity-70">作成:</span>
                    <span>
                      {task?.createdAt
                        ? format(new Date(task.createdAt), "MM/dd")
                        : "--/--"}
                    </span>
                  </div>

                  <div
                    className={`flex items-center gap-1 shrink-0 ${getDeadlineColor(task.deadline)}`}
                  >
                    <Calendar className="w-3 h-3 opacity-70" />
                    <span className="opacity-70">期限:</span>
                    <span>
                      {task?.deadline
                        ? format(new Date(task.deadline), "MM/dd")
                        : "--/--"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </SheetTrigger>

        {!isOverlay && (
          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader className="border-b pb-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className="text-[10px] uppercase tracking-widest"
                >
                  {task?.status}
                </Badge>
              </div>
              <SheetTitle className="text-xl font-bold leading-tight">
                {task?.title}
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-8 text-sm mx-2">
              <div className="space-y-4">
                {/* メタ情報（日付）エリア：小さく、かつ情報を網羅 */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 px-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <History className="w-3 h-3 opacity-60" />
                    <span>
                      作成:{" "}
                      {task?.createdAt
                        ? format(new Date(task.createdAt), "yyyy/MM/dd")
                        : "--/--"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 text-[11px] ${getDeadlineColor(task.deadline)}`}
                  >
                    <Calendar className="w-3 h-3 opacity-60" />
                    <span>
                      期限:{" "}
                      {task?.deadline
                        ? format(new Date(task.deadline), "yyyy/MM/dd")
                        : "未設定"}
                    </span>
                  </div>
                  {task?.completedAt && (
                    <div className="flex items-center gap-1.5 text-[11px] text-violet-600 font-medium">
                      <CheckSquare className="w-3 h-3 opacity-60" />
                      <span>
                        完了: {format(new Date(task.completedAt), "yyyy/MM/dd")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold text-muted-foreground uppercase px-1 tracking-widest">
                    詳細・メモ
                  </h4>
                  <div className="bg-slate-50 px-5 py-5 rounded-2xl min-h-48 whitespace-pre-wrap leading-relaxed shadow-inner border border-slate-100 text-slate-700">
                    {task?.description || "詳細はありません。"}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: "関連企業", val: task?.company?.name },
                  { label: "スケジュール", val: task?.schedule?.title },
                ].map((item) => (
                  <div key={item.label} className="space-y-2 group">
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase px-1 tracking-widest">
                      {item.label}
                    </h4>
                    <div className="bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm transition-colors group-hover:border-slate-300">
                      <p className="text-sm font-bold text-slate-800 break-all leading-snug">
                        {item.val ?? "未設定"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t space-y-4">
                <h4 className="text-[11px] font-bold text-muted-foreground uppercase px-1 tracking-widest">
                  状態を変更する
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {task.status !== "TODO" && (
                    <Button
                      variant="outline"
                      className="justify-start gap-3 h-11 rounded-xl border-emerald-100 hover:bg-emerald-50 text-emerald-700 transition-all"
                      onClick={() => handleStatusChange("TODO")}
                    >
                      <RotateCcw className="w-4 h-4" /> TODOに戻す
                    </Button>
                  )}
                  {task.status !== "TODAY" && (
                    <Button
                      variant="outline"
                      className="justify-start gap-3 h-11 rounded-xl border-amber-100 hover:bg-amber-50 text-amber-700 transition-all"
                      onClick={() => handleStatusChange("TODAY")}
                    >
                      <ArrowRight className="w-4 h-4" /> TODAYに移動
                    </Button>
                  )}
                  {task.status !== "DONE" && (
                    <Button
                      variant="outline"
                      className="justify-start gap-3 h-11 rounded-xl border-violet-100 hover:bg-violet-50 text-violet-700 transition-all"
                      onClick={() => handleStatusChange("DONE")}
                    >
                      <CheckCircle2 className="w-4 h-4" /> DONEにする
                    </Button>
                  )}
                </div>
              </div>
              <div className="h-12" />
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
};
