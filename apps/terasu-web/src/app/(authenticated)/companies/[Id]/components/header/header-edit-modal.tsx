"use client";

// biome-ignore assist/source/organizeImports: <>
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

// 共有スキーマからインポート
import { headerEditAction } from "@/actions/companies/detail/header-action/header-edit";
import { companyDetailSchema } from "@terasu/schema";
import { useParams } from "next/navigation";

interface CompanyDetailHeaderEditModalProps {
  companyId: string;
  initialData: companyDetailSchema.CompanyDetailHeaderEditTypes;
}

/**
 * 企業ヘッダー情報の編集用モーダル
 * 共有スキーマ updateCompanyHeaderSchema を使用するようにリファクタリングしました。
 */
export function CompanyDetailHeaderEditModal({
  initialData,
}: CompanyDetailHeaderEditModalProps) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const companyId = params.Id as string;

  const form = useForm<companyDetailSchema.CompanyDetailHeaderEditTypes>({
    resolver: zodResolver(companyDetailSchema.companyDetailHeaderEditSchema),
    defaultValues: {
      // nameは必須なのでnull合体不要
      name: initialData.name,
      websiteUrl: initialData.websiteUrl ?? "",
    },
  });

  const onSubmit = async (
    values: companyDetailSchema.CompanyDetailHeaderEditTypes,
  ) => {
    await headerEditAction({
      id: companyId,
      name: values.name,
      websiteUrl: values.websiteUrl ?? "",
    });
    toast.success("ヘッダー情報を更新しました。");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-primary/10 transition-colors"
        >
          <Edit2 className="h-3 w-3 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black">
            ヘッダーの編集
          </DialogTitle>
          <DialogDescription>
            企業の基本名称と公式サイトのURLを更新します。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    企業名
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-11 rounded-xl border-slate-200 font-bold focus-visible:ring-primary"
                      value={field.value ?? ""}
                    />
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
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                    公式サイトURL
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="https://..."
                      className="h-11 rounded-xl border-slate-200 font-bold focus-visible:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 rounded-full font-black shadow-lg shadow-primary/20"
              >
                保存する
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
