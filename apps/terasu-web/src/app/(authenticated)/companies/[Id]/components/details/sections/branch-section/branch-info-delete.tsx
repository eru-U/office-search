"use client";

// biome-ignore assist/source/organizeImports: <>
import { branchDeleteAction } from "@/actions/companies/detail/branch-action/branch-delete-action";
import { TrashButton } from "@/components/trash-button";
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { useTransition } from "react";
import { toast } from "sonner";

export const BranchInfoDelete = ({ id }: { id: string }) => {
  const { onRefresh } = useYearlyDetail();
  const [isPending, startTransition] = useTransition();

  // TrashButton の onAction に渡す関数
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await branchDeleteAction(id);

        await onRefresh();

        toast.success("支店情報を抹消しました");
      } catch (_error) {
        toast.error(
          "削除に失敗しました。この支店情報はまだ消されたくないようです。",
        );
      }
    });
  };

  return <TrashButton onAction={handleDelete} disabled={isPending} />;
};
