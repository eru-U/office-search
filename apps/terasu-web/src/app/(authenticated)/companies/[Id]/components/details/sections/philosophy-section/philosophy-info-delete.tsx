"use client";

// biome-ignore assist/source/organizeImports: <>
import { philosophyInfoDeleteAction } from "@/actions/companies/detail/philosophy-action/philosophy-info-delete-action";
import { TrashButton } from "@/components/trash-button";
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { useTransition } from "react";
import { toast } from "sonner";

export const PhilosophyDelete = ({ id }: { id: string }) => {
  const { onRefresh } = useYearlyDetail();
  const [isPending, startTransition] = useTransition();

  // TrashButton の onAction に渡す関数
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await philosophyInfoDeleteAction(id);

        await onRefresh();

        toast.success("企業理念を抹消しました");
      } catch (_error) {
        console.error("企業理念の削除に失敗しました", _error);
        toast.error(
          "削除に失敗しました。この理念はまだ消されたくないようです。",
        );
      }
    });
  };

  return <TrashButton onAction={handleDelete} disabled={isPending} />;
};
