"use client";

// biome-ignore assist/source/organizeImports: <>
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ChevronDown, ChevronUp, Info, Loader2, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { axisFetchAction } from "@/actions/axis/axis-fetch-action";
import { AxisProvider } from "@/contexts/axis-context";
import { AxisAddButton } from "./components/axis-add-button";
import { AxisCard } from "./components/axis-card";
import { AxisSectionHeader } from "./components/axis-section-header";
import type { JobHuntingAxis } from "./components/type";

/**
 * 就活軸設定ページ
 * データの取得、表示、および AxisProvider による状態管理の統合を行います。
 */
export default function AxisPage() {
  const [axes, setAxes] = useState<JobHuntingAxis[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  /**
   * データベースから最新の就活軸データを取得します
   */
  const fetchAxes = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await axisFetchAction();
      // 取得したデータを型安全に state へ格納します
      setAxes(result as JobHuntingAxis[]);
    } catch (_error) {
      console.error("[AxisPage] Fetch Error:", _error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初回レンダリング時にデータを取得
  useEffect(() => {
    fetchAxes();
  }, [fetchAxes]);

  /**
   * ドラッグ終了時のハンドリング
   * 現時点ではUI上の並び替えのみ。永続化アクションは別途実装。
   */
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setAxes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newArray = arrayMove(items, oldIndex, newIndex);

        // 表示順序（displayOrder）を配列のインデックスに基づいて仮更新
        return newArray.map((item, idx) => ({
          ...item,
          displayOrder: idx + 1,
        }));
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <AxisProvider onRefresh={fetchAxes}>
      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* ヘッダーセクション */}
          <header className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900">
                Job Hunting Axis
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                優先順位を整理して、ブレない就活を実現しましょう。
              </p>
            </div>
            {/* 共通のUIパーツに差し替え */}
            <AxisAddButton />
          </header>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={axes}
              strategy={verticalListSortingStrategy}
            >
              {/* MUST ZONE (HIGH) */}
              <AxisSectionHeader
                title="Must (絶対条件)"
                icon={
                  <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                }
                colorClass="text-orange-600 border-orange-200"
              />
              <div className="min-h-10">
                {axes.filter((a) => a.priorityType === "HIGH").length > 0 ? (
                  axes
                    .filter((a) => a.priorityType === "HIGH")
                    .map((axis) => <AxisCard key={axis.id} axis={axis} />)
                ) : (
                  <p className="py-6 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                    「絶対条件」をドラッグまたは追加してください
                  </p>
                )}
              </div>

              {/* SHOULD ZONE (MEDIUM) */}
              <AxisSectionHeader
                title="Should (できれば)"
                icon={<ChevronUp className="h-4 w-4 text-blue-500" />}
                colorClass="text-blue-600 border-blue-200"
              />
              <div className="min-h-10">
                {axes.filter((a) => a.priorityType === "MEDIUM").length > 0 ? (
                  axes
                    .filter((a) => a.priorityType === "MEDIUM")
                    .map((axis) => <AxisCard key={axis.id} axis={axis} />)
                ) : (
                  <p className="py-6 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                    「できれば」な条件を整理しましょう
                  </p>
                )}
              </div>

              {/* MAY ZONE (LOW) */}
              <AxisSectionHeader
                title="May (あれば尚良)"
                icon={<ChevronDown className="h-4 w-4 text-slate-400" />}
                colorClass="text-slate-500 border-slate-200"
              />
              <div className="min-h-10">
                {axes.filter((a) => a.priorityType === "LOW").length > 0 ? (
                  axes
                    .filter((a) => a.priorityType === "LOW")
                    .map((axis) => <AxisCard key={axis.id} axis={axis} />)
                ) : (
                  <p className="py-6 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                    あると嬉しい条件をここに追加
                  </p>
                )}
              </div>
            </SortableContext>
          </DndContext>

          {/* インフォメーションフッター */}
          <footer className="mt-12 rounded-2xl bg-white p-6 shadow-inner border border-slate-100">
            <div className="flex gap-4 items-start">
              <div className="mt-1 rounded-full bg-blue-100 p-2 text-blue-600">
                <Info className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800">
                  プロのアドバイス
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  軸は絞るほど、あなたの「本当に行きたい企業」が明確になります。
                  迷ったら、一度すべての軸を「May」に置いて、下から順に自分に問いかけてみてください。
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </AxisProvider>
  );
}
