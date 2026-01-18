"use client";

// biome-ignore assist/source/organizeImports: <>
import { profileQualificationsDeleteAction } from "@/actions/profile/profile-qualifications-action";
import { TrashButton } from "@/components/trash-button";
import { useProfile } from "@/contexts/profile-context";
import { useTransition } from "react";
import { toast } from "sonner";

export const QualificationDeleteButton = ({ id }: { id: string }) => {
  const { onRefresh } = useProfile();
  const [isPending, startTransition] = useTransition();

  // TrashButton の onAction に渡す関数
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await profileQualificationsDeleteAction(id);
        await onRefresh();
        toast.success("保有資格を削除しました");
      } catch (_error) {
        toast.error("保有資格の削除に失敗しました");
      }
    });
  };

  return <TrashButton onAction={handleDelete} disabled={isPending} />;
};
