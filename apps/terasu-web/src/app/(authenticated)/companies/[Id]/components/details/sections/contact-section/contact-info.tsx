// biome-ignore assist/source/organizeImports: <>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Contact2 } from "lucide-react";
import type { YearlyDetailItem } from "../../types";
import { ContactInfoAdd } from "./contact-info-add";
import { ContactInfoDelete } from "./contact-info-delete";
import { ContactInfoEdit } from "./contact-info-edit";

export const ContactSection = ({ data }: { data: YearlyDetailItem }) => (
  <section className="flex flex-col h-100">
    <div className="flex items-center justify-between border-l-4 border-primary pl-4 mb-6 shrink-0">
      <h2 className="text-xl font-bold">担当者情報</h2>
      <ContactInfoAdd yearlyInfoId={data.id} />
    </div>

    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
      <TooltipProvider>
        {data.contactPersons.map((contactPerson) => (
          <div
            key={contactPerson.id}
            className="group relative p-0 bg-primary/5 border border-primary/10 rounded-2xl flex items-center hover:border-primary/50 transition-colors shadow-sm mb-3 overflow-hidden"
          >
            {/* ▼ ツールチップ領域：flex-1 でボタンの手前まで広げる ▼ */}
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="flex flex-1 items-center gap-3 cursor-help p-4">
                  <Contact2 className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-sm">{contactPerson.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {contactPerson.position}
                    </p>
                  </div>
                </div>
              </TooltipTrigger>
              {contactPerson.description && (
                <TooltipContent className="max-w-sm wrap-break-word z-50">
                  <p>{contactPerson.description}</p>
                </TooltipContent>
              )}
            </Tooltip>

            <div className="flex gap-1 pr-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 bg-linear-to-l from-primary/5 via-primary/5 to-transparent py-4 pl-2">
              <ContactInfoEdit
                id={contactPerson.id}
                initialContent={contactPerson}
              />
              <ContactInfoDelete id={contactPerson.id} />
            </div>
          </div>
        ))}
      </TooltipProvider>
    </div>
  </section>
);
