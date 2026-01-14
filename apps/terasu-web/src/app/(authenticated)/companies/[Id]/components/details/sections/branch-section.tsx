// biome-ignore assist/source/organizeImports: <>
import { TrashButton } from "@/components/trash-button";
import { Button } from "@/components/ui/button";
import { Edit2, MapPin, Plus } from "lucide-react";
import type { DetailDataTypes } from "../yearly-info";

export const BranchSection = ({ data }: { data: DetailDataTypes }) => (
  <section className="flex flex-col h-100">
    <div className="flex items-center justify-between border-l-4 border-blue-500 pl-4 mb-6 shrink-0">
      <h2 className="text-xl font-bold">拠点情報</h2>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => console.log("Add Branch")}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      {data.branches.map((branch) => (
        <div
          key={branch.id}
          className="group p-4 bg-background border rounded-2xl flex justify-between items-center gap-3 hover:border-blue-500/50 transition-colors shadow-sm mb-3"
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
            <span className="text-sm leading-snug">{branch.address}</span>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => console.log("Edit Branch:", branch.id)}
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
            <TrashButton
              onClick={() => console.log("Delete Branch:", branch.id)}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
);
