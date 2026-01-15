// biome-ignore assist/source/organizeImports: <>
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Calendar} from "lucide-react";
import { YearlyInfoAddForm } from "./yearly-info-add-modal";

interface Props {
  fetchDateData: { id: string; dataDate: Date }[];
  selectedTabId: string;
  setSelectedTabId: (id: string) => void;
  tabChange: (value: string) => Promise<void>;
}

export const YearlyInfoTabs = ({
  fetchDateData,
  selectedTabId,
  setSelectedTabId,
  tabChange,
}: Props) => {
  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b pb-4">
      <div className="flex flex-wrap gap-2 pt-4 items-center">
        {fetchDateData.length === 0 ? (
          <div className="min-h-[calc(100vh-230px)] flex justify-center items-center">
            <Empty>
              <EmptyHeader>
                <EmptyTitle>年度別データが存在しません</EmptyTitle>
                <EmptyDescription>
                  まずは新しい年度データを追加してください。
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <YearlyInfoAddForm />
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          <div>
            {fetchDateData.map((item) => (
              <Button
                key={item.id}
                variant={selectedTabId === item.id ? "default" : "outline"}
                className="rounded-full px-6 transition-all mr-2"
                onClick={() => {
                  setSelectedTabId(item.id);
                  tabChange(item.id);
                }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {item.dataDate.getFullYear()}年度
              </Button>
            ))}
            <YearlyInfoAddForm />
          </div>
        )}
      </div>
    </div>
  );
};
