// biome-ignore assist/source/organizeImports: <>
import { TrashButton } from "@/components/trash-button";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";
import { Edit2, Plus } from "lucide-react";
import type { YearlyDetailItem } from "../../types";

export const WelfareSection = ({ data }: { data: YearlyDetailItem }) => (
  <section className="space-y-6">
    <div className="flex items-center justify-between border-l-4 border-red-500 pl-4">
      <h2 className="text-2xl font-bold">福利厚生</h2>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full gap-1"
        onClick={() => console.log("Add Welfare")}
      >
        <Plus className="w-4 h-4" /> 追加
      </Button>
    </div>
    {data.welfares.length > 0 ? (
      <div className="space-y-4">
        {data.welfares.map((welfare) => (
          <div
            key={welfare.id}
            className="group relative p-6 border rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                {welfare.name}
              </h3>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => console.log("Edit Welfare:", welfare.id)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <TrashButton
                  onClick={() => console.log("Delete Welfare:", welfare.id)}
                />
              </div>
            </div>
            <p className="text-muted-foreground leading-loose pl-4">
              {welfare.content || "詳細は未登録です。"}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <Empty> ... </Empty>
    )}
  </section>
);
