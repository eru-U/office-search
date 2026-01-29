"use client";

// biome-ignore assist/source/organizeImports: <>
import { welfareDeleteAction } from "@/actions/companies/detail/welfare-action/welfare-delete-action";
import { TrashButton } from "@/components/trash-button";
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { useTransition } from "react";
import { toast } from "sonner";

export const WelfareDelete = ({ id }: { id: string }) => {
  const { onRefresh } = useYearlyDetail();
  const [isPending, startTransition] = useTransition();

  // TrashButton の onAction に渡す関数
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await welfareDeleteAction(id);

        await onRefresh();

        toast.success("福利厚生を抹消しました");
      } catch (_error) {
        console.error("福利厚生の削除に失敗しました", _error);
        toast.error(
          "削除に失敗しました。この福利厚生はまだ消されたくないようです。",
        );
      }
    });
  };

  return <TrashButton onAction={handleDelete} disabled={isPending} />;
};
