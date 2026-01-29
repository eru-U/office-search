"use client";

// biome-ignore assist/source/organizeImports: <>
import { contactInfoDeleteAction } from "@/actions/companies/detail/contant-action/contact-delete-action";
import { TrashButton } from "@/components/trash-button";
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { useTransition } from "react";
import { toast } from "sonner";

export const ContactInfoDelete = ({ id }: { id: string }) => {
  const { onRefresh } = useYearlyDetail();
  const [isPending, startTransition] = useTransition();

  // TrashButton の onAction に渡す関数
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await contactInfoDeleteAction(id);

        await onRefresh();

        toast.success("担当者情報を抹消しました");
      } catch (_error) {
        console.error("人物情報の削除に失敗しました", _error);
        toast.error(
          "削除に失敗しました。この担当者情報はまだ消されたくないようです。",
        );
      }
    });
  };

  return <TrashButton onAction={handleDelete} disabled={isPending} />;
};
