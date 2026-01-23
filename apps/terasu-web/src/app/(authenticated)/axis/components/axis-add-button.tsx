"use client";

import { axisAddAction } from "@/actions/axis/axis-add-action";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAxis } from "@/contexts/axis-context";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxisAddTypes } from "@terasu/schema/models/axis/axisAddSchema";
import { axisAddSchema } from "@terasu/schema/models/axis/axisAddSchema";
import { Plus } from "lucide-react";
import { useId, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

/**
 * 就活軸をダイアログ形式で追加するためのボタンコンポーネント。
 * 全てのラベルと入力要素を id / htmlFor で紐付け、UXを最適化しています。
 */
export const AxisAddButton = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { onRefresh } = useAxis();

  // 各要素のIDを生成（同一ページ内でのID衝突を防止します）
  const contentInputId = useId();
  const highPriorityId = useId();
  const mediumPriorityId = useId();
  const lowPriorityId = useId();

  const form = useForm<AxisAddTypes>({
    resolver: zodResolver(axisAddSchema),
    defaultValues: {
      content: "",
      priorityType: "MEDIUM",
    },
  });

  const onSubmit = (values: AxisAddTypes) => {
    startTransition(async () => {
      try {
        await axisAddAction(values);
        await onRefresh();
        toast.success("就活軸を追加しました");
        form.reset();
        setOpen(false);
      } catch (_error) {
        toast.error("登録に失敗しました。時間をおいて再度お試しください。");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-1 font-bold hover:bg-primary/5 transition-all active:scale-95"
          title="就活軸を追加"
        >
          <Plus className="w-4 h-4" /> 追加
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            就活軸の追加
          </DialogTitle>
          <DialogDescription>
            あなたのキャリアにおいて譲れない条件を言語化しましょう。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* 軸の内容入力エリア */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor={contentInputId}
                    className="font-bold text-slate-700 cursor-pointer"
                  >
                    軸の内容
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={contentInputId}
                      placeholder="例：エンジニアとしての技術研鑽ができる環境"
                      className="focus-visible:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 優先度選択エリア（ラジオボタン） */}
            <FormField
              control={form.control}
              name="priorityType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="font-bold text-slate-700">
                    優先ランク
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="HIGH" id={highPriorityId} />
                        </FormControl>
                        <Label
                          htmlFor={highPriorityId}
                          className="font-medium cursor-pointer flex-1"
                        >
                          Must (絶対条件)
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="MEDIUM"
                            id={mediumPriorityId}
                          />
                        </FormControl>
                        <Label
                          htmlFor={mediumPriorityId}
                          className="font-medium cursor-pointer flex-1"
                        >
                          Should (できれば)
                        </Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="LOW" id={lowPriorityId} />
                        </FormControl>
                        <Label
                          htmlFor={lowPriorityId}
                          className="font-medium cursor-pointer flex-1"
                        >
                          May (あれば尚良)
                        </Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* フッターアクション */}
            <div className="flex justify-end border-t pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="w-25 font-bold shadow-md hover:opacity-90 transition-opacity"
              >
                {isPending ? "登録中..." : "登録"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
