"use client";

import type { ReactNode } from "react";

interface AxisSectionHeaderProps {
  title: string;
  icon: ReactNode;
  colorClass: string;
}

/**
 * 就活軸の各優先度セクションの区切りとなるヘッダーです。
 */
export const AxisSectionHeader = ({
  title,
  icon,
  colorClass,
}: AxisSectionHeaderProps) => {
  return (
    <div
      className={`mt-8 mb-4 flex items-center gap-2 border-b pb-2 ${colorClass}`}
    >
      {icon}
      <h2 className="text-sm font-black uppercase tracking-widest">{title}</h2>
    </div>
  );
};
