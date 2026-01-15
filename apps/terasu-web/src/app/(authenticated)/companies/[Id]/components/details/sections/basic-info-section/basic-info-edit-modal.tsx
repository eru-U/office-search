// biome-ignore assist/source/organizeImports: <>
import { basicInfoEditAction } from "@/actions/companies/detail/section-actions/basic-info-edit-action";
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
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  basicInfoEditSchema,
  type BasicInfoInput,
} from "@terasu/schema/models/companyDetailSchema";
import { Edit2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "../../shared/client-only";
import type { YearlyDetailItem } from "../../types";

export const BasicInfoEditModal = ({ data }: { data: YearlyDetailItem }) => {
  // ==================================================
  // コンテキストからデータ取得
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
  const form = useForm<BasicInfoInput>({
    resolver: zodResolver(basicInfoEditSchema),
    defaultValues: {
      establishedDate: data.company.establishedDate ?? "",
      capital: data.company.capital ?? "",
      representative: data.representative ?? "",
      employeeCount: data.employeeCount ?? "",
      phoneNumber: data.company.phoneNumber ?? "",
      revenue: data.revenue ?? "",
    },
  });
  // ==================================================
  // 送信関数
  // ==================================================
  const onSubmit = async (values: BasicInfoInput) => {
    try {
      const parseData = basicInfoEditSchema.safeParse(values);
      if (!parseData.success) {
        toast.error("入力に誤りがあります");
        return;
      }
      startTransition(async () => {
        await basicInfoEditAction(data.id, parseData.data);
        await onRefresh();
        toast.success("基本情報を更新しました");
        setOpen(false);
      });
    } catch (_error) {
      toast.error("基本情報の更新に失敗しました");
    }
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
            title="基本情報を編集"
          >
            <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-160">
          <DialogTitle className="text-xl font-bold border-b pb-4">
            基本情報の編集
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 設立日 */}
                <FormField
                  control={form.control}
                  name="establishedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">設立日</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value as string}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 資本金 */}
                <FormField
                  control={form.control}
                  name="capital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">資本金</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="例: 10000000"
                          {...field}
                          value={field.value as string}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 代表者名 */}
                <FormField
                  control={form.control}
                  name="representative"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">代表者名</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="姓名の間にスペース"
                          {...field}
                          value={field.value as string}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 従業員数 */}
                <FormField
                  control={form.control}
                  name="employeeCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">従業員数</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="例: 50"
                          {...field}
                          value={field.value as string}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 電話番号 */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">電話番号</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="03-1234-5678"
                          {...field}
                          value={field.value as string}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 売上高 */}
                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">売上高</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="例: 500000000"
                          {...field}
                          value={field.value as string}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="font-bold shadow-md hover:opacity-90 transition-opacity px-4"
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
