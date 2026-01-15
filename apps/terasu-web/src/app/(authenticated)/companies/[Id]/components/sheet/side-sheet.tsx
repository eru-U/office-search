"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircleQuestion,
  MessageSquare,
  Search,
  StickyNote,
} from "lucide-react";
import { MemoTab } from "./memo-tab";
import { QaTab } from "./qa-tab";

/**
 * 企業詳細ページのサイドメニュー（リファクタリング版）
 * 個別の機能は MemoTab と QaTab に委譲しています。
 */
export function CompanyDetailSideSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="gap-2 rounded-full font-bold h-9 shadow-md transition-all active:scale-95"
        >
          <MessageSquare className="h-4 w-4" />
          メモ ・ QA
        </Button>
      </SheetTrigger>

      <SheetContent className="w-100 sm:w-135 p-0 flex flex-col h-full shadow-2xl">
        <SheetHeader className="p-6 border-b bg-white shrink-0">
          <SheetTitle className="flex items-center gap-2 text-xl font-black">
            <MessageSquare className="h-6 w-6 text-primary" />
            社外秘ログ
          </SheetTitle>
          <SheetDescription className="text-xs">
            説明会、座談会、面接。すべての接点をここで資産に変える。
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="memo" className="flex-1 flex flex-col min-h-0">
          {/* タブ & 検索エリア（共通） */}
          <div className="px-6 py-4 bg-slate-50 border-b space-y-4 shrink-0">
            <TabsList className="grid w-full grid-cols-2 bg-slate-200/50">
              <TabsTrigger value="memo" className="gap-2 font-bold">
                <StickyNote className="h-4 w-4" />
                メモ <span className="ml-1 text-[10px] opacity-50">8</span>
              </TabsTrigger>
              <TabsTrigger value="qa" className="gap-2 font-bold">
                <MessageCircleQuestion className="h-4 w-4" />
                質問リスト{" "}
                <span className="ml-1 text-[10px] opacity-50">4</span>
              </TabsTrigger>
            </TabsList>

            <div className="relative group">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="ログを検索..."
                className="pl-9 bg-white h-9 text-sm rounded-full border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>

          {/* 分割されたタブコンテンツの呼び出し */}
          <MemoTab />
          <QaTab />
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
