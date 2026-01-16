// biome-ignore assist/source/organizeImports: <>
import { branchAddAction } from "@/actions/companies/detail/branch-action/branch-add-action";
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
import { Textarea } from "@/components/ui/textarea";
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyDetailBranchSchema,
  type CompanyDetailBranchTypes,
} from "@terasu/schema/models/companyDetailBranchSchema";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "../../shared/client-only";

export const BranchInfoAdd = () => {
  // ==================================================
  // コンテキスト・データ取得
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
  // フォームの初期化
  // ==================================================
  const form = useForm<CompanyDetailBranchTypes>({
    resolver: zodResolver(companyDetailBranchSchema),
    defaultValues: {
      address: "",
    },
  });

  // ==================================================
  // 送信関数
  // ==================================================
  const onSubmit = async (values: CompanyDetailBranchTypes) => {
    const parseData = companyDetailBranchSchema.safeParse(values);

    if (!parseData.success) {
      toast.error("入力に誤りがあります");
      return;
    }

    startTransition(async () => {
      try {
        await branchAddAction(companyId, parseData.data);
        await onRefresh();
        toast.success("支店情報を追加しました");
        form.reset(); // 追加後はフォームを空にする
        setOpen(false);
      } catch (_error) {
        toast.error("支店情報の追加に失敗しました");
      }
    });
  };

  // ==================================================

  return (
    <ClientOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-1 font-bold hover:bg-primary/5 transition-all active:scale-95"
            title="企業理念情報を追加"
          >
            <Plus className="w-4 h-4" /> 追加
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-140">
          <DialogTitle className="text-xl font-bold border-b pb-4">
            企業理念の追加
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">支店住所</FormLabel>
                    <FormControl>
                      {/* 支店住所は複数行になることが多いのでTextareaにしています */}
                      <Textarea
                        placeholder="例：東京都千代田区丸の内1-1-1"
                        className="min-h-30 focus-visible:ring-primary resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4 border-t">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-25 font-bold shadow-md hover:opacity-90 transition-opacity"
                >
                  {isPending ? "追加中..." : "追加"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};
