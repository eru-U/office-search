// apps/terasu-web/app/(authenticated)/layout.tsx
import { auth } from "@terasu/auth/auth";
import { redirect } from "next/navigation";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // セッションがなければ、ログインページへ強制送還
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ここに共通のヘッダーなどを置くと便利です */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="font-bold">TERASU App</h1>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
