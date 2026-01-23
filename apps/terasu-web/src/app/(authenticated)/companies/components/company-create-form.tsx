"use client";

// biome-ignore assist/source/organizeImports: <>
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createCompanyAction } from "@/actions/companies/list/create-company-action";
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
import {
  type CreateCompanyTypes,
  createCompanySchema,
} from "@terasu/schema/models/companySchema";

interface CompanyCreateFormProps {
  onSuccess?: () => void;
}

export function CompanyCreateForm({ onSuccess }: CompanyCreateFormProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: "",
    },
  });

  const processSubmit = async (
    data: CreateCompanyTypes,
    shouldRedirect: boolean,
  ) => {
    setIsPending(true);
    try {
      const result = await createCompanyAction(data);

      if (result.success && result.id) {
        toast.success(result.message || "企業を登録しました");
        form.reset();
        onSuccess?.();

        if (shouldRedirect) {
          router.push(`/companies/${result.id}`);
        }
      } else {
        // --- ここがポイント：UIへのフィードバック ---
        if (result.error?.includes("既に登録されています")) {
          // サーバーからの「重複エラー」を、nameフィールドのエラーとしてセットする
          form.setError("name", {
            type: "manual",
            message: result.error,
          });
          // 特定のフィールドエラーなので、toastは出さなくてもユーザーは気づける（お好みで）
        } else {
          // それ以外の予期せぬエラーは toast で通知
          toast.error(result.error || "登録に失敗しました");
        }
      }
    } catch (_error) {
      console.error("企業の作成に失敗しました", _error);
      toast.error("予期せぬエラーが発生しました");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => processSubmit(data, false))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">企業名</FormLabel>
              <FormControl>
                {/* エラーがある場合、shadcn/ui の Input は自動的に 
                  枠線が赤くなり、下の FormMessage にメッセージが表示されます。
                */}
                <Input
                  placeholder="例：株式会社テラス・イノベーション"
                  {...field}
                  disabled={isPending}
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            variant="outline"
            disabled={isPending}
            className="w-full sm:flex-1"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            登録して閉じる
          </Button>
          <Button
            type="button"
            onClick={form.handleSubmit((data) => processSubmit(data, true))}
            disabled={isPending}
            className="w-full sm:flex-1"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            登録して詳細へ
          </Button>
        </div>
      </form>
    </Form>
  );
}
