"use client";

// biome-ignore assist/source/organizeImports: <>
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  CheckCircle2,
  Edit2,
  Link as LinkIcon,
  Plus,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";

/**
 * QAタブのコンテンツ
 * 逆質問のストックや面接での回答、スケジュール紐付けを管理します。
 */
export function QaTab() {
  const [isAddingQA, setIsAddingQA] = useState(false);

  return (
    <TabsContent
      value="qa"
      className="flex-1 flex flex-col m-0 min-h-0 overflow-hidden"
    >
      <div className="px-6 py-3 border-b bg-white flex justify-between items-center shrink-0">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Question Stock
        </span>
        {!isAddingQA ? (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 text-[10px] font-bold rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={() => setIsAddingQA(true)}
          >
            <Plus className="h-3 w-3" /> 質問をストック
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 text-[10px] font-bold"
            onClick={() => setIsAddingQA(false)}
          >
            <X className="h-3 w-3" /> 閉じる
          </Button>
        )}
      </div>

      {isAddingQA && (
        <div className="p-6 bg-blue-50/50 border-b animate-in fade-in slide-in-from-top-1 duration-200 space-y-4 shrink-0">
          <div className="space-y-2">
            <label
              htmlFor="modal-q"
              className="text-[10px] font-black text-blue-600 ml-1"
            >
              QUESTION
            </label>
            <Input
              id="modal-q"
              placeholder="質問の要約（例：配属について）"
              className="bg-white text-sm"
            />
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold px-6 text-xs h-8"
            >
              ストック
            </Button>
          </div>
        </div>
      )}

      {/* スクロールエリア：pb-12 で最後のアコーディオンまで表示 */}
      <ScrollArea className="flex-1 h-full qb-12">
        <div className="p-6 pt-2 pb-12">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {[1, 2, 3].map((i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border rounded-2xl bg-white px-4 shadow-sm overflow-hidden data-[state=open]:border-blue-500 data-[state=open]:ring-1 data-[state=open]:ring-blue-500 transition-all"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex flex-col items-start gap-1 text-left">
                    <div className="flex items-center gap-2">
                      {i === 1 ? (
                        <Badge className="bg-green-500 text-[8px] h-4 font-bold uppercase">
                          解決済
                        </Badge>
                      ) : i === 2 ? (
                        <Badge className="bg-indigo-600 text-[8px] h-4 font-bold uppercase gap-1">
                          <LinkIcon className="h-2 w-2" /> 紐付け済み
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-amber-600 border-amber-200 text-[8px] h-4 bg-amber-50 font-bold uppercase"
                        >
                          未回答
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-700 leading-snug">
                      {i === 1
                        ? "フルリモート制度の利用条件は？"
                        : i === 2
                          ? "一次面接で聞く：今後の海外展開の具体的なスケジュール"
                          : "入社後の評価指標について教えてください"}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2 border-t border-dashed">
                  <div className="space-y-4 mt-2">
                    <div className="p-4 bg-slate-50 rounded-xl space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3" /> Answer & Memo
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-slate-400 hover:text-primary"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>

                      {i === 1 ? (
                        <p className="text-sm text-slate-600 leading-relaxed font-medium">
                          「原則フルリモート。ただし新卒は週2出社」とのこと。
                        </p>
                      ) : (
                        <div className="space-y-3">
                          <Textarea
                            placeholder="聞いた回答をここにメモ..."
                            className="bg-white text-xs min-h-22.5 shadow-inner border-none"
                          />
                          <Button
                            size="sm"
                            className="w-full text-xs font-bold h-8 bg-blue-600"
                          >
                            <Save className="h-3 w-3 mr-2" /> 回答を記録
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* スケジュール紐付け情報（表示例） */}
                    {i === 2 && (
                      <div className="px-3 py-2 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-indigo-500" />
                          <span className="text-[10px] font-bold text-indigo-700">
                            一次面接 (2026/01/20) に紐付け中
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-[10px] text-indigo-400 hover:text-indigo-600 px-2"
                        >
                          解除
                        </Button>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
