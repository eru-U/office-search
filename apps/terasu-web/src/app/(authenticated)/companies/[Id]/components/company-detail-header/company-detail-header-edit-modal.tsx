"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { updateCompanyHeaderAction } from "@/app/actions/companies/detail/update-company-header-action";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, "企業名は必須です"),
  websiteUrl: z
    .string()
    .url("有効なURLを入力してください")
    .or(z.literal(""))
    .nullable(),
});

type FormValues = z.infer<typeof formSchema>;

interface CompanyDetailHeaderEditModalProps {
  companyId: string;
  initialData: {
    name: string;
    websiteUrl: string | null;
  };
}

/**
 * 企業ヘッダー情報の編集用モーダル
 */
export function CompanyDetailHeaderEditModal({
  companyId,
  initialData,
}: CompanyDetailHeaderEditModalProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      websiteUrl: initialData.websiteUrl || "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsPending(true);
    const result = await updateCompanyHeaderAction({
      id: companyId,
      ...values,
    });

    if (result.success) {
      toast.success(result.message);
      setOpen(false);
    } else {
      if (result.error?.includes("既に他の登録で使用されています")) {
        form.setError("name", { message: result.error });
      } else {
        toast.error(result.error);
      }
    }
    setIsPending(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-primary/10"
        >
          <Edit2 className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ヘッダー情報の編集</DialogTitle>
          <DialogDescription>
            企業の基本名称と公式サイトのURLを更新します。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>企業名</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>公式サイトURL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="https://..."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                保存する
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
