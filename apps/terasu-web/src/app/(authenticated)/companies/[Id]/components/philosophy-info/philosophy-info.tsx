"use client";

import { Lightbulb } from "lucide-react";
import { DetailCard } from "../detail-card/detail-card";

export function PhilosophyInfo() {
  // データが増えても縦に並ぶので、高さの不一致が起きにくい
  return (
    <DetailCard title="企業理念" icon={<Lightbulb className="h-4 w-4" />}>
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="p-3 rounded-lg border bg-white border-l-4 border-l-primary"
          >
            <h4 className="text-sm font-bold mb-1">理念タイトル {i}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              ここには詳細な理念の内容が入ります。数が増えてもここが縦に伸びるだけなので、レイアウトが壊れません。
            </p>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
