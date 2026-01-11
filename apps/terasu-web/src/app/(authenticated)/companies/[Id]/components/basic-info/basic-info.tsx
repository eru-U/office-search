"use client";

import {
  Building2,
  Calendar,
  Coins,
  Phone,
  TrendingUp,
  UserCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { DetailCard } from "../detail-card/detail-card";
import { BasicInfoEditModal } from "./basic-info-edit-modal";

/**
 * 企業の基本情報
 * 編集モーダルとの連携機能を追加しました。
 */
export function BasicInfo() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 本来は年度別データから取得する初期値
  const dummyInitialData = {
    establishedDate: new Date("2025-12-18"),
    capital: "500,000,000円",
    representative: "田中 太郎",
    employeeCount: "7000人",
    phoneNumber: "000-0000-0000",
    revenue: "1,300,000,000円",
  };

  return (
    <>
      <DetailCard
        title="基本情報"
        icon={<Building2 className="h-4 w-4" />}
        onEdit={() => setIsEditModalOpen(true)} // 編集ボタンクリックで開く
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 py-4 w-full">
          <InfoItem icon={<Calendar />} label="設立年月日" value="2025/12/18" />
          <InfoItem icon={<Coins />} label="資本金" value="500,000,000円" />
          <InfoItem icon={<UserCircle />} label="代表者名" value="田中 太郎" />
          <InfoItem icon={<Users />} label="社員数" value="7000人" />
          <InfoItem icon={<Phone />} label="電話番号" value="000-0000-0000" />
          <InfoItem
            icon={<TrendingUp />}
            label="売上高"
            value="1,300,000,000円"
          />
        </div>
      </DetailCard>

      {/* 編集用モーダル */}
      <BasicInfoEditModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        initialData={dummyInitialData}
      />
    </>
  );
}

/**
 * 項目レンダリング用
 */
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 p-2 rounded-lg hover:bg-slate-50 transition-colors">
      <div className="mt-1 text-primary/50">{icon}</div>
      <div className="space-y-1.5">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">
          {label}
        </p>
        <p className="text-sm font-bold text-foreground leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
