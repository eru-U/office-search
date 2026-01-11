"use client";

import { MapPin } from "lucide-react";
import { DetailCard } from "../detail-card/detail-card";

/**
 * 拠点情報セクション
 */
export function BranchInfo() {
  const branches = ["住所 1", "住所 2", "住所 3", "住所 4"];

  return (
    <DetailCard title="拠点情報" icon={<MapPin className="h-4 w-4" />}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {branches.map((address) => (
          <div
            key={address}
            className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50/50 hover:bg-white hover:shadow-sm transition-all cursor-default"
          >
            <div className="shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-red-600" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {address}
            </span>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
