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
    // マウント前は何も出さない（またはレイアウトが崩れない程度のスケルトン）
    return null;
  }

  return <>{children}</>;
}
