// src/components/companies/detail/contact-info-add.tsx
// biome-ignore assist/source/organizeImports: <>
import { contactInfoAddAction } from "@/actions/companies/detail/contant-action/contact-add-action";
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
import {
  companyDetailContactSchema,
  type CompanyDetailContactTypes,
} from "@terasu/schema/models/companyDetailContactSchema";
import { Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "../../shared/client-only";

interface Props {
  yearlyInfoId: string;
}

export const ContactInfoAdd = ({ yearlyInfoId }: Props) => {
  const { onRefresh } = useYearlyDetail();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(companyDetailContactSchema),
    defaultValues: {
      name: "",
      position: "",
      description: "",
    },
  });

  const onSubmit = async (values: CompanyDetailContactTypes) => {
    // zodResolverが検証済みですが、安全のために残しています
    const parseData = companyDetailContactSchema.safeParse(values);

    if (!parseData.success) {
      toast.error("入力内容を確認してください");
      return;
    }

    startTransition(async () => {
      try {
        await contactInfoAddAction(yearlyInfoId, parseData.data);
        await onRefresh();
        toast.success("人物情報を追加しました");
        form.reset();
        setOpen(false);
      } catch (_error) {
        console.error("人物情報の保存に失敗しました", _error);
        toast.error("保存中にエラーが発生しました");
      }
    });
  };

  return (
    <ClientOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full gap-1 font-bold hover:bg-primary/5 transition-all active:scale-95"
            title="人物情報を追加"
          >
            <Plus className="w-4 h-4" /> 追加
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-140">
          <DialogTitle className="text-xl font-bold border-b pb-4">
            人物情報の追加
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 mt-6"
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

              <div className="flex justify-end pt-4 border-t gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                >
                  キャンセル
                </Button>
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-25 font-bold shadow-md hover:opacity-90 transition-opacity"
                >
                  {isPending ? "保存中..." : "保存する"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};
