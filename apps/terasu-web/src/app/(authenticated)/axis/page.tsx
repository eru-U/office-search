"use client";

import type { CollisionDetection } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ChevronDown, ChevronUp, Loader2, Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { axisFetchAction } from "@/actions/axis/axis-fetch-action";
import { AxisProvider } from "@/contexts/axis-context";
import { AxisAddButton } from "./components/axis-add-button";
import { AxisCard } from "./components/axis-card";
import { AxisSection } from "./components/axis-section";
import { AxisSectionHeader } from "./components/axis-section-header";
import type { JobHuntingAxis } from "./components/type";
import { useAxisOrderUpdate } from "./components/use-axis-order-update";

export default function AxisPage() {
  const [axes, setAxes] = useState<JobHuntingAxis[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const fetchAxes = useCallback(async () => {
    try {
      const result = await axisFetchAction();
      setAxes(result as JobHuntingAxis[]);
    } catch (_error) {
      console.error("[AxisPage] Fetch failed:", _error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAxes();
  }, [fetchAxes]);

  const { handleDragOver, handleDragEnd, isUpdating } = useAxisOrderUpdate(
    axes,
    setAxes,
    fetchAxes,
  );

  // 各セクションのアイテムをメモ化して、SortableContext に ID の配列を渡す
  const highAxes = useMemo(
    () => axes.filter((a) => a.priorityType === "HIGH"),
    [axes],
  );
  const mediumAxes = useMemo(
    () => axes.filter((a) => a.priorityType === "MEDIUM"),
    [axes],
  );
  const lowAxes = useMemo(
    () => axes.filter((a) => a.priorityType === "LOW"),
    [axes],
  );

  /**
   * カスタム衝突検知：
   * アイテムとの重なり（rectIntersection）を優先し、
   * 何もない場合は中心距離（closestCenter）でコンテナを探す。
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback((args) => {
    // まず矩形交差で判定（アイテム同士の入れ替えに強い）
    const intersections = rectIntersection(args);
    if (intersections.length > 0) {
      return intersections;
    }
    // 交差がない場合は最も近い中心点（空のコンテナへの移動に強い）
    return closestCenter(args);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <AxisProvider onRefresh={fetchAxes}>
      <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <header className="mb-10 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-black tracking-tighter text-slate-900 flex items-center gap-2">
                Job Hunting Axis
                {isUpdating && (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                )}
              </h1>
            </div>
            <AxisAddButton />
          </header>

          <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {/* --- HIGH SECTION --- */}
            <AxisSectionHeader
              title="Must (絶対条件)"
              icon={
                <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
              }
              colorClass="text-orange-600 border-orange-200"
            />
            <SortableContext
              items={highAxes.map((a) => a.id)}
              strategy={verticalListSortingStrategy}
            >
              <AxisSection id="CONTAINER_HIGH">
                {highAxes.map((axis) => (
                  <AxisCard key={axis.id} axis={axis} />
                ))}
                {highAxes.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                    ここにドロップして追加
                  </div>
                )}
              </AxisSection>
            </SortableContext>

            {/* --- MEDIUM SECTION --- */}
            <AxisSectionHeader
              title="Should (できれば)"
              icon={<ChevronUp className="h-4 w-4 text-blue-500" />}
              colorClass="text-blue-600 border-blue-200"
            />
            <SortableContext
              items={mediumAxes.map((a) => a.id)}
              strategy={verticalListSortingStrategy}
            >
              <AxisSection id="CONTAINER_MEDIUM">
                {mediumAxes.map((axis) => (
                  <AxisCard key={axis.id} axis={axis} />
                ))}
                {mediumAxes.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                    ここにドロップして追加
                  </div>
                )}
              </AxisSection>
            </SortableContext>

            {/* --- LOW SECTION --- */}
            <AxisSectionHeader
              title="May (あれば尚良)"
              icon={<ChevronDown className="h-4 w-4 text-slate-400" />}
              colorClass="text-slate-500 border-slate-200"
            />
            <SortableContext
              items={lowAxes.map((a) => a.id)}
              strategy={verticalListSortingStrategy}
            >
              <AxisSection id="CONTAINER_LOW">
                {lowAxes.map((axis) => (
                  <AxisCard key={axis.id} axis={axis} />
                ))}
                {lowAxes.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                    ここにドロップして追加
                  </div>
                )}
              </AxisSection>
            </SortableContext>
          </DndContext>
        </div>
      </main>
    </AxisProvider>
  );
}
