"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArchiveX, Briefcase, CalendarDays, Plus } from "lucide-react";
import { BasicInfo } from "../basic-info/basic-info";
import { BranchInfo } from "../branch-info/branch-info";
import { PersonInfo } from "../person-info/person-info";
import { PhilosophyInfo } from "../philosophy-info/philosophy-info";
import { SalaryInfo } from "../salary-info/salary-info";
import { WelfareInfo } from "../welfare-info/welfare-info";
import { CompanyYearlyCreateModal } from "./company-yearly-create-modal"; // モーダルをインポート

/**
 * 企業詳細の年度別コンテンツ管理（モーダル統合版）
 */
export function CompanyYearlyTabs() {
  // UI確認用の年度別レコード：空にするとEmpty表示を確認できます
  const yearlyRecords: { id: string; date: string; label: string }[] = [
    { id: "record-2025", date: "2025/12/18", label: "2025年度" },
  ];

  // --- 1. 年度データがない場合 (Empty) ---
  if (yearlyRecords.length === 0) {
    return (
      <div className="w-full py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Empty className="border-2 border-dashed border-muted/50 rounded-3xl bg-white/50 py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="bg-primary/5 text-primary">
              <ArchiveX className="h-10 w-10" />
            </EmptyMedia>
            <EmptyTitle className="text-xl font-black mt-4">
              年度データが登録されていません
            </EmptyTitle>
            <EmptyDescription className="max-w-sm mx-auto text-sm leading-relaxed mt-2 text-muted-foreground">
              企業研究の第一歩として、年度ごとの情報を登録しましょう。
            </EmptyDescription>
            <div className="mt-8">
              {/* モーダルのトリガーとしてボタンを渡す */}
              <CompanyYearlyCreateModal
                trigger={
                  <Button
                    size="lg"
                    className="rounded-full font-black px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    最初の年度データを登録する
                  </Button>
                }
              />
            </div>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  // --- 2. 年度データがある場合 (Tabs) ---
  return (
    <Tabs defaultValue={yearlyRecords[0].id} className="w-full space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <TabsList className="h-auto p-0 bg-transparent gap-2">
            {yearlyRecords.map((record) => (
              <TabsTrigger
                key={record.id}
                value={record.id}
                className="rounded-full border px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-all flex items-center gap-2"
              >
                <CalendarDays className="h-4 w-4" />
                <span className="text-xs font-bold">{record.date}</span>
              </TabsTrigger>
            ))}
            {/* 追加ボタンもモーダルをトリガーにする */}
            <CompanyYearlyCreateModal
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-dashed h-9 px-4 gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-xs font-bold">年度を追加</span>
                </Button>
              }
            />
          </TabsList>

          <Button
            variant="secondary"
            size="sm"
            className="gap-2 font-bold shadow-sm rounded-full"
          >
            <Briefcase className="h-4 w-4" />
            募集職種一覧
          </Button>
        </div>
      </div>

      {yearlyRecords.map((record) => (
        <TabsContent
          key={record.id}
          value={record.id}
          className="space-y-8 m-0 focus-visible:outline-none animate-in fade-in slide-in-from-bottom-2 duration-300"
        >
          <BasicInfo />
          <SalaryInfo />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
            <PhilosophyInfo />
            <WelfareInfo />
          </div>
          <BranchInfo />
          <PersonInfo />
          <div className="pb-12" />
        </TabsContent>
      ))}
    </Tabs>
  );
}
