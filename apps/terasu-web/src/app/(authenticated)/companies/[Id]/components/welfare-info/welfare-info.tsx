"use client";

import { HeartHandshake } from "lucide-react";
import { DetailCard } from "../detail-card/detail-card";

/**
 * 福利厚生セクション
 */
export function WelfareInfo() {
  const welfares = [
    {
      name: "福利厚生名 1",
      description: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
    },
    {
      name: "福利厚生名 2",
      description: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
    },
  ];

  return (
    <DetailCard title="福利厚生" icon={<HeartHandshake className="h-4 w-4" />}>
      <div className="space-y-4">
        {welfares.map((item) => (
          <div
            key={item.name}
            className="p-4 rounded-xl border bg-white shadow-sm hover:border-primary/50 transition-all duration-200"
          >
            <h4 className="text-sm font-bold text-foreground mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              {item.name}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
