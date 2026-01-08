import type { LucideProps } from "lucide-react";
import { Home, Inbox } from "lucide-react";

import type { ForwardRefExoticComponent, RefAttributes } from "react";

type SidebarTypes = {
  title: string;
  items: {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
}[];

export const itemsSet: SidebarTypes = [
  {
    title: "TOP",
    items: [
      {
        title: "ダッシュボード",
        url: "#",
        icon: Home,
      },
    ],
  },
  {
    title: "自己分析",
    items: [
      {
        title: "基本情報・資格",
        url: "#",
        icon: Home,
      },
      {
        title: "就活軸設定",
        url: "#",
        icon: Inbox,
      },
    ],
  },
  {
    title: "企業分析",
    items: [
      {
        title: "企業一覧・検索",
        url: "#",
        icon: Home,
      },
      {
        title: "お気に入り企業",
        url: "#",
        icon: Home,
      },
    ],
  },
  {
    title: "就活管理",
    items: [
      {
        title: "タスク管理",
        url: "#",
        icon: Home,
      },
      {
        title: "選考状況・先行タスク管理",
        url: "#",
        icon: Home,
      },
      {
        title: "スケジュールカレンダー",
        url: "#",
        icon: Home,
      },
    ],
  },
  {
    title: "システム",
    items: [
      {
        title: "アカウント設定",
        url: "#",
        icon: Home,
      },
      {
        title: "マスタ管理",
        url: "#",
        icon: Home,
      },
    ],
  },
];
