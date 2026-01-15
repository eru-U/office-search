"use client";
// biome-ignore assist/source/organizeImports: <>
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Calendar } from "lucide-react";
import type { YearDateData } from "./types";
import { YearlyInfoAddForm } from "./yearly-info-add-modal";

interface Props {
  fetchDateData: YearDateData[];
  selectedTabId: string;
  onTabChange: (id: string) => void;
  onRefresh: () => Promise<void>;
}

export const YearlyInfoTabs = ({
  fetchDateData,
  selectedTabId,
  onTabChange,
  onRefresh,
}: Props) => {
  if (fetchDateData.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center animate-in fade-in zoom-in-95 duration-500">
        <Empty className="w-full max-w-lg border-2 border-dashed rounded-[2.5rem] py-16">
          <EmptyHeader>
            <div className="flex justify-center mb-4 text-muted-foreground/30">
              <Calendar size={64} strokeWidth={1} />
            </div>
            <EmptyTitle>年度別データが存在しません</EmptyTitle>
            <EmptyDescription>
              まずは新しい年度データを追加してください。
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="mt-6 flex justify-center">
            <YearlyInfoAddForm onRefresh={onRefresh} isPrimary />
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b pb-4">
      <div className="flex flex-wrap gap-2 pt-4 items-center">
        {fetchDateData.map((item) => (
          <Button
            key={item.id}
            variant={selectedTabId === item.id ? "default" : "outline"}
            className="rounded-full px-6 transition-all"
            onClick={() => onTabChange(item.id)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {`${item.dataDate.getFullYear()}/${item.dataDate.getMonth() + 1}/${item.dataDate.getDate()}`}
          </Button>
        ))}
        <YearlyInfoAddForm onRefresh={onRefresh} />
      </div>
    </div>
  );
};
