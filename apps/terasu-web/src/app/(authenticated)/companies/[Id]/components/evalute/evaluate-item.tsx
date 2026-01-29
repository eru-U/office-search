"use client";

import type { ChangeEvent, ReactElement } from "react";
import { useState } from "react";

// 重要度の型定義
type PriorityType = "HIGH" | "MEDIUM" | "LOW";

interface EvaluateItemProps {
  axisId: string;
  axisName: string;
  priorityType: PriorityType; // 新しく追加
}

export function EvaluateItem({
  axisId,
  axisName,
  priorityType,
}: EvaluateItemProps): ReactElement {
  // 評価スコアの状態（0〜10）
  const [score, setScore] = useState<number>(5);

  /**
   * スライダーの値が変更された時のハンドラ
   */
  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setScore(Number.parseInt(e.target.value, 10));
  };

  /**
   * 優先度に基づいたバッジのスタイルとラベルを取得
   */
  const getPriorityLabel = () => {
    switch (priorityType) {
      case "HIGH":
        return { label: "必須", classes: "bg-orange-100 text-orange-700" };
      case "MEDIUM":
        return { label: "優先", classes: "bg-blue-100 text-blue-700" };
      case "LOW":
        return { label: "許容", classes: "bg-slate-100 text-slate-600" };
    }
  };

  const priority = getPriorityLabel();

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-200">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* 重要度バッジ */}
          <span
            className={`rounded-lg px-2 py-0.5 text-[10px] font-black ${priority.classes}`}
          >
            {priority.label}
          </span>
          {/* 軸の名前 */}
          <label
            htmlFor={`slider-${axisId}`}
            className="text-sm font-black text-slate-700 sm:text-base"
          >
            {axisName}
          </label>
        </div>

        {/* スコア表示 */}
        <div className="flex items-center gap-1">
          <span className="text-2xl font-black text-blue-600">{score}</span>
          <span className="text-xs font-bold text-slate-400">/ 10</span>
        </div>
      </div>

      <div className="relative flex items-center">
        <input
          id={`slider-${axisId}`}
          type="range"
          min="0"
          max="10"
          step="1"
          value={score}
          onChange={handleScoreChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-blue-600 transition-all hover:bg-slate-200"
        />
      </div>

      {/* 目盛りガイド */}
      <div className="mt-2 flex justify-between px-1">
        {[...Array(11)].map((_, i) => (
          <span
            key={`${axisId}-tick-${
              // biome-ignore lint/suspicious/noArrayIndexKey: <>
              i
            }`}
            className={`h-1 w-px ${
              i <= score ? "bg-blue-300" : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-400">
        <span>低い</span>
        <span>高い</span>
      </div>
    </div>
  );
}
