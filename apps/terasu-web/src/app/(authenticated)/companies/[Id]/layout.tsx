// apps/terasu-web/app/(authenticated)/layout.tsx
import { headerFetch } from "@/actions/companies/detail/header-action/header-fetch-action";
import { CompanyDetailHeader } from "./components/header/header";

export default async function CompanyDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ Id: string }>;
}) {
  const { Id } = await params;
  const headerData = await headerFetch(Id);

  if (!headerData) {
    // 企業データがないとき用
    return <div>Company not found</div>;
  }

  return (
    <>
      <CompanyDetailHeader data={headerData} />
      {children}
    </>
  );
}
