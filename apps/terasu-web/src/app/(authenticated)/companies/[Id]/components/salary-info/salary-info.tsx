"use client";

// biome-ignore assist/source/organizeImports: <>
import { Badge } from "@/components/ui/badge";
import { BadgeJapaneseYen, Coins } from "lucide-react";
import { DetailCard } from "../detail-card/detail-card";

export function SalaryInfo() {
  return (
    <DetailCard title="給与情報" icon={<Coins className="h-4 w-4" />}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DataField label="給与体制" value="年収制" />
            <DataField label="賞与" value="年2回 / 4ヶ月分" />
          </div>
          <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
            <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">
              想定年収
            </p>
            <p className="text-lg font-black text-blue-900">4,000,000円</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-muted-foreground flex items-center gap-1">
            <BadgeJapaneseYen className="h-3 w-3" /> 手当一覧
          </p>
          <div className="flex flex-wrap gap-2">
            {["通勤手当: 3万", "住宅手?: 2万"].map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="font-normal bg-white border"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </DetailCard>
  );
}

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-muted-foreground uppercase">
        {label}
      </p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
