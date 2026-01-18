"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Info } from "lucide-react";
import type { JobHuntingAxis, PriorityType } from "./type";

interface AxisCardProps {
  axis: JobHuntingAxis;
}

/**
 * ドラッグ＆ドロップ可能な就活軸カードコンポーネントです。
 */
export const AxisCard = ({ axis }: AxisCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: axis.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };

  // 優先度に応じたスタイル定義
  const priorityStyles: Record<PriorityType, string> = {
    HIGH: "border-l-4 border-l-orange-500 bg-orange-50/50",
    MEDIUM: "border-l-4 border-l-blue-500 bg-blue-50/50",
    LOW: "border-l-4 border-l-slate-400 bg-slate-50/50",
  };

  const currentPriority = axis.priorityType ?? "LOW";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group mb-3 flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${
        priorityStyles[currentPriority]
      } ${isDragging ? "opacity-50 shadow-xl" : ""}`}
    >
      {/* ドラッグハンドル */}
      <button
        type="button"
        className="cursor-grab p-1 text-slate-400 hover:text-slate-600 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>

      {/* コンテンツエリア */}
      <div className="flex-1">
        <p className="text-sm font-bold text-slate-800 whitespace-pre-wrap">
          {axis.content ?? "内容未設定"}
        </p>
      </div>

      {/* アクションエリア */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-white text-[10px] font-black">
          {currentPriority}
        </Badge>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Info className="h-4 w-4 text-slate-400" />
        </Button>
      </div>
    </div>
  );
};
