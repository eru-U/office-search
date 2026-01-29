// biome-ignore assist/source/organizeImports: <>
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface YearlyDetailContextType {
  onRefresh: () => Promise<void>;
}

const YearlyDetailContext = createContext<YearlyDetailContextType | undefined>(undefined);

/**
 * 詳細情報ページのリフレッシュ関数用のコンテキスト
 */
export function YearlyDetailProvider({ 
  children, 
  onRefresh 
}: { 
  children: ReactNode;
  onRefresh: () => Promise<void>; 
}) {
  return (
    <YearlyDetailContext.Provider value={{ onRefresh }}>
      {children}
    </YearlyDetailContext.Provider>
  );
}

export function useYearlyDetail() {
  const context = useContext(YearlyDetailContext);
  if (!context) {
    throw new Error("useYearlyDetail must be used within a YearlyDetailProvider");
  }
  return context;
}