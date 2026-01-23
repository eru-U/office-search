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
import { headerEditAction } from "@/actions/companies/detail/header-action/header-edit-action";
import {
  companyDetailHeaderEditSchema,
  type CompanyDetailHeaderEditTypes,
} from "@terasu/schema/models/companyDetailHeaderSchema";
import { useParams } from "next/navigation";
import { ClientOnly } from "../details/shared/client-only";

interface CompanyDetailHeaderEditModalProps {
  companyId: string;
  initialData: CompanyDetailHeaderEditTypes;
}

export function CompanyDetailHeaderEditModal({
  initialData,
}: CompanyDetailHeaderEditModalProps) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const companyId = params.Id as string;

  const form = useForm({
    resolver: zodResolver(companyDetailHeaderEditSchema),
    defaultValues: {
      name: initialData.name,
      websiteUrl: initialData.websiteUrl ?? "",
    },
  });

  const onSubmit = async (values: CompanyDetailHeaderEditTypes) => {
    await headerEditAction({
      id: companyId,
      name: values.name,
      websiteUrl: values.websiteUrl ?? "",
    });
    toast.success("ヘッダー情報を更新しました。");
    setOpen(false);
  };

  return (
    <ClientOnly>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-all active:scale-95"
            title="ヘッダーを編集"
          >
            <Edit2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-120">
          <DialogTitle className="text-xl font-bold border-b pb-4">
            ヘッダーの編集
          </DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-6"
            >
              <div className="space-y-6">
                {/* 企業名 */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">企業名</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="株式会社テラス"
                          {...field}
                          value={field.value ?? ""}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 公式サイトURL */}
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        公式サイトURL
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com"
                          {...field}
                          value={field.value ?? ""}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  className="w-25 font-bold shadow-md hover:opacity-90 transition-opacity"
                >
                  保存する
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
}
