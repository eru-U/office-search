"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Edit2, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

/**
 * メモタブのコンテンツ
 * タイムライン形式で企業に関する気づきを管理します。
 */
export function MemoTab() {
  const [isAddingMemo, setIsAddingMemo] = useState(false);

  return (
    <TabsContent
      value="memo"
      className="flex-1 flex flex-col m-0 min-h-0 overflow-hidden"
    >
      <div className="px-6 py-3 border-b bg-white flex justify-between items-center shrink-0">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Timeline
        </span>
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
        <div className="p-6 bg-slate-50 border-b animate-in fade-in slide-in-from-top-1 duration-200 shrink-0">
          <Textarea
            placeholder="気づいたこと、感じたこと、調べたこと..."
            className="min-h-[100px] bg-white resize-none shadow-sm mb-3 text-sm"
          />
          <div className="flex justify-end gap-2">
            <Button size="sm" className="font-bold h-8 px-4 text-xs">
              保存する
            </Button>
          </div>
        </div>
      )}

      {/* スクロール可能エリア：pb-12 で見切れ防止 */}
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
