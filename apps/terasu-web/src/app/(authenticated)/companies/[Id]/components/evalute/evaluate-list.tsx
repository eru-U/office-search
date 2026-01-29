"use client";

import { Star } from "lucide-react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EvaluateItem } from "./evaluate-item";

// 型定義
type PriorityType = "HIGH" | "MEDIUM" | "LOW";

interface JobHuntingAxis {
  id: string;
  title: string;
  priorityType: PriorityType;
}

/**
 * 画面制作用のダミーデータ
 * 順序は既に「必須 > 優先 > 許容」の順でソートされているものとします
 */
const DUMMY_AXES: JobHuntingAxis[] = [
  { id: "1", title: "給与・福利厚生", priorityType: "HIGH" },
  { id: "2", title: "ワークライフバランス", priorityType: "HIGH" },
  { id: "3", title: "モダンな技術スタック", priorityType: "MEDIUM" },
  { id: "4", title: "フルリモート可", priorityType: "MEDIUM" },
  { id: "5", title: "オフィスの綺麗さ", priorityType: "LOW" },
];

export function EvaluateList() {
  const params = useParams();
  // URLの[Id]から企業IDを取得
  // あとでデータベースに登録するように必要
  const companyId = params.Id as string;

  // すでにソート済みとのことなので、そのままマッピングしますが、
  // ユーザーへの「優しさ」としてセクション分けのロジックは保持します。
  const highAxes = DUMMY_AXES.filter((a) => a.priorityType === "HIGH");
  const mediumAxes = DUMMY_AXES.filter((a) => a.priorityType === "MEDIUM");
  const lowAxes = DUMMY_AXES.filter((a) => a.priorityType === "LOW");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full font-bold h-9"
        >
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          評価する
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-black text-slate-900">
            企業評価
          </DialogTitle>
          <p className="text-sm text-slate-500 font-medium">
            設定済みの就活軸に基づいてスコアを入力してください
          </p>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] px-6 pb-6">
          <div className="space-y-8 py-4">
            {/* 必須軸セクション */}
            {highAxes.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                  <h2 className="text-xs font-black uppercase tracking-widest text-orange-600">
                    必須条件
                  </h2>
                </div>
                {highAxes.map((axis) => (
                  <EvaluateItem
                    key={axis.id}
                    axisId={axis.id}
                    axisName={axis.title}
                    priorityType={axis.priorityType} // ここでしっかり受け渡す
                  />
                ))}
              </section>
            )}

            {/* 優先軸セクション */}
            {mediumAxes.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <h2 className="text-xs font-black uppercase tracking-widest text-blue-600">
                    優先条件
                  </h2>
                </div>
                {mediumAxes.map((axis) => (
                  <EvaluateItem
                    key={axis.id}
                    axisId={axis.id}
                    axisName={axis.title}
                    priorityType={axis.priorityType} // ここでしっかり受け渡す
                  />
                ))}
              </section>
            )}

            {/* 許容軸セクション */}
            {lowAxes.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-slate-400" />
                  <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">
                    許容条件
                  </h2>
                </div>
                {lowAxes.map((axis) => (
                  <EvaluateItem
                    key={axis.id}
                    axisId={axis.id}
                    axisName={axis.title}
                    priorityType={axis.priorityType} // ここでしっかり受け渡す
                  />
                ))}
              </section>
            )}
          </div>
        </ScrollArea>

        <div className="border-t bg-slate-50 p-4 flex justify-end gap-3">
          <Button variant="ghost" className="font-bold rounded-xl px-6">
            閉じる
          </Button>
          <Button className="hover:bg-gray-700 font-bold px-8 rounded-xl shadow-lg shadow-blue-100">
            評価を確定する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
