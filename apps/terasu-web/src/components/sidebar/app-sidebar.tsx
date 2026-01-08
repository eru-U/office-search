"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { Session } from "next-auth";
import Link from "next/link"; // Next.js なので Link を使うのがおすすめ
import { usePathname } from "next/navigation";
import { itemsSet } from "./sidebar-items"; // itemsSet に名前を変えてインポート

export function AppSidebar({ session }: { session: Session }) {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <h1 className="text-xl mb-2">TERASU</h1>
          <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
            <Avatar>
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || "User"}
              />
              <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>

            <p>{session?.user?.name || "User"}</p>
          </div>
        </SidebarHeader>
        {itemsSet.map((group) => (
          // カテゴリー（グループ）ごとに SidebarGroup を作成
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <SidebarMenuButton asChild>
                        {/* href に a タグではなく Link を使うと高速に遷移できるよ */}
                        <Link href={item.url}>
                          <item.icon
                            className={
                              isActive ? "text-blue-500" : "text-gray-500"
                            }
                          />
                          <span
                            className={
                              isActive ? "text-blue-500" : "text-gray-500"
                            }
                          >
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
