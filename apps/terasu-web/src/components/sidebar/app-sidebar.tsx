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
import { auth } from "@terasu/auth/auth";
import Link from "next/link"; // Next.js なので Link を使うのがおすすめ
import { itemsSet } from "./sidebar-items"; // itemsSet に名前を変えてインポート

export async function AppSidebar() {
  const session = await auth();
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
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {/* href に a タグではなく Link を使うと高速に遷移できるよ */}
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
