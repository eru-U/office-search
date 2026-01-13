// apps/terasu-web/app/(authenticated)/layout.tsx
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CompanyDetailHeader } from "./components/header/header";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CompanyDetailHeader />
      {children}
    </>
  );
}
