"use client";

import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

interface AxisSectionProps {
  id: string;
  children: ReactNode;
}

export function AxisSection({ id, children }: AxisSectionProps) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <section
      ref={setNodeRef}
      id={id}
      className="min-h-24 mb-8 transition-colors"
    >
      {children}
    </section>
  );
}
