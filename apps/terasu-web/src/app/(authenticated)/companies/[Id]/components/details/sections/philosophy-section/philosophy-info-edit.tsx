// biome-ignore assist/source/organizeImports: <>
import { philosophyInfoEditAction } from "@/actions/companies/detail/philosophy-action/philosophy-info-edit-action";
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
import { Textarea } from "@/components/ui/textarea";
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyDetailPhilosophySchema } from "@terasu/schema";
import type { CompanyDetailPhilosophyEditInput } from "@terasu/schema/models/companyDetailPhilosophySchema";
import { Edit2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "../../shared/client-only";

interface Props {
  id: string;
  initialContent: string;
}

export const PhilosophyInfoEdit = ({ id, initialContent }: Props) => {
  // ==================================================
  // コンテキスト・状態管理
  // ==================================================
  const { onRefresh } = useYearlyDetail();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // ==================================================
  // フォームの初期化
  // ==================================================
  const form = useForm<CompanyDetailPhilosophyEditInput>({
    resolver: zodResolver(
      companyDetailPhilosophySchema.companyDetailPhilosophyEditSchema,
    ),
    defaultValues: {
      content: initialContent ?? "",
    },
  });

  // ==================================================
  // 送信関数
  // ==================================================
  const onSubmit = async (values: CompanyDetailPhilosophyEditInput) => {
    const parseData =
      companyDetailPhilosophySchema.companyDetailPhilosophyEditSchema.safeParse(
        values,
      );

    if (!parseData.success) {
      toast.error("入力に誤りがあります");
      return;
    }

    startTransition(async () => {
      try {
        await philosophyInfoEditAction(id, parseData.data);
        await onRefresh();
        toast.success("企業理念を更新しました");
        setOpen(false);
      } catch (_error) {
        toast.error("企業理念の更新に失敗しました");
      }
    });
  };

  // ==================================================

  return (
    <ClientOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-all active:scale-95"
            title="企業理念を編集"
          >
            <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-140">
          <DialogTitle className="text-xl font-bold border-b pb-4">
            企業理念の編集
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      企業理念・ビジョン
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="例：世界をより良くする"
                        className="min-h-32 focus-visible:ring-primary resize-none leading-relaxed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
    </ClientOnly>
  );
};
