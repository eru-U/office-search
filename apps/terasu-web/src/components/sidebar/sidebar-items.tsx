// パスの先については適時ファイル作成する

import type { LucideProps } from "lucide-react";
import {
  Building2,
  CalendarDays,
  ClipboardCheck,
  Database,
  LayoutDashboard,
  ListTodo,
  Star,
  Target,
  UserCog,
  UserRound,
} from "lucide-react";

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
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "自己分析",
    items: [
      {
        title: "基本情報・資格",
        url: "/profile",
        icon: UserRound, // もしくは Award
      },
      {
        title: "就活軸設定",
        url: "/axis",
        icon: Target,
      },
    ],
  },
  {
    title: "企業分析",
    items: [
      {
        title: "企業一覧・検索",
        url: "/companies",
        icon: Building2,
      },
      {
        title: "お気に入り企業",
        url: "/favorites",
        icon: Star,
      },
    ],
  },
  {
    title: "就活管理",
    items: [
      {
        title: "タスク管理",
        url: "/tasks",
        icon: ListTodo,
      },
      {
        title: "選考状況・タスク",
        url: "/selection",
        icon: ClipboardCheck,
      },
      {
        title: "スケジュールカレンダー",
        url: "/calendar",
        icon: CalendarDays,
      },
    ],
  },
  {
    title: "システム",
    items: [
      {
        title: "アカウント設定",
        url: "/settings",
        icon: UserCog,
      },
      {
        title: "マスタ管理",
        url: "/admin/masters",
        icon: Database,
      },
    ],
  },
];
