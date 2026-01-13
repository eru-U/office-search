"use client";

// biome-ignore assist/source/organizeImports: <>
import { memoAdd } from "@/actions/companies/detail/memo-action/memos";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CompanyMemoSchema, companyMemoSchema } from "@terasu/schema";
import { Calendar, Edit2, Plus, Trash2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

/**
 * メモタブのコンテンツ
 * タイムライン形式で企業に関する気づきを管理します。
 */
export function MemoTab() {
  // パスからIDを取得
  const params = useParams();
  const companyId = params.Id as string;

  // ==============状態管理==============
  // 追加、閉じるボタンのフラグ
  const [isAddingMemo, setIsAddingMemo] = useState(false);
  // 非同期処理時の重複防止
  const [isPending, startTransition] = useTransition();
  // ===================================

  // formの定義
  const addForm = useForm<CompanyMemoSchema>({
    resolver: zodResolver(companyMemoSchema),
    defaultValues: {
      content: "",
    },
  });

  /**
   * 追加の送信関数
   */
  const addOnSubmit = (data: CompanyMemoSchema) => {
    startTransition(async () => {
      try {
        await memoAdd(companyId, data.content);
        toast.success("メモを追加しました");
        addForm.reset();
      } catch (error) {
        console.error("送信できませんでした", error);
      }
    });
  };

  return (
    <TabsContent
      value="memo"
      className="flex-1 flex flex-col m-0 min-h-0 overflow-hidden"
    >
      <div className="px-6 py-3 border-b bg-white flex justify-between items-center shrink-0">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Timeline
        </span>

        {/* 追加ボタンと閉じるボタンの切り替え */}
        {!isAddingMemo ? (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 text-[10px] font-bold rounded-full border-primary text-primary hover:bg-primary/5"
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

      {/* 入力エリア（展開時） */}
      {isAddingMemo && (
        <Form {...addForm}>
          <form onSubmit={addForm.handleSubmit(addOnSubmit)}>
            <div className="p-6 bg-slate-50 border-b animate-in fade-in slide-in-from-top-1 duration-200 shrink-0">
              <FormField
                control={addForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="気づいたこと、感じたこと、調べたこと..."
                        className="min-h-25 bg-white resize-none shadow-sm mb-3 text-sm"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
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

      <ScrollArea className="flex-1 h-full pb-10">
        <div className="p-6 space-y-4 pb-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="group relative p-4 rounded-2xl border bg-white hover:border-primary/30 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                  <Calendar className="h-3 w-3" /> 2026/01/12
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-primary"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                メモの内容がここに入ります。業界研究やOB訪問の結果をここにストック。
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
