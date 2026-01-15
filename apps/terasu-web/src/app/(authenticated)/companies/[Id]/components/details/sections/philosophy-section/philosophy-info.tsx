import { TrashButton } from "@/components/trash-button";
import { Empty } from "@/components/ui/empty";
import type { YearlyDetailItem } from "../../types";
import { PhilosophyInfoAdd } from "./philosophy-info-add";
import { PhilosophyInfoEdit } from "./philosophy-info-edit";

export const PhilosophySection = ({ data }: { data: YearlyDetailItem }) => (
  <section className="space-y-6">
    <div className="flex items-center justify-between border-l-4 border-primary pl-4">
      <h2 className="text-2xl font-bold">企業理念</h2>
      <PhilosophyInfoAdd />
    </div>
    {data.company.philosophies.length > 0 ? (
      <div className="grid grid-cols-1 gap-4">
        {data.company.philosophies.map((philosophy) => (
          <div
            key={philosophy.id}
            className="group relative p-8 bg-muted/40 rounded-3xl italic text-lg text-center leading-relaxed"
          >
            「{philosophy.content || "未登録"}」
            <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <PhilosophyInfoEdit
                id={philosophy.id}
                initialContent={philosophy.content ?? ""}
              />
              <TrashButton
                onClick={() => console.log("Delete Philosophy:", philosophy.id)}
              />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <Empty> ... </Empty>
    )}
  </section>
);
