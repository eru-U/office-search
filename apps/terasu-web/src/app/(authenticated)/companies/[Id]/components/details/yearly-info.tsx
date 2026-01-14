"use client";

// biome-ignore assist/source/organizeImports: <>
import { detailDataFetch } from "@/actions/companies/detail/data-fetch";
import { yearlyDataFetch } from "@/actions/companies/detail/yearly-data-fetch";
import { TrashButton } from "@/components/trash-button";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon } from "lucide-react";

import { Calendar, Contact2, Edit2, MapPin, Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const YearlyInfo = () => {
  // ============================================
  const [fetchDateData, setFetchDateData] = useState<
    {
      id: string;
      dataDate: Date;
    }[]
  >([]);
  // 選択中の年代のID
  const [selectedTabId, setSelectedTabId] = useState("");
  // キャッシュデータ保存用
  const [cacheData, setCacheData] = useState<
    Record<
      string,
      {
        company: {
          establishedDate: Date | null;
          capital: bigint | null;
          phoneNumber: string | null;
          philosophies: {
            id: string;
            content: string | null;
          }[];
        };
        id: string;
        employeeCount: number | null;
        representative: string;
        revenue: bigint | null;
        branches: {
          address: string;
          id: string;
        }[];
        contactPersons: {
          id: string;
          name: string;
          position: string;
        }[];
        welfares: {
          id: string;
          name: string;
          content: string | null;
        }[];
      }[]
    >
  >({});
  // 読み込み用
  const [isLoading, setIsLoading] = useState(false);
  // ============================================
  const params = useParams();
  const { Id } = params as { Id: string };
  // ============================================
  const tabChange = useCallback(async (value: string) => {
    if (!value) return;
    const result = await detailDataFetch(value);
    console.log(result);

    setCacheData((data) => {
      if (data[value]) return data;
      return {
        ...data,
        [value]: result,
      };
    });
  }, []);
  // ============================================
  useEffect(() => {
    const fetchFunction = async () => {
      const data = await yearlyDataFetch(Id);
      console.log(`[data]:${data}`);

      if (data.length > 0) {
        setFetchDateData(data);
        setSelectedTabId(data[0].id);
        await tabChange(data[0].id);
      }
    };
    fetchFunction();
  }, [Id, tabChange]);
  // ============================================
  // ...（前略：96行目まで）
  // ...（前略：96行目まで）
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 px-4 md:px-0">
      {/* 年代選択タブナビゲーション */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-4">
        <div className="flex flex-wrap gap-2 pt-4 justify-center items-center min-h-[calc(100vh-210px)]">
          {fetchDateData.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>年度別データが存在しません</EmptyTitle>
                <EmptyDescription>
                  まずは新しい年度データを追加してください。
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all w-10 h-10"
                  onClick={() => console.log("Add New Year Data")}
                  title="新しい年度を追加"
                >
                  <Plus className="w-5 h-5 text-muted-foreground" />
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <div>
              {fetchDateData.map((item) => (
                <Button
                  key={item.id}
                  variant={selectedTabId === item.id ? "default" : "outline"}
                  className="rounded-full px-6 transition-all"
                  onClick={() => {
                    setSelectedTabId(item.id);
                    tabChange(item.id);
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {item.dataDate.getFullYear()}年度
                </Button>
              ))}

              {/* ★ 年度追加ボタン：点線のボーダーで「ここから追加できるよ」感を演出 */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all w-10 h-10"
                onClick={() => console.log("Add New Year Data")}
                title="新しい年度を追加"
              >
                <Plus className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 詳細情報の表示エリア */}
      {cacheData[selectedTabId]?.map((data) => (
        <div
          key={data.id}
          className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          {/* 基本情報セクション（以下、前回修正分を維持） */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-l-4 border-primary pl-4">
              <h2 className="text-2xl font-bold">基本情報</h2>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => console.log("Edit Basic Info:", data.id)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
            {/* ...InfoBoxが並ぶエリア（中略） */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoBox
                label="設立年月日"
                value={
                  data.company.establishedDate
                    ? data.company.establishedDate.toLocaleDateString()
                    : "未登録"
                }
              />
              <InfoBox
                label="資本金"
                value={
                  data.company.capital
                    ? `${data.company.capital.toLocaleString()} 円`
                    : "未登録"
                }
              />
              <InfoBox
                label="代表者名"
                value={data.representative || "未登録"}
              />
              <InfoBox
                label="社員数"
                value={
                  data.employeeCount
                    ? `${data.employeeCount.toLocaleString()} 名`
                    : "未登録"
                }
              />
              <InfoBox
                label="電話番号"
                value={data.company.phoneNumber || "未登録"}
              />
              <InfoBox
                label="売上高"
                value={
                  data.revenue
                    ? `${data.revenue.toLocaleString()} 円`
                    : "未登録"
                }
              />
            </div>
          </section>

          {/* 企業理念セクション */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-l-4 border-primary pl-4">
              <h2 className="text-2xl font-bold">企業理念</h2>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-1"
                onClick={() => console.log("Add Philosophy")}
              >
                <Plus className="w-4 h-4" /> 追加
              </Button>
            </div>
            {/* ...理念リストとTrashButton（中略） */}
            {data.company.philosophies.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {data.company.philosophies.map((philosophy) => (
                  <div
                    key={philosophy.id}
                    className="group relative p-8 bg-muted/40 rounded-3xl italic text-lg text-center leading-relaxed"
                  >
                    「{philosophy.content || "未登録"}」
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          console.log("Edit Philosophy:", philosophy.id)
                        }
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <TrashButton
                        onClick={() =>
                          console.log("Delete Philosophy:", philosophy.id)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Empty> ... </Empty>
            )}
          </section>

          {/* 福利厚生セクション */}
          <section className="space-y-6">
            <div className="flex items-center justify-between border-l-4 border-red-500 pl-4">
              <h2 className="text-2xl font-bold">福利厚生</h2>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-1"
                onClick={() => console.log("Add Welfare")}
              >
                <Plus className="w-4 h-4" /> 追加
              </Button>
            </div>
            {/* ...福利厚生リストとTrashButton（中略） */}
            {data.welfares.length > 0 ? (
              <div className="space-y-4">
                {data.welfares.map((welfare) => (
                  <div
                    key={welfare.id}
                    className="group relative p-6 border rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        {welfare.name}
                      </h3>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            console.log("Edit Welfare:", welfare.id)
                          }
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <TrashButton
                          onClick={() =>
                            console.log("Delete Welfare:", welfare.id)
                          }
                        />
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-loose pl-4">
                      {welfare.content || "詳細は未登録です。"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <Empty> ... </Empty>
            )}
          </section>

          {/* 拠点・担当者情報 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* 拠点情報 */}
            <section className="flex flex-col h-[400px]">
              <div className="flex items-center justify-between border-l-4 border-blue-500 pl-4 mb-6 shrink-0">
                <h2 className="text-xl font-bold">拠点情報</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => console.log("Add Branch")}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {data.branches.map((branch) => (
                  <div
                    key={branch.id}
                    className="group p-4 bg-background border rounded-2xl flex justify-between items-center gap-3 hover:border-blue-500/50 transition-colors shadow-sm mb-3"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                      <span className="text-sm leading-snug">
                        {branch.address}
                      </span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => console.log("Edit Branch:", branch.id)}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <TrashButton
                        onClick={() => console.log("Delete Branch:", branch.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 担当者情報 */}
            <section className="flex flex-col h-[400px]">
              <div className="flex items-center justify-between border-l-4 border-primary pl-4 mb-6 shrink-0">
                <h2 className="text-xl font-bold">担当者情報</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => console.log("Add Contact")}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {data.contactPersons.map((contactPerson) => (
                  <div
                    key={contactPerson.id}
                    className="group p-4 bg-primary/5 border border-primary/10 rounded-2xl flex justify-between items-center hover:border-primary/50 transition-colors shadow-sm mb-3"
                  >
                    <div className="flex items-center gap-3">
                      <Contact2 className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <p className="font-bold text-sm">
                          {contactPerson.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {contactPerson.position}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          console.log("Edit Contact:", contactPerson.id)
                        }
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <TrashButton
                        onClick={() =>
                          console.log("Delete Contact:", contactPerson.id)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * 基本情報を表示するための小さな部品
 */
const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 bg-background border rounded-2xl shadow-sm group hover:border-primary/50 transition-colors">
    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1 group-hover:text-primary/70">
      {label}
    </dt>
    <dd
      className={`text-sm font-semibold truncate ${value === "未登録" ? "text-muted-foreground/40 font-normal italic" : "text-foreground"}`}
    >
      {value}
    </dd>
  </div>
);
