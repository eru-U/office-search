"use client";

// biome-ignore assist/source/organizeImports: <>
import { profileTechStackAddAction } from "@/actions/profile/profile-techStack-action";
import { createTechStackAction } from "@/actions/tech-stack/create-tech-stack-action";
import { getTechStacksAction } from "@/actions/tech-stack/get-tech-stacks-action";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useProfile } from "@/contexts/profile-context";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileTechStackCreateSchema,
  type ProfileTechStackCreateTypes,
} from "@terasu/schema/models/profiles/profileTechStackSchema";
import { Check, ChevronsUpDown, Code, Plus } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddTechStackButton = () => {
  // ==================================================
  // コンテキスト取得
  // ==================================================
  const { onRefresh } = useProfile();

  // ==================================================
  // 状態管理
  // ==================================================
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [techStacks, setTechStacks] = useState<
    { label: string; value: string }[]
  >([]);

  // ==================================================
  // 技術スタック一覧の取得
  // ==================================================
  // useCallbackでメモ化することで、関数の参照を固定し、依存配列のエラーを解消します。
  const fetchTechStacks = useCallback(async () => {
    const result = await getTechStacksAction();
    if (result.success) {
      setTechStacks(result.data);
    }
  }, []);

  useEffect(() => {
    fetchTechStacks();
  }, [fetchTechStacks]);

  // ==================================================
  // フォームの初期化
  // ==================================================
  const form = useForm({
    resolver: zodResolver(profileTechStackCreateSchema),
    defaultValues: {
      techStackId: "",
      startedAt: undefined,
      note: "",
    },
  });

  // ==================================================
  // 新しい技術スタックを登録する関数
  // ==================================================
  const handleCreateTechStack = async (name: string) => {
    if (!name.trim()) {
      toast.error("技術スタック名を入力してください");
      return;
    }

    try {
      const result = await createTechStackAction(name.trim());

      if (result.success && result.data) {
        toast.success(`「${name}」を技術スタックマスタに登録しました`);
        // 技術スタック一覧を再取得
        await fetchTechStacks();
        // フォームに新しく作成した技術スタックのIDをセット
        form.setValue("techStackId", result.data.id);
        setComboboxOpen(false);
        setSearchValue("");
      } else {
        toast.error(result.error || "技術スタックの登録に失敗しました");
      }
    } catch (_error) {
      console.error("技術スタックの登録に失敗しました", _error);
      toast.error("技術スタックの登録に失敗しました");
    }
  };

  // ==================================================
  // 送信関数
  // ==================================================
  const onSubmit = async (values: ProfileTechStackCreateTypes) => {
    const parseData = profileTechStackCreateSchema.safeParse(values);

    if (!parseData.success) {
      toast.error("入力に誤りがあります");
      return;
    }

    startTransition(async () => {
      try {
        await profileTechStackAddAction(parseData.data);
        await onRefresh();
        toast.success("技術スタックを追加しました");
        form.reset();
        setOpen(false);
      } catch (_error) {
        console.error("技術スタックの追加に失敗しました", _error);
        toast.error("技術スタックの追加に失敗しました");
      }
    });
  };

  // ==================================================
  // レンダリング
  // ==================================================
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-1 font-bold hover:bg-primary/5 transition-all active:scale-95"
          title="技術スタックを追加"
        >
          <Plus className="w-4 h-4" /> 追加
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-140">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold border-b pb-4">
            技術スタックの追加
          </DialogTitle>
          <DialogDescription>
            新しい技術スタックを追加して、あなたの経験を最新の状態に保ちましょう。
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            {/* 技術スタック選択：ComboBox */}
            <FormField
              control={form.control}
              name="techStackId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-semibold">技術スタック</FormLabel>
                  <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Code className="h-4 w-4 text-gray-400 shrink-0" />
                            {field.value
                              ? techStacks.find(
                                  (ts) => ts.value === field.value,
                                )?.label
                              : "技術スタックを選択..."}
                          </div>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[--radix-popover-trigger-width] p-0"
                      align="start"
                    >
                      <Command>
                        <CommandInput
                          placeholder="技術スタックを検索..."
                          value={searchValue}
                          onValueChange={setSearchValue}
                        />
                        <CommandList>
                          <CommandEmpty>
                            <div className="py-6 text-center">
                              <p className="text-sm text-muted-foreground mb-3">
                                「{searchValue}」は見つかりません
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleCreateTechStack(searchValue)
                                }
                                className="gap-2"
                              >
                                <Plus className="h-4 w-4" />「{searchValue}
                                」を新規登録
                              </Button>
                            </div>
                          </CommandEmpty>
                          <CommandGroup>
                            {techStacks.map((techStack) => (
                              <CommandItem
                                key={techStack.value}
                                value={techStack.label}
                                onSelect={() => {
                                  form.setValue("techStackId", techStack.value);
                                  setComboboxOpen(false);
                                  setSearchValue("");
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    techStack.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {techStack.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 開始日 */}
            <FormField
              control={form.control}
              name="startedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">開始日</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="focus-visible:ring-primary"
                      value={
                        field.value
                          ? new Date(
                              field.value.getTime() -
                                field.value.getTimezoneOffset() * 60000,
                            )
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={(e) => {
                        const dateValue = e.target.value;
                        field.onChange(
                          dateValue ? new Date(dateValue) : undefined,
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* メモ */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">メモ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="具体的な実績や使用感を記載してください"
                      className="min-h-32 focus-visible:ring-primary resize-none"
                      {...field}
                      value={field.value as string}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* フッターアクション */}
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
                {isPending ? "追加中..." : "追加"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
