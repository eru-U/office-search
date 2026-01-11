// apps/terasu-web/src/app/(authenticated)/companies/[Id]/components/salary-info/salary-info.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import type { UpdateSalarySchema } from "@terasu/schema";
import { BadgeJapaneseYen, Coins } from "lucide-react";
import { useState } from "react";
import { DetailCard } from "../detail-card/detail-card";
import { SalaryInfoEditModal } from "./salary-modal-form";

export function SalaryInfo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentSalaryData: UpdateSalarySchema = {
    salaryCategoryId: "1",
    amount: "4,000,000",
    baseSalary: "250,000",
    bonusTimesPerYear: "2",
    bonusMonths: "4",
    allowances: [
      { name: "通勤手当", amount: "30,000" },
      { name: "住宅手当", amount: "20,000" },
    ],
  };

  return (
    <>
      <DetailCard
        title="給与情報"
        icon={<Coins className="h-4 w-4" />}
        onEdit={() => setIsModalOpen(true)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <DataField label="給与体制" value="年収制" />
              <DataField
                label="賞与"
                value={
                  currentSalaryData.bonusTimesPerYear
                    ? `年${currentSalaryData.bonusTimesPerYear}回 / ${currentSalaryData.bonusMonths}ヶ月分`
                    : "設定なし"
                }
              />
            </div>

            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-widest">
                想定年収
              </p>
              <p className="text-2xl font-black text-blue-900">
                {currentSalaryData.amount}
                <span className="text-sm ml-1">円</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black text-muted-foreground flex items-center gap-1 uppercase tracking-widest">
              <BadgeJapaneseYen className="h-3 w-3" /> 手当一覧
            </p>
            <div className="flex flex-wrap gap-2">
              {currentSalaryData.allowances?.map((t) => (
                <Badge
                  key={t.name}
                  variant="secondary"
                  className="font-bold bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-700 shadow-sm"
                >
                  {t.name}: {t.amount}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DetailCard>

      {/* 編集用モーダル */}
      <SalaryInfoEditModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={currentSalaryData}
      />
    </>
  );
}

function DataField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-900 px-1">{value}</p>
    </div>
  );
}
