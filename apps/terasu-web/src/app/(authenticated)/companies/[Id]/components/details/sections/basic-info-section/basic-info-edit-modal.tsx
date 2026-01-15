"use client";

// biome-ignore assist/source/organizeImports: <>
import { basicInfoEditAction } from "@/actions/companies/detail/section-actions/basic-info-edit-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import { companyDetailSchema } from "@terasu/schema";
import { Edit2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "../../shared/client-only";
import type { YearlyDetailItem } from "../../types";

interface Props {
  data: YearlyDetailItem;
  onRefresh: () => Promise<void>;
}

export const BasicInfoEditModal = ({ data, onRefresh }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // フォームの初期化（既存のデータを input が扱える形式に変換）
  const form = useForm<companyDetailSchema.BasicInfoInput>({
    resolver: zodResolver(companyDetailSchema.basicInfoEditSchema),
    defaultValues: {
      establishedDate: data.company.establishedDate
        ? new Date(data.company.establishedDate).toISOString().split("T")[0]
        : "",
      capital: data.company.capital?.toString() ?? "",
      representative: data.representative ?? "",
      employeeCount: data.employeeCount?.toString() ?? "",
      phoneNumber: data.company.phoneNumber ?? "",
      revenue: data.revenue?.toString() ?? "",
    },
  });

  const onSubmit = (values: companyDetailSchema.BasicInfoOutput) => {
    startTransition(async () => {
      try {
        await basicInfoEditAction(data.id, values);
        toast.success("基本情報を更新しました");
        await onRefresh();
        setOpen(false);
      } catch (_error) {
        toast.error("更新に失敗しました");
      }
    });
  };

  return (
    <ClientOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="基本情報を編集"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-100 rounded-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">基本情報の編集</DialogTitle>
            <DialogDescription>
              企業の核となる情報を最新の状態にアップデートします。
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 設立年月日 */}
                <FormField
                  control={form.control}
                  name="establishedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold ml-1 uppercase">設立年月日</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-11 rounded-xl" />
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
                      <FormLabel className="text-[10px] font-bold ml-1 uppercase">代表者名</FormLabel>
                      <FormControl>
                        <Input placeholder="代表 太郎" {...field} className="h-11 rounded-xl" />
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
                      <FormLabel className="text-[10px] font-bold ml-1 uppercase">資本金 (円)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="10000000" {...field} className="h-11 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 社員数 */}
                <FormField
                  control={form.control}
                  name="employeeCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-bold ml-1 uppercase">社員数 (名)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50" {...field} className="h-11 rounded-xl" />
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
                      <FormLabel className="text-[10px] font-bold ml-1 uppercase">電話番号</FormLabel>
                      <FormControl>
                        <Input placeholder="03-xxxx-xxxx" {...field} className="h-11 rounded-xl" />
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
                      <FormLabel className="text-[10px] font-bold ml-1 uppercase">売上高 (円)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="500000000" {...field} className="h-11 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-12 rounded-full font-black mt-2 shadow-lg"
              >
                {isPending ? "更新中..." : "変更を保存する"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};