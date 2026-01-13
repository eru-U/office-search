// apps/terasu-web/app/(authenticated)/companies/[Id]/components/header/header.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Globe, Star } from "lucide-react";
import { CompanyDetailSideSheet } from "../sheet/side-sheet";
import { CompanyDetailHeaderEditModal } from "./header-edit-modal";

// 受け取るデータの型定義
interface CompanyDetailHeaderProps {
  data: {
    id: string;
    name: string;
    websiteUrl: string | null;
    ratingScore: number | null;
  };
}

/**
 * 企業詳細ページのStickyヘッダー
 */
export function CompanyDetailHeader({ data }: CompanyDetailHeaderProps) {
  // 💡 見てください！ useState も useEffect も useParams も全部消えました。
  // 届いた data をそのまま使うだけです。

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-20 items-center justify-between py-4 px-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {data.name}
            </h1>
            <CompanyDetailHeaderEditModal
              companyId={data.id}
              initialData={{ name: data.name, websiteUrl: data.websiteUrl }}
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href={data.websiteUrl ? data.websiteUrl : undefined}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium underline-offset-4 hover:underline"
            >
              <Globe className="h-3.5 w-3.5" />
              {data.websiteUrl ? "公式サイト" : "公式サイト（未登録）"}
            </a>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <span className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
                マッチング度:
              </span>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 px-2 py-0"
              >
                {data.ratingScore ? `${data.ratingScore}%` : "未評価"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full font-bold h-9"
          >
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            評価する
          </Button>

          <CompanyDetailSideSheet />
        </div>
      </div>
    </header>
  );
}
