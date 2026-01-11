"use client";

import { ChevronRight, UserCircle2 } from "lucide-react";
import { DetailCard } from "../detail-card/detail-card";

/**
 * 人物情報セクション
 */
export function PersonInfo() {
  const persons = [
    { role: "人事課長", name: "前田 恵子" },
    { role: "人事課長", name: "前田 恵子" },
    { role: "人事課長", name: "前田 恵子" },
  ];

  return (
    <DetailCard title="人物情報" icon={<UserCircle2 className="h-4 w-4" />}>
      <div className="space-y-2">
        {persons.map((person) => (
          <button
            key={person.name}
            type="button"
            className="w-full flex items-center justify-between p-4 rounded-xl border bg-white hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <UserCircle2 className="h-6 w-6" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  {person.role}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {person.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-primary font-medium">
              クリックしてメモを開く
              <ChevronRight className="h-4 w-4" />
            </div>
          </button>
        ))}
      </div>
    </DetailCard>
  );
}
