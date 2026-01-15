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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  basicInfoEditSchema,
  type BasicInfoInput,
} from "@terasu/schema/models/companyDetailSchema";
import { Edit2 } from "lucide-react";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { YearlyDetailItem } from "../../types";

export const BasicInfoEditModal = ({ data }: { data: YearlyDetailItem }) => {
  // ========================================
  // フォームの初期化
  // ========================================
  const form = useForm<BasicInfoInput>({
    resolver: zodResolver(basicInfoEditSchema),
    defaultValues: {
      establishedDate: "",
      capital: "",
      representative: "",
      employeeCount: "",
      phoneNumber: "",
      revenue: "",
    },
  });
  // ========================================
  // 送信関数
  // ========================================
  const onSubmit = async (values: BasicInfoInput) => {
    try {
      const parseData = basicInfoEditSchema.safeParse(values);
      if (!parseData.success) {
        toast.error("入力に誤りがあります");
        return;
      }
      startTransition(() => {
        basicInfoEditAction(data.id, parseData.data);
      });
      toast.success("基本情報を更新しました");
    } catch (_error) {
      toast.error("基本情報の更新に失敗しました");
    }
  };
  // ========================================
  // ... (65行目までのロジックは一切変更なし)
  return (
    <Dialog>
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
                type="submit"
                className="w-25 font-bold shadow-md hover:opacity-90 transition-opacity"
              >
                保存する
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
