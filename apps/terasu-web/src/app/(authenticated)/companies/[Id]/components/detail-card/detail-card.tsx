"use client";

// biome-ignore assist/source/organizeImports: <>
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2 } from "lucide-react";

interface DetailCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onEdit?: () => void; // 各セクションごとの編集関数
}

export function DetailCard({ title, icon, children, onEdit }: DetailCardProps) {
  return (
    <Card className="shadow-sm border-none ring-1 ring-gray-200 overflow-hidden">
      {/* py-3 に絞って余白をタイトに設定 */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 px-4 bg-gray-50/50 border-b">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          {title}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={onEdit}
        >
          <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
}
