"use client";

// biome-ignore assist/source/organizeImports: <>
import {
  memoAdd,
  memoFetch,
} from "@/actions/companies/detail/memo-action/memos";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyDetailSchema } from "@terasu/schema";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { MemoItem } from "./memo-item";
/**
 * メモタブのコンテンツ
 * タイムライン形式で企業に関する気づきを管理します。
 */
export function MemoTab() {
  const params = useParams();
  const companyId = params.Id as string;

  const [isAddingMemo, setIsAddingMemo] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [memos, setMemos] = useState<
    { id: string; content: string; createdAt: Date }[]
  >([]);

  // メモの読み込み
  const loadMemos = useCallback(async () => {
    const data = await memoFetch(companyId);
    if (data) {
      // 日付が文字列で返ってくる場合のパース処理（必要に応じて）
      setMemos(data.map((m) => ({ ...m, createdAt: new Date(m.createdAt) })));
    }
  }, [companyId]);

  useEffect(() => {
    loadMemos();
  }, [loadMemos]);

  // 新規追加用フォーム
  const addForm = useForm<companyDetailSchema.CompanyMemoTypes>({
    resolver: zodResolver(companyDetailSchema.companyMemoSchema),
    defaultValues: { content: "" },
  });

  const addOnSubmit = (data: companyDetailSchema.CompanyMemoTypes) => {
    startTransition(async () => {
      try {
        await memoAdd(companyId, data.content);
        toast.success("メモを追加しました");
        addForm.reset();
        setIsAddingMemo(false);
        loadMemos();
      } catch (_error) {
        console.error("メモの追加に失敗しました", _error);
        toast.error("送信できませんでした");
      }
    });
  };

  return (
    <TabsContent
      value="memo"
      className="flex-1 flex flex-col m-0 min-h-0 overflow-hidden"
    >
      {/* ヘッダーエリア */}
      <div className="px-6 py-3 border-b bg-white flex justify-between items-center shrink-0">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Timeline
        </span>
        {!isAddingMemo ? (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 text-[10px] font-bold rounded-full border-primary text-primary"
            onClick={() => setIsAddingMemo(true)}
          >
            <Plus className="h-3 w-3" /> 新規追加
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 text-[10px] font-bold"
            onClick={() => setIsAddingMemo(false)}
          >
            <X className="h-3 w-3" /> 閉じる
          </Button>
        )}
      </div>

      {/* 新規追加入力エリア */}
      {isAddingMemo && (
        <Form {...addForm}>
          <form onSubmit={addForm.handleSubmit(addOnSubmit)}>
            <div className="p-6 bg-slate-50 border-b animate-in fade-in slide-in-from-top-1 duration-200">
              <FormField
                control={addForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="気づいたこと、感じたこと..."
                        className="min-h-25 bg-white resize-none shadow-sm mb-3 text-sm"
                        {...field}
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
                  className="font-bold h-8 px-4 text-xs"
                >
                  {isPending ? "保存中..." : "保存する"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}

      {/* リスト表示エリア */}
      <ScrollArea className="flex-1 h-full pb-10">
        <div className="p-6 space-y-4 pb-12">
          {memos.map((memo) => (
            <MemoItem key={memo.id} memo={memo} onRefresh={loadMemos} />
          ))}
          {memos.length === 0 && !isAddingMemo && (
            <div className="text-center py-20 text-slate-400 text-xs font-bold">
              メモがありません
            </div>
          )}
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
