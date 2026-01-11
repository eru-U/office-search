"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { CalendarIcon, Save } from "lucide-react";
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

// 共有スキーマからインポート
import {
  updateBasicInfoSchema,
  type UpdateBasicInfoSchema,
} from "@terasu/schema";

interface BasicInfoEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: UpdateBasicInfoSchema;
}

/**
 * 基本情報編集モーダル
 * 共有スキーマ updateBasicInfoSchema を使用。
 */
export function BasicInfoEditModal({
  open,
  onOpenChange,
  initialData,
}: BasicInfoEditModalProps) {
  const form = useForm<UpdateBasicInfoSchema>({
    resolver: zodResolver(updateBasicInfoSchema),
    defaultValues: initialData,
  });

  const onSubmit = (values: UpdateBasicInfoSchema) => {
    console.log("Basic Info Update (UI only):", values);
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
            企業の公開情報を最新の状態に更新します。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-4"
          >
            {/* 設立年月日 */}
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
                        selected={field.value ?? undefined}
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
                        placeholder="500,000,000"
                        {...field}
                        value={field.value ?? ""}
                        className="h-11 rounded-xl border-slate-200 font-bold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="150"
                        {...field}
                        value={field.value ?? ""}
                        className="h-11 rounded-xl border-slate-200 font-bold"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      placeholder="田中 太郎"
                      {...field}
                      value={field.value ?? ""}
                      className="h-11 rounded-xl border-slate-200 font-bold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="03-xxxx-xxxx"
                      {...field}
                      value={field.value ?? ""}
                      className="h-11 rounded-xl border-slate-200 font-bold"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="1,300,000,000"
                      {...field}
                      value={field.value ?? ""}
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
                className="w-full h-12 rounded-full font-black shadow-lg shadow-primary/20 transition-transform active:scale-95"
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
