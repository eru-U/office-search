"use client";

// biome-ignore assist/source/organizeImports: <>
import { profileQualificationsEditAction } from "@/actions/profile/profile-qualifications-action";
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
import { useProfile } from "@/contexts/profile-context";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileQualificationSchema,
  type ProfileQualificationTypes,
} from "@terasu/schema/models/profiles/profileQualificationSchema";
import { Edit2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  id: string;
  initialContent: {
    name: string;
    obtainedDate: Date;
  };
};

export const QualificationEditButton = ({ id, initialContent }: Props) => {
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
  const form = useForm({
    resolver: zodResolver(profileQualificationSchema),
    defaultValues: {
      name: initialContent.name ?? "",
      obtainedDate: initialContent.obtainedDate,
    },
  });

  // ==================================================
  // 送信関数
  // ==================================================
  const onSubmit = async (values: ProfileQualificationTypes) => {
    const parseData = profileQualificationSchema.safeParse(values);

    if (!parseData.success) {
      toast.error("入力に誤りがあります");
      return;
    }

    startTransition(async () => {
      try {
        await profileQualificationsEditAction(id, parseData.data);
        await onRefresh();
        toast.success("保有資格を更新しました");
        setOpen(false);
      } catch (_error) {
        console.error("保有資格の更新に失敗しました", _error);
        toast.error("保有資格の更新に失敗しました");
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
          title="保有資格を編集"
        >
          <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-140">
        <DialogTitle className="text-xl font-bold border-b pb-4">
          保有資格の編集
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            {/* 資格名称 */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">資格名称</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="例:基本情報技術者試験"
                      className="focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 取得日 */}
            <FormField
              control={form.control}
              name="obtainedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">取得日</FormLabel>
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
