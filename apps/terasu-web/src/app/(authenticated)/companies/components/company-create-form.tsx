"use client";

// biome-ignore assist/source/organizeImports: <>
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createCompanyAction } from "@/app/actions/companies/create-company-action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCompanySchema, type CreateCompanySchema } from "@terasu/schema";

interface CompanyCreateFormProps {
  onSuccess?: () => void;
}

export function CompanyCreateForm({ onSuccess }: CompanyCreateFormProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  // 1. react-hook-form の初期化
  const form = useForm<CreateCompanySchema>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
    },
  });

  /**
   * 登録処理のコアロジック
   */
  const onSubmit = async (
    data: CreateCompanySchema,
    shouldRedirect: boolean,
  ) => {
    setIsPending(true);
    try {
      const result = await createCompanyAction(data);

      if (result.success && result.id) {
        toast.success(result.message || "企業を登録しました");

        // フォームのリセットとモーダルを閉じる処理
        form.reset();
        onSuccess?.();

        if (shouldRedirect) {
          router.push(`/companies/${result.id}`);
        }
      } else {
        toast.error(result.error || "登録に失敗しました");
      }
    } catch (_error) {
      toast.error("予期せぬエラーが発生しました");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">企業名</FormLabel>
              <FormControl>
                <Input
                  placeholder="例：株式会社テラス・イノベーション"
                  {...field}
                  disabled={isPending}
                  autoFocus
                />
              </FormControl>
              {/* Zodのメッセージがここに出る */}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={form.handleSubmit((data) => onSubmit(data, false))}
            disabled={isPending}
            className="w-full sm:flex-1"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            登録して閉じる
          </Button>
          <Button
            type="button"
            onClick={form.handleSubmit((data) => onSubmit(data, true))}
            disabled={isPending}
            className="w-full sm:flex-1"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            登録して詳細へ
          </Button>
        </div>
      </form>
    </Form>
  );
}
