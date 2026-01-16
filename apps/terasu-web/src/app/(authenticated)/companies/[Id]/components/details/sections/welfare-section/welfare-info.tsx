import { Empty } from "@/components/ui/empty";
import type { YearlyDetailItem } from "../../types";
import { WelfareDelete } from "./philosophy-info-delete";
import { WelfareInfoAdd } from "./welfare-info-add-modal";
import { WelfareInfoEditModal } from "./welfare-info-edit-modal";

export const WelfareSection = ({ data }: { data: YearlyDetailItem }) => (
  <section className="space-y-6">
    <div className="flex items-center justify-between border-l-4 border-red-500 pl-4">
      <h2 className="text-2xl font-bold">福利厚生</h2>
      <WelfareInfoAdd yearlyInfoId={data.id} />
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
                <WelfareInfoEditModal id={welfare.id} data={welfare} />
                <WelfareDelete id={welfare.id} />
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
