"use client";

// biome-ignore assist/source/organizeImports: <>
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SearchCompanySchema, searchCompanySchema } from "@terasu/schema";
import {
  Banknote,
  Building2,
  Check,
  ChevronsUpDown,
  Search,
  Tag,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";

import { StarRating } from "@/components/star-rating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

interface CompanySearchProps {
  industries: { id: string; name: string }[];
}

export const CompanySearch = ({ industries = [] }: CompanySearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);

  const form = useForm<SearchCompanySchema>({
    resolver: zodResolver(searchCompanySchema),
    defaultValues: {
      aspirationLevel: Number(searchParams.get("aspirationLevel")) || 0,
      industryName: searchParams.get("industryName") || "",
      name: searchParams.get("name") || "",
      score: Number(searchParams.get("score")) || 0,
      yearSalary: Number(searchParams.get("yearSalary")) || 0,
    },
  });

  /**
   * 基本的にここで行うのはパスの変更だけ
   */
  const onSubmit = (data: SearchCompanySchema) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    // 検索時はページを1に戻す
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="search-filters" className="border-none">
        <Card className="shadow-none bg-gray-50/50 border-none">
          <AccordionTrigger className="px-4 py-2 hover:no-underline border rounded-lg bg-card">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Search className="w-4 h-4 text-blue-500" />
              <span>検索条件を指定する</span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <CardContent className="p-4 pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    {/* 企業名入力 */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs text-gray-500 font-bold ml-1">
                            企業名
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Building2 className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                              <Input
                                className="pl-9 h-9 text-sm"
                                placeholder="検索..."
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* 業界選択：Combobox（「指定なし」追加版） */}
                    <FormField
                      control={form.control}
                      name="industryName"
                      render={({ field }) => (
                        <FormItem className="space-y-1 flex flex-col">
                          <FormLabel className="text-xs text-gray-500 font-bold ml-1">
                            業界
                          </FormLabel>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full h-9 justify-between font-normal pl-3 pr-2 text-sm",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  <div className="flex items-center gap-2 truncate">
                                    <Tag className="h-4 w-4 text-gray-400 shrink-0" />
                                    {field.value
                                      ? industries.find(
                                          (i) => i.id === field.value,
                                        )?.name
                                      : "業界を選択..."}
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
                                <CommandInput placeholder="業界を検索..." />
                                <CommandList>
                                  <CommandEmpty>見つかりません</CommandEmpty>
                                  <CommandGroup>
                                    {/* --- 「指定なし」の選択肢を追加 --- */}
                                    <CommandItem
                                      value="all-industries"
                                      onSelect={() => {
                                        form.setValue("industryName", "");
                                        setOpen(false);
                                      }}
                                      className="text-blue-600 font-medium"
                                    >
                                      <X className="mr-2 h-4 w-4" />
                                      指定なし（全表示）
                                    </CommandItem>
                                    <CommandSeparator className="my-1" />
                                    {/* --------------------------------- */}
                                    {industries.map((industry) => (
                                      <CommandItem
                                        key={industry.id}
                                        value={industry.name}
                                        onSelect={() => {
                                          form.setValue(
                                            "industryName",
                                            industry.id,
                                          );
                                          setOpen(false);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            industry.id === field.value
                                              ? "opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                        {industry.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />

                    {/* 想定年収入力 */}
                    <FormField
                      control={form.control}
                      name="yearSalary"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs text-gray-500 font-bold ml-1">
                            想定年収
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Banknote className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                              <Input
                                className="pl-9 h-9 text-sm pr-12"
                                type="number"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value ? Number(e.target.value) : 0,
                                  )
                                }
                              />
                              <span className="absolute right-3 top-2.5 text-[10px] text-gray-400">
                                万円〜
                              </span>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* ボタン群 */}
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1 h-9 gap-2">
                        <Search className="w-4 h-4" />
                        検索
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-9 px-3 text-gray-500"
                        onClick={() => {
                          form.reset({
                            aspirationLevel: 0,
                            industryName: "",
                            name: "",
                            score: 0,
                            yearSalary: 0,
                          });
                        }}
                      >
                        リセット
                      </Button>
                    </div>
                  </div>

                  <hr className="border-gray-200" />

                  {/* 下段：志望度 & マッチング度 */}
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                    <FormField
                      control={form.control}
                      name="aspirationLevel"
                      render={({ field }) => (
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-500">
                            志望度:
                          </span>
                          <StarRating
                            value={field.value || 0}
                            onChange={field.onChange}
                            className="gap-0.5 scale-75 origin-left"
                          />
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="score"
                      render={({ field }) => (
                        <div className="flex items-center gap-4 flex-1 max-w-xs">
                          <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
                            マッチング度:{" "}
                            <span className="text-blue-600 ml-1">
                              {field.value || 0}%
                            </span>
                          </span>
                          <Slider
                            value={[field.value || 0]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            max={100}
                            step={5}
                            className="flex-1"
                          />
                        </div>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};
