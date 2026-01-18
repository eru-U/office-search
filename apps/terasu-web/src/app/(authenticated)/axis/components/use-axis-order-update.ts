"use client";

// biome-ignore assist/source/organizeImports: <>
import { axisUpdateOrderAction } from "@/actions/axis/axis-update-order-action";
import type { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useTransition } from "react";
import { toast } from "sonner";
import type { JobHuntingAxis, PriorityType } from "./type";

export const useAxisOrderUpdate = (
  axes: JobHuntingAxis[],
  setAxes: (axes: JobHuntingAxis[]) => void,
  onRefresh: () => Promise<void>,
) => {
  const [isPending, startTransition] = useTransition();

  /**
   * ドラッグ中の処理：セクションを跨いだ瞬間にプレビューを更新する
   */
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // 現在のアイテムとターゲットのインデックスを取得
    const activeIndex = axes.findIndex((i) => i.id === activeId);
    const overIndex = axes.findIndex((i) => i.id === overId);

    if (activeIndex === -1) return;

    let newPriority: PriorityType | null = null;

    // 1. コンテナ（空のセクション）にドロップしようとしている場合
    if (overId === "CONTAINER_HIGH") newPriority = "HIGH";
    if (overId === "CONTAINER_MEDIUM") newPriority = "MEDIUM";
    if (overId === "CONTAINER_LOW") newPriority = "LOW";

    // 2. 他のアイテムの上にドロップしようとしている場合
    if (!newPriority && overIndex !== -1) {
      newPriority = axes[overIndex].priorityType;
    }

    // セクションが変わる場合のみ、即座にUI上の所属を書き換える
    if (newPriority && axes[activeIndex].priorityType !== newPriority) {
      const newArray = [...axes];
      newArray[activeIndex] = {
        ...newArray[activeIndex],
        priorityType: newPriority,
      };
      setAxes(newArray);
    }
  };

  /**
   * ドラッグ終了時の処理：DBへ永続化
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = axes.findIndex((i) => i.id === active.id);
      const newIndex = axes.findIndex((i) => i.id === over.id);

      // 配列の並び替え実行
      const newArray = arrayMove(axes, oldIndex, newIndex);

      // 全体の順序を確定させる
      const finalArray = newArray.map((item, idx) => ({
        ...item,
        displayOrder: idx + 1,
      }));

      setAxes(finalArray);

      startTransition(async () => {
        try {
          const payload = finalArray.map((item) => ({
            id: item.id,
            priorityType: item.priorityType ?? "LOW",
            displayOrder: item.displayOrder ?? 0,
          }));

          await axisUpdateOrderAction(payload);
          // 成功時はあえて fetchAxes しない（UIの状態を信じる）
          toast.success("配置を保存しました");
        } catch (_error) {
          toast.error("保存に失敗しました。同期します...");
          // 失敗時のみ、真実（DB）のデータを取り直して戻す
          await onRefresh();
        }
      });
    }
  };

  return {
    handleDragOver,
    handleDragEnd,
    isUpdating: isPending,
  };
};
