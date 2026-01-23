"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

interface AxisContextType {
  onRefresh: () => Promise<void>;
}

const AxisContext = createContext<AxisContextType | undefined>(undefined);

/**
 * 就活軸ページ全体でリフレッシュ関数を共有するためのプロバイダーです。
 */
export function AxisProvider({
  children,
  onRefresh,
}: {
  children: ReactNode;
  onRefresh: () => Promise<void>;
}) {
  return (
    <AxisContext.Provider value={{ onRefresh }}>
      {children}
    </AxisContext.Provider>
  );
}

/**
 * AxisContextを利用するためのカスタムフックです。
 */
export function useAxis() {
  const context = useContext(AxisContext);
  if (context === undefined) {
    throw new Error("useAxis must be used within an AxisProvider");
  }
  return context;
}
