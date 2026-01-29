"use client";

import { useEffect, useState } from "react";

/**
 * サーバーとクライアントの不一致（ハイドレーションエラー）を防ぐためのラッパー
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
