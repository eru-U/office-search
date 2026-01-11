"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * 基本情報編集用のバリデーションスキーマ（UIプレビュー用）
 */
const basicInfoSchema = z.object({
  establishedDate: z.date().optional(),
  capital: z.string().optional(),
  representative: z.string().optional(),
  employeeCount: z.string().optional(),
  phoneNumber: z.string().optional(),
  revenue: z.string().optional(),
});

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

interface BasicInfoEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: BasicInfoFormValues;
}

/**
 * 基本情報編集モーダルコンポーネント
 */
export function BasicInfoEditModal({
  open,
  onOpenChange,
  initialData,
}: BasicInfoEditModalProps) {
  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: initialData,
  });

  // 登録ボタン押下時の疑似処理
  const onSubmit = (values: BasicInfoFormValues) => {
    console.log("基本情報更新（UIのみ実行）:", values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            基本情報の編集
          </DialogTitle>
          <DialogDescription>
            企業の公開情報を最新の状態に更新しましょう。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-4"
          >
            {/* 設立年月日 (Popover + Calendar) */}
            <FormField
              control={form.control}
              name="establishedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    設立年月日
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-bold h-11 rounded-xl border-slate-200",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ja })
                          ) : (
                            <span>日付を選択</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 rounded-2xl border-none shadow-xl"
                      align="start"
                      side="top"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        locale={ja}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* 資本金 */}
              <FormField
                control={form.control}
                name="capital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      資本金
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="例: 50,000,000"
                        {...field}
                        className="h-11 rounded-xl border-slate-200 font-bold"
                      />
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
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                      社員数
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="例: 150"
                        {...field}
                        className="h-11 rounded-xl border-slate-200 font-bold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 代表者名 */}
            <FormField
              control={form.control}
              name="representative"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    代表者名
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="例: 山田 太郎"
                      {...field}
                      className="h-11 rounded-xl border-slate-200 font-bold"
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
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    電話番号
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="例: 03-xxxx-xxxx"
                      {...field}
                      className="h-11 rounded-xl border-slate-200 font-bold"
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
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    売上高
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="例: 1,000,000,000"
                      {...field}
                      className="h-11 rounded-xl border-slate-200 font-bold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 rounded-full font-black shadow-lg shadow-primary/20"
              >
                <Save className="mr-2 h-4 w-4" />
                変更を保存
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
