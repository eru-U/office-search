// apps/terasu-web/src/app/(authenticated)/companies/[Id]/components/salary-info/salary-modal-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Banknote,
  Check,
  ChevronsUpDown,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { updateSalarySchema, type UpdateSalarySchema } from "@terasu/schema";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const salaryCategories = [
  { value: "1", label: "年収制" },
  { value: "2", label: "月収制" },
  { value: "3", label: "時給制" },
];

interface SalaryInfoEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: UpdateSalarySchema;
}

export function SalaryInfoEditModal({
  open,
  onOpenChange,
  initialData,
}: SalaryInfoEditModalProps) {
  const [comboOpen, setComboOpen] = React.useState(false);

  const form = useForm<UpdateSalarySchema>({
    resolver: zodResolver(updateSalarySchema),
    defaultValues: {
      salaryCategoryId: initialData.salaryCategoryId,
      baseSalary: initialData.baseSalary ?? "",
      bonusTimesPerYear: initialData.bonusTimesPerYear ?? "",
      bonusMonths: initialData.bonusMonths ?? "",
      allowances: initialData.allowances ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "allowances",
  });

  async function onSubmit(values: UpdateSalarySchema) {
    console.log("Salary Update Submission:", values);
    toast.success("給与情報を更新しました");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[90vh] rounded-3xl border-none shadow-2xl overflow-hidden p-0 flex flex-col bg-white">
        <DialogHeader className="p-6 pb-2 shrink-0">
          <DialogTitle className="text-xl font-black">
            給与情報の編集
          </DialogTitle>
          <DialogDescription>
            基本給や賞与、各種手当の詳細を設定します。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col min-h-0 overflow-hidden"
          >
            {/* 上部固定エリア */}
            <div className="px-6 py-4 space-y-5 shrink-0 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salaryCategoryId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-1">
                        給与体制
                      </FormLabel>
                      <Popover open={comboOpen} onOpenChange={setComboOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full pl-3 text-left font-bold h-11 rounded-xl border-slate-200 justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? salaryCategories.find(
                                    (cat) => cat.value === field.value,
                                  )?.label
                                : "体制を選択"}
                              <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-[200px] p-0 rounded-2xl border-none shadow-xl"
                          align="start"
                        >
                          <Command>
                            <CommandInput
                              placeholder="体制を検索..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>見つかりません</CommandEmpty>
                              <CommandGroup>
                                {salaryCategories.map((cat) => (
                                  <CommandItem
                                    value={cat.label}
                                    key={cat.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "salaryCategoryId",
                                        cat.value,
                                      );
                                      setComboOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        cat.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {cat.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="baseSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        基本給
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value ?? ""}
                          placeholder="250000"
                          className="h-11 rounded-xl border-slate-200 font-bold text-right"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bonusTimesPerYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        賞与 (回/年)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          value={field.value ?? ""}
                          className="h-11 rounded-xl border-slate-200 font-bold"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bonusMonths"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                        賞与 (ヶ月分)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="0.1"
                          value={field.value ?? ""}
                          className="h-11 rounded-xl border-slate-200 font-bold"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between shrink-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  諸手当の詳細
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: "", amount: "" })}
                  className="h-7 gap-1 text-[10px] font-bold rounded-full border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  <Plus className="h-3 w-3" /> 手当を追加
                </Button>
              </div>
            </div>

            {/* スクロールエリア */}
            <ScrollArea className="flex-1 min-h-0 bg-slate-50/30">
              <div className="px-6 min-h-full flex flex-col">
                {fields.length > 0 ? (
                  <div className="space-y-3 pb-2">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex gap-2 items-center animate-in fade-in slide-in-from-top-1 duration-200"
                      >
                        <div className="flex-1 grid grid-cols-2 gap-2 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm">
                          <FormField
                            control={form.control}
                            name={`allowances.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="space-y-0">
                                <FormLabel className="text-[9px] font-bold text-slate-400 ml-1">
                                  手当名
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="住宅手当"
                                    className="h-8 border-none bg-transparent font-bold text-sm focus-visible:ring-0 shadow-none px-1"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`allowances.${index}.amount`}
                            render={({ field }) => (
                              <FormItem className="space-y-0 text-right">
                                <FormLabel className="text-[9px] font-bold text-slate-400 mr-1">
                                  金額
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="number"
                                    className="h-8 border-none bg-transparent font-bold text-sm text-right focus-visible:ring-0 shadow-none px-1"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="h-10 w-10 rounded-full text-slate-400 hover:text-destructive shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Emptyコンポーネントの調整版：高さを抑えて中央配置 */
                  <div className="flex-1 flex items-center justify-center">
                    <Empty className="bg-transparent border-none shadow-none p-0">
                      <EmptyHeader className="">
                        <EmptyMedia
                          variant="icon"
                          className="bg-slate-100w-12 mx-auto"
                        >
                          <Banknote className="text-slate-400 h-6 w-6" />
                        </EmptyMedia>
                        <EmptyTitle className="text-sm font-black text-slate-600">
                          現在手当はありません
                        </EmptyTitle>
                        <EmptyDescription className="text-[10px] font-bold text-muted-foreground leading-tight">
                          住宅手当や通勤手当などの
                          <br />
                          諸手当を追加してみましょう。
                        </EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => append({ name: "", amount: "" })}
                          className="h-8 rounded-full font-bold text-[10px] px-4"
                        >
                          <Plus className="w-3 mr-1" />
                          最初の手当を追加
                        </Button>
                      </EmptyContent>
                    </Empty>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* フッター */}
            <DialogFooter className="p-6 bg-white border-t shrink-0">
              <Button
                type="submit"
                className="w-full h-12 rounded-full font-black shadow-lg shadow-primary/20 text-lg transition-transform active:scale-95"
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
