"use client";

import { taskUpdateStatus } from "@/actions/tasks/task-status-update-action";
import { taskUpdateDescription } from "@/actions/tasks/task-update-description";
import { taskUpdateTitle } from "@/actions/tasks/task-update-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isBefore, isSameDay, startOfDay } from "date-fns";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  CheckSquare,
  Edit2,
  History,
  RotateCcw,
  X,
} from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import type { Task } from "./type";

interface Props {
  task: Task;
  onRefresh: () => void;
  isOverlay?: boolean;
}

const taskUpdateSchema = z.object({
  description: z.string().nullable(),
});

type TaskUpdateValues = z.infer<typeof taskUpdateSchema>;

export const TaskCard = ({ task, onRefresh, isOverlay = false }: Props) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState<string>(task?.title ?? "");
  const [isPending, startTransition] = useTransition();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging && !isOverlay ? 0.3 : 1,
  };

  const form = useForm<TaskUpdateValues>({
    resolver: zodResolver(taskUpdateSchema),
    defaultValues: {
      description: task.description ?? "",
    },
  });

  const handleStatusChange = async (newStatus: string) => {
    try {
      await taskUpdateStatus(task.id, newStatus);
      onRefresh();
      toast.success("ステータスを更新しました");
    } catch {
      toast.error("更新に失敗しました");
    }
  };

  const onDescriptionSubmit = (data: TaskUpdateValues) => {
    startTransition(async () => {
      try {
        await taskUpdateDescription(task.id, data.description ?? null);
        toast.success("詳細を更新しました");
        setIsEditingDescription(false);
        onRefresh();
      } catch {
        toast.error("更新に失敗しました");
      }
    });
  };

  const onTitleSubmit = () => {
    startTransition(async () => {
      try {
        await taskUpdateTitle(task.id, titleValue);
        toast.success("タイトルを更新しました");
        setIsEditingTitle(false);
        onRefresh();
      } catch {
        toast.error("更新に失敗しました");
      }
    });
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
      <Sheet onOpenChange={(open) => !open && setIsEditingDescription(false)}>
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
              {!isEditingTitle ? (
                <button
                  type="button"
                  className="text-left w-full text-xl font-bold leading-tight text-slate-900 hover:bg-slate-50 rounded-md px-1 py-1"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {task?.title || (
                    <span className="text-slate-400 italic">
                      無題（クリックして編集）
                    </span>
                  )}
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    placeholder="タイトルを入力"
                    className="text-xl font-bold h-10"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onTitleSubmit();
                      }
                      if (e.key === "Escape") {
                        setIsEditingTitle(false);
                        setTitleValue(task?.title ?? "");
                      }
                    }}
                    disabled={isPending}
                  />
                  <Button
                    variant="default"
                    size="sm"
                    className="h-8 px-4 text-[11px] font-black rounded-full"
                    onClick={onTitleSubmit}
                    disabled={isPending}
                  >
                    {isPending ? "更新中..." : "保存"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      setIsEditingTitle(false);
                      setTitleValue(task?.title ?? "");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </SheetHeader>

            <div className="space-y-8 text-sm mx-2">
              <div className="space-y-4">
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

                <div className="space-y-3 group/memo">
                  <div className="flex items-center justify-between px-1">
                    <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                      詳細・メモ
                    </h4>
                    {!isEditingDescription ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover/memo:opacity-100 transition-opacity"
                        onClick={() => setIsEditingDescription(true)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          setIsEditingDescription(false);
                          form.reset();
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>

                  {isEditingDescription ? (
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onDescriptionSubmit)}
                        className="space-y-3"
                      >
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  value={field.value ?? ""}
                                  disabled={isPending}
                                  className="min-h-48 bg-slate-50 text-sm resize-none rounded-2xl p-5 leading-relaxed focus-visible:ring-primary/20"
                                  placeholder="詳細を入力してください..."
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            disabled={isPending}
                            size="sm"
                            className="h-8 px-4 text-[11px] font-black rounded-full"
                          >
                            {isPending ? "更新中..." : "内容を保存"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <button
                      type="button"
                      className="w-full text-left items-start bg-slate-50 px-5 py-5 rounded-2xl min-h-48 whitespace-pre-wrap leading-relaxed shadow-inner border border-slate-100 text-slate-700 cursor-pointer hover:bg-slate-100/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                      onClick={() => setIsEditingDescription(true)}
                    >
                      {task?.description || (
                        <span className="text-slate-400 italic">
                          詳細はありません。クリックして入力
                        </span>
                      )}
                    </button>
                  )}
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
