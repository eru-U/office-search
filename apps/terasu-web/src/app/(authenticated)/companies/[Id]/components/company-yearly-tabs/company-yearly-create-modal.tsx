"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * バリデーションスキーマ（UIプレビュー用）
 */
const formSchema = z.object({
  dataDate: z.date({
    error: "日付を選択してください",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface CompanyYearlyCreateModalProps {
  trigger: React.ReactNode;
}

/**
 * 企業情報の対象年度（データ取得日）を登録するためのモーダル
 * ポップオーバーを上に表示するように調整しました。
 */
export function CompanyYearlyCreateModal({
  trigger,
}: CompanyYearlyCreateModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataDate: new Date(),
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log("年度データ登録（UIのみ実行）:", values);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-foreground">
            年度データの追加
          </DialogTitle>
          <DialogDescription className="text-sm">
            新しく企業情報を管理する年度（データ取得日）を選択してください。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-4"
          >
            <FormField
              control={form.control}
              name="dataDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-bold text-xs uppercase tracking-widest text-muted-foreground ml-1">
                    データ取得日 (年/月/日)
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-bold h-12 rounded-xl border-slate-200 hover:bg-slate-50 hover:border-primary/50 transition-all",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ja })
                          ) : (
                            <span>日付を選択してください</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-primary" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    {/* side="top" を指定してボタンの上に展開させます。
                      sideOffset={8} で少し隙間を開けて視認性を高めます。
                    */}
                    <PopoverContent
                      side="top"
                      sideOffset={8}
                      className="w-auto p-0 rounded-2xl border-none shadow-xl"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        locale={ja}
                        className="rounded-2xl"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                className="w-full h-12 rounded-full font-black text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
              >
                登録する
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
