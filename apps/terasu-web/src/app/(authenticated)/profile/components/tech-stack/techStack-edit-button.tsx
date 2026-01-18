"use client";

// biome-ignore assist/source/organizeImports: <>
import { profileTechStackEditAction } from "@/actions/profile/profile-techStack-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/contexts/profile-context";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileTechStackUpdateSchema,
  type ProfileTechStackUpdateInput,
} from "@terasu/schema/models/profiles/profileTechStackSchema";
import { Edit2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  id: string;
  initialContent: {
    startedAt: Date | null;
    note: string | null;
    techStackName: string;
    techStackId: string;
  };
};

export const TechStackEditButton = ({ id, initialContent }: Props) => {
  // ==================================================
  // コンテキスト取得
  // ==================================================
  const { onRefresh } = useProfile();

  // ==================================================
  // 状態管理
  // ==================================================
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // ==================================================
  // フォームの初期化
  // ==================================================
  const form = useForm<ProfileTechStackUpdateInput>({
    resolver: zodResolver(profileTechStackUpdateSchema),
    defaultValues: {
      startedAt: initialContent.startedAt ?? new Date(),
      note: initialContent.note ?? "",
    },
  });

  // ==================================================
  // 送信関数
  // ==================================================
  const onSubmit = async (values: ProfileTechStackUpdateInput) => {
    const parseData = profileTechStackUpdateSchema.safeParse(values);

    if (!parseData.success) {
      toast.error("入力に誤りがあります");
      return;
    }

    startTransition(async () => {
      try {
        await profileTechStackEditAction(id, parseData.data);
        await onRefresh();
        toast.success("技術スタック情報を更新しました");
        setOpen(false);
      } catch (_error) {
        console.error("技術スタック情報の更新に失敗しました", _error);
        toast.error("技術スタック情報の更新に失敗しました");
      }
    });
  };

  // ==================================================
  // レンダリング
  // ==================================================
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-primary/10 transition-all active:scale-95"
          title="技術スタック情報を編集"
        >
          <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-140">
        <DialogTitle className="text-xl font-bold border-b pb-4">
          技術スタック情報の編集
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            {/* 技術スタック（参照用・編集不可） */}
            <FormItem>
              <FormLabel className="font-semibold">技術スタック</FormLabel>
              <FormControl>
                <Input
                  disabled
                  value={initialContent.techStackName}
                  className="bg-slate-100 cursor-not-allowed"
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                ※技術スタック自体は変更できません
              </p>
            </FormItem>

            {/* 開始日 */}
            <FormField
              control={form.control}
              name="startedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">開始日</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="focus-visible:ring-primary"
                      value={
                        field.value
                          ? new Date(
                              field.value.getTime() -
                                field.value.getTimezoneOffset() * 60000,
                            )
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = e.target.value;
                        field.onChange(
                          dateValue ? new Date(dateValue) : undefined,
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* メモ */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">メモ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="具体的な実績や使用感を記載してください"
                      className="min-h-32 focus-visible:ring-primary resize-none"
                      {...field}
                      value={field.value as string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* フッターアクション */}
            <div className="flex justify-end pt-4 border-t">
              <Button
                disabled={isPending}
                type="submit"
                className="w-25 font-bold shadow-md hover:opacity-90 transition-opacity"
              >
                {isPending ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
