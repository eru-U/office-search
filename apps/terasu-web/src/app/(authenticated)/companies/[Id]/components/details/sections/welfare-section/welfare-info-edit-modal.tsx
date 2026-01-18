"use client";

// biome-ignore assist/source/organizeImports: <>
import { welfareEditAction } from "@/actions/companies/detail/welfare-action/welfare-edit-action";
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
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyDetailWelfareEditSchema,
  type CompanyDetailWelfareEditInput,
} from "@terasu/schema/models/companyDetailWelfareSchema";
import { Edit2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "../../shared/client-only";

type Props = {
  id: string; // 福利厚生自体のID
  data: {
    name: string;
    content: string | null;
  };
};

/**
 * 福利厚生編集用モーダル
 * @param id 福利厚生ID
 * @param data 初期値データ
 */
export const WelfareInfoEditModal = ({ id, data }: Props) => {
  // ==================================================
  // コンテキスト・データ取得
  // ==================================================
  const { onRefresh } = useYearlyDetail();

  // ==================================================
  // 状態管理
  // ==================================================
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // ==================================================
  // フォームの初期化
  // ==================================================
  const form = useForm<CompanyDetailWelfareEditInput>({
    resolver: zodResolver(companyDetailWelfareEditSchema),
    defaultValues: {
      name: data.name,
      content: data.content ?? "",
    },
  });

  // ==================================================
  // 送信関数
  // ==================================================
  const onSubmit = async (values: CompanyDetailWelfareEditInput) => {
    const parseData = companyDetailWelfareEditSchema.safeParse(values);

    if (!parseData.success) {
      toast.error("入力に誤りがあります");
      return;
    }

    startTransition(async () => {
      try {
        await welfareEditAction(id, parseData.data);
        await onRefresh();
        toast.success("福利厚生を更新しました");
        setOpen(false);
      } catch (_error) {
        console.error("福利厚生の更新に失敗しました", _error);
        toast.error("福利厚生の更新に失敗しました");
      }
    });
  };

  // ==================================================
  // レンダリング
  // ==================================================
  return (
    <ClientOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-all active:scale-95"
            title="福利厚生を編集"
          >
            <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-140">
          <DialogTitle className="text-xl font-bold border-b pb-4">
            福利厚生の編集
          </DialogTitle>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">福利厚生名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="例：住宅手当"
                        className="focus-visible:ring-primary"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      福利厚生内容
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="例：家賃の30%を支給"
                        className="min-h-32 focus-visible:ring-primary resize-none leading-relaxed"
                        {...field}
                        value={field.value as string}
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
                  {isPending ? "更新中..." : "更新"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};
