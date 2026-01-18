// biome-ignore assist/source/organizeImports: <>
import { contactInfoEditAction } from "@/actions/companies/detail/contant-action/contact-edit-action";
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
import { Textarea } from "@/components/ui/textarea";
import { useYearlyDetail } from "@/contexts/YearlyDetailContext";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  CompanyDetailContactInput,
  CompanyDetailContactTypes,
} from "@terasu/schema/models/companyDetailContactSchema";
import { companyDetailContactSchema } from "@terasu/schema/models/companyDetailContactSchema";
import { Edit2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "../../shared/client-only";

interface Props {
  id: string; // 人物情報ID
  initialContent: CompanyDetailContactTypes;
}

export const ContactInfoEdit = ({ id, initialContent }: Props) => {
  // ==================================================
  // コンテキスト・状態管理
  // ==================================================
  const { onRefresh } = useYearlyDetail();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // ==================================================
  // フォームの初期化
  // ==================================================
  const form = useForm<CompanyDetailContactInput>({
    resolver: zodResolver(companyDetailContactSchema),
    defaultValues: {
      name: initialContent.name ?? "",
      position: initialContent.position ?? "",
      description: initialContent.description ?? "",
    },
  });

  // ==================================================
  // 送信関数
  // ==================================================
  const onSubmit = async (values: CompanyDetailContactInput) => {
    const parseData = companyDetailContactSchema.safeParse(values);

    if (!parseData.success) {
      toast.error("入力に誤りがあります");
      return;
    }

    startTransition(async () => {
      try {
        await contactInfoEditAction(id, parseData.data);
        await onRefresh();
        toast.success("連絡先情報を更新しました");
        setOpen(false);
      } catch (_error) {
        console.error("連絡先情報の更新に失敗しました", _error);
        toast.error("連絡先情報の更新に失敗しました");
      }
    });
  };

  // ==================================================

  return (
    <ClientOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-all active:scale-95"
            title="連絡先情報を編集"
          >
            <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-140">
          <DialogTitle className="text-xl font-bold border-b pb-4">
            連絡先情報の編集
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        氏名
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="例：山田 太郎"
                          className="focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-sm">
                        役職
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="例：代表取締役"
                          className="focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-sm">
                      詳細・備考
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="経歴や特徴などを入力してください"
                        className="min-h-32 focus-visible:ring-primary resize-none"
                        {...field}
                        value={(field.value as string) ?? ""}
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
                  {isPending ? "保存中..." : "保存"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};
