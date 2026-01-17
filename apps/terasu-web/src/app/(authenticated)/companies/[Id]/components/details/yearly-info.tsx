"use client";

// biome-ignore assist/source/organizeImports: <>
import { detailDataFetch } from "@/actions/companies/detail/data-fetch";
import { yearlyDataFetch } from "@/actions/companies/detail/yearly-data-fetch";
import { YearlyDetailProvider } from "@/contexts/YearlyDetailContext";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BasicInfoSection } from "./sections/basic-info-section/basic-info-section";
import { BranchSection } from "./sections/branch-section/branch-info";
import { ContactSection } from "./sections/contact-section/contact-info";
import { PhilosophySection } from "./sections/philosophy-section/philosophy-info";
import { WelfareSection } from "./sections/welfare-section/welfare-info";
import type { CacheData, YearDateData, YearlyDetailItem } from "./types";
import { YearlyInfoTabs } from "./yearly-info-tabs";

export const YearlyInfo = () => {
  const [fetchDateData, setFetchDateData] = useState<YearDateData[]>([]);
  const [selectedTabId, setSelectedTabId] = useState("");
  const [cacheData, setCacheData] = useState<CacheData>({});

  const params = useParams();
  const Id = params.Id as string;

  // メモ機能の loadMemos 方式を継承
  const loadYearlyData = useCallback(async () => {
    const data = await yearlyDataFetch(Id);
    if (data && data.length > 0) {
      setFetchDateData(data);

      // 初回またはデータが空だった場合は先頭を選択
      const targetId = selectedTabId || data[0].id;
      if (!selectedTabId) setSelectedTabId(targetId);

      // 詳細データも併せて取得/更新
      const result = await detailDataFetch(targetId);
      setCacheData((prev) => ({
        ...prev,
        [targetId]: result as YearlyDetailItem[],
      }));
    }
  }, [Id, selectedTabId]);

  useEffect(() => {
    loadYearlyData();
  }, [loadYearlyData]);

  // タブ切り替え時の処理
  const handleTabChange = async (value: string) => {
    setSelectedTabId(value);
    const result = await detailDataFetch(value);
    setCacheData((prev) => ({
      ...prev,
      [value]: result as YearlyDetailItem[],
    }));
  };

  /**
   * 現在選択中のタブのデータだけを再取得してキャッシュを更新する関数
   */
  const refreshCurrentData = useCallback(async () => {
    if (!selectedTabId) return;
    const result = await detailDataFetch(selectedTabId);
    setCacheData((prev) => ({
      ...prev,
      [selectedTabId]: result as YearlyDetailItem[],
    }));
  }, [selectedTabId]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4 md:px-0 flex flex-col min-h-[calc(100vh-160px)]">
      <YearlyInfoTabs
        fetchDateData={fetchDateData}
        selectedTabId={selectedTabId}
        onTabChange={handleTabChange}
        onRefresh={loadYearlyData}
      />
      <YearlyDetailProvider onRefresh={refreshCurrentData}>
        {cacheData[selectedTabId]?.map((data: YearlyDetailItem) => (
          <div
            key={data.id}
            className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <BasicInfoSection data={data} />
            <PhilosophySection data={data} />
            <WelfareSection data={data} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <BranchSection data={data} />
              <ContactSection data={data} />
            </div>
          </div>
        ))}
      </YearlyDetailProvider>
    </div>
  );
};
