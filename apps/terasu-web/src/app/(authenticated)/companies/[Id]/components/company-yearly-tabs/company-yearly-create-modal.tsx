"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

// 共有スキーマからインポート
import {
  createCompanyYearlyInfoSchema,
  type CreateCompanyYearlyInfoSchema,
} from "@terasu/schema";

interface CompanyYearlyCreateModalProps {
  trigger: React.ReactNode;
}

/**
 * 企業情報の対象年度を登録するためのモーダル
 * 共有スキーマ createCompanyYearlyInfoSchema を使用。
 */
export function CompanyYearlyCreateModal({
  trigger,
}: CompanyYearlyCreateModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateCompanyYearlyInfoSchema>({
    resolver: zodResolver(createCompanyYearlyInfoSchema),
    defaultValues: {
      dataDate: new Date(),
    },
  });

  const onSubmit = (values: CreateCompanyYearlyInfoSchema) => {
    console.log("Create Yearly Record (UI only):", values);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            年度データの追加
          </DialogTitle>
          <DialogDescription className="text-sm">
            新しい年度（データ取得日）を選択してください。
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
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    データ取得日
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-bold h-12 rounded-xl border-slate-200",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ja })
                          ) : (
                            <span>日付を選択</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-primary" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
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
                        disabled={(date) => date > new Date()}
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

            <DialogFooter>
              <Button
                type="submit"
                className="w-full h-12 rounded-full font-black shadow-lg shadow-primary/20"
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
