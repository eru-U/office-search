"use client";

// biome-ignore assist/source/organizeImports: <>
import { welfareAddAction } from "@/actions/companies/detail/welfare-action/welfare-add-action";
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
  type CompanyDetailWelfareAddInput,
  companyDetailWelfareAddSchema,
} from "@terasu/schema/models/companyDetailWelfareSchema";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "../../shared/client-only";

interface Props {
  yearlyInfoId: string;
}

/**
 * 福利厚生追加用モーダル
 * @param yearlyInfoId 年代ID
 */
export const WelfareInfoAdd = ({ yearlyInfoId }: Props) => {
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
  // Zodのpreprocessによる型崩れを防ぐため、CompanyDetailWelfareAddTypesを指定
  const form = useForm<CompanyDetailWelfareAddInput>({
    resolver: zodResolver(companyDetailWelfareAddSchema),
    defaultValues: {
      name: "",
      content: "",
    },
  });

  // ==================================================
  // 送信関数
  // ==================================================
  const onSubmit = async (values: CompanyDetailWelfareAddInput) => {
    const parseData = companyDetailWelfareAddSchema.safeParse(values);

    if (!parseData.success) {
      toast.error("入力に誤りがあります");
      return;
    }

    startTransition(async () => {
      try {
        await welfareAddAction(yearlyInfoId, parseData.data);
        await onRefresh();
        toast.success("福利厚生を追加しました");
        form.reset(); // 追加後はフォームをリセット
        setOpen(false);
      } catch (_error) {
        console.error("福利厚生の追加に失敗しました", _error);
        toast.error("福利厚生の追加に失敗しました");
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
            variant="outline"
            size="sm"
            className="rounded-full gap-1 font-bold hover:bg-primary/5 transition-all active:scale-95"
            title="福利厚生情報を追加"
          >
            <Plus className="w-4 h-4" /> 追加
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-140">
          <DialogTitle className="text-xl font-bold border-b pb-4">
            福利厚生の追加
          </DialogTitle>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              {/* 福利厚生名 */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">福利厚生名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="例：住宅手当"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 内容 */}
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
                        // nullが混じっても大丈夫なように空文字へフォールバック
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
                  {isPending ? "追加中..." : "追加"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};
