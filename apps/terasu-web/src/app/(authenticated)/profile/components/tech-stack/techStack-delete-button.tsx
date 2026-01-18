"use client";

// biome-ignore assist/source/organizeImports: <>
import { profileTechStackDeleteAction } from "@/actions/profile/profile-techStack-action";
import { TrashButton } from "@/components/trash-button";
import { useProfile } from "@/contexts/profile-context";
import { useTransition } from "react";
import { toast } from "sonner";

export const TechStackDeleteButton = ({ id }: { id: string }) => {
  const { onRefresh } = useProfile();
  const [isPending, startTransition] = useTransition();

  // TrashButton の onAction に渡す関数
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await profileTechStackDeleteAction(id);
        await onRefresh();
        toast.success("技術スタックを削除しました");
      } catch (_error) {
        toast.error("技術スタックの削除に失敗しました");
      }
    });
  };

  return <TrashButton onAction={handleDelete} disabled={isPending} />;
};
