"use client";

import { detailDataFetch } from "@/actions/companies/detail/data-fetch";
import { yearlyDataCreate } from "@/actions/companies/detail/yearly-data-create";
import { yearlyDataFetch } from "@/actions/companies/detail/yearly-data-fetch";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BasicInfoSection } from "./sections/basic-info-section";
import { BranchSection } from "./sections/branch-section";
import { ContactSection } from "./sections/contact-section";
import { PhilosophySection } from "./sections/philosophy-section";
import { WelfareSection } from "./sections/welfare-section";
import { YearlyInfoTabs } from "./yearly-info-tabs";

export const YearlyInfo = () => {
  const [fetchDateData, setFetchDateData] = useState<
    { id: string; dataDate: Date }[]
  >([]);
  const [selectedTabId, setSelectedTabId] = useState("");
  const [cacheData, setCacheData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const { Id } = params as { Id: string };

  const createYearlyData = async (date: Date) => {
    setIsLoading(true);
    try {
      await yearlyDataCreate(Id, date);
    } catch (error) {
      console.error("年度データの作成に失敗しました:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabChange = useCallback(async (value: string) => {
    if (!value) return;
    const result = await detailDataFetch(value);
    setCacheData((data) => {
      if (data[value]) return data;
      return { ...data, [value]: result };
    });
  }, []);

  useEffect(() => {
    const fetchFunction = async () => {
      const data = await yearlyDataFetch(Id);
      if (data.length > 0) {
        setFetchDateData(data);
        setSelectedTabId(data[0].id);
        await tabChange(data[0].id);
      }
    };
    fetchFunction();
  }, [Id, tabChange]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4 md:px-0">
      <YearlyInfoTabs
        fetchDateData={fetchDateData}
        selectedTabId={selectedTabId}
        setSelectedTabId={setSelectedTabId}
        tabChange={tabChange}
      />

      {cacheData[selectedTabId]?.map((data: any) => (
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
    </div>
  );
};
