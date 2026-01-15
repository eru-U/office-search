"use client";

// biome-ignore assist/source/organizeImports: <>
import { yearlyDataCreate } from "@/actions/companies/detail/yearly-data-create";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { companyDetailSchema } from "@terasu/schema";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ClientOnly } from "./shared/client-only";

interface Props {
  onRefresh: () => Promise<void>;
  isPrimary?: boolean;
}

export const YearlyInfoAddForm = ({ onRefresh, isPrimary }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const companyId = params.Id as string;

  const form = useForm<companyDetailSchema.YearlyAddTypes>({
    resolver: zodResolver(companyDetailSchema.yearlyAddSchema),
    defaultValues: { dataDate: "" },
  });

  const onSubmit = (values: companyDetailSchema.YearlyAddTypes) => {
    startTransition(async () => {
      try {
        const date = new Date(values.dataDate);
        await yearlyDataCreate(companyId, date);
        toast.success("年度を追加しました");
        await onRefresh();
        form.reset();
        setOpen(false);
      } catch (_error) {
        toast.error("登録できませんでした");
      }
    });
  };

  // ... (65行目までのロジックは一切変更なし)
  return (
    <ClientOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {isPrimary ? (
            <Button
              size="lg"
              className="rounded-full px-8 font-bold gap-2 shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" /> 最初の年度を作成
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all active:scale-95"
              title="新しい年度を追加"
            >
              <Plus className="w-5 h-5 text-muted-foreground" />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-120">
          <DialogTitle className="text-xl font-bold border-b pb-4">
            年度の新規追加
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <FormField
                control={form.control}
                name="dataDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      対象年度の日付
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-40 font-bold shadow-md hover:opacity-90 transition-opacity"
                >
                  {isPending ? "作成中..." : "年度を作成する"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};
