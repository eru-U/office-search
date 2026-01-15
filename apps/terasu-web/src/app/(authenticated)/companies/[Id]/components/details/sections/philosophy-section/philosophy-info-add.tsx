import { philosophyInfoAddAction } from "@/actions/companies/detail/philosophy-action/philosophy-info-add-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { companyDetailPhilosophySchema } from "@terasu/schema";
import type { companyDetailPhilosophyAddInput } from "@terasu/schema/models/companyDetailPhilosophySchema";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export const PhilosophyInfoAdd = () => {
  // ==================================================
  // データ取得
  // ==================================================
  const { onRefresh } = useYearlyDetail();
  const params = useParams();
  const companyId = params.Id as string;
  // ==================================================
  // 状態管理
  // ==================================================
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  // ==================================================
  // formの初期化
  // ==================================================
  const form = useForm<companyDetailPhilosophyAddInput>({
    resolver: zodResolver(
      companyDetailPhilosophySchema.companyDetailPhilosophyAddSchema,
    ),
    defaultValues: {
      content: "",
    },
  });
  // ==================================================
  // 送信関数の定義
  // ==================================================
  const onSubmit = async (values: companyDetailPhilosophyAddInput) => {
    try {
      const parseData =
        companyDetailPhilosophySchema.companyDetailPhilosophyAddSchema.safeParse(
          values,
        );
      if (!parseData.success) {
        toast.error("入力に誤りがあります");
        return;
      }
      startTransition(async () => {
        await philosophyInfoAddAction(companyId, parseData.data);
        await onRefresh();
        toast.success("企業理念情報を追加しました");
        setOpen(false);
      });
    } catch (_error) {
      toast.error("企業理念情報の追加に失敗しました");
    }
  };
  // ==================================================

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-1"
          title="企業理念情報を追加"
        >
          <Plus className="w-4 h-4" /> 追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>哲学情報の追加</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>desc.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-4 border-t">
              <Button
                disabled={isPending}
                type="submit"
                className="font-bold shadow-md hover:opacity-90 transition-opacity px-4"
              >
                {isPending ? "追加中..." : "追加"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
