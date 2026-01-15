// biome-ignore assist/source/organizeImports: <>
import { TrashButton } from "@/components/trash-button";
import { Button } from "@/components/ui/button";
import { Contact2, Edit2, Plus } from "lucide-react";
import type { YearlyDetailItem } from "../types";

export const ContactSection = ({ data }: { data: YearlyDetailItem }) => (
  <section className="flex flex-col h-100">
    <div className="flex items-center justify-between border-l-4 border-primary pl-4 mb-6 shrink-0">
      <h2 className="text-xl font-bold">担当者情報</h2>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => console.log("Add Contact")}
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      {data.contactPersons.map((contactPerson) => (
        <div
          key={contactPerson.id}
          className="group p-4 bg-primary/5 border border-primary/10 rounded-2xl flex justify-between items-center hover:border-primary/50 transition-colors shadow-sm mb-3"
        >
          <div className="flex items-center gap-3">
            <Contact2 className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="font-bold text-sm">{contactPerson.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {contactPerson.position}
              </p>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => console.log("Edit Contact:", contactPerson.id)}
            >
              <Edit2 className="w-3.5 h-3.5" />
            </Button>
            <TrashButton
              onClick={() => console.log("Delete Contact:", contactPerson.id)}
            />
          </div>
        </div>
      ))}
    </div>
  </section>
);
