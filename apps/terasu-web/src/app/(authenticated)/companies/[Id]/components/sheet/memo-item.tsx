"use client";

import {
  memoDelete,
  memoEdit,
} from "@/actions/companies/detail/memo-action/memos";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyDetailSchema } from "@terasu/schema";
import { Calendar, Edit2, Trash2, X } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

/**
 * 各メモアイテムのコンポーネント（独立した編集状態を持つ）
 */
export const MemoItem = ({
  memo,
  onRefresh,
}: {
  memo: { id: string; content: string; createdAt: Date };
  onRefresh: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const editForm = useForm<companyDetailSchema.CompanyMemoTypes>({
    resolver: zodResolver(companyDetailSchema.companyMemoSchema),
    defaultValues: { content: memo.content ?? "" },
  });

  const onEditSubmit = (data: companyDetailSchema.CompanyMemoTypes) => {
    startTransition(async () => {
      try {
        await memoEdit(memo.id, data.content);
        toast.success("メモを更新しました");
        setIsEditing(false);
        onRefresh();
      } catch (_error) {
        toast.error("更新に失敗しました");
      }
    });
  };

  const deleteFunction = (id: string) => {
    startTransition(async () => {
      try {
        await memoDelete(id);
        toast.success("メモを削除しました");
        onRefresh();
      } catch (_error) {
        toast.error("削除に失敗しました");
      }
    });
  };

  return (
    <div className="group relative p-4 rounded-2xl border bg-white hover:border-primary/30 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
          <Calendar className="h-3 w-3" />
          {memo.createdAt.toLocaleDateString()}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {!isEditing ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-primary"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-400 hover:text-slate-600"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-400 hover:text-destructive"
            onClick={() => deleteFunction(memo.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Form {...editForm}>
          <form
            onSubmit={editForm.handleSubmit(onEditSubmit)}
            className="space-y-3"
          >
            <FormField
              control={editForm.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isPending}
                      className="min-h-20 bg-slate-50 text-sm resize-none"
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
                className="h-7 text-[10px] font-black rounded-full"
              >
                {isPending ? "更新中..." : "変更を確定"}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
          {memo.content}
        </p>
      )}
    </div>
  );
};
