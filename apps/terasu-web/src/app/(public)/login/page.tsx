// app/login/page.tsx
import { signIn, signOut } from "@terasu/auth/auth";

export default async function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">TERASU</h1>
          <p className="mt-2 text-gray-600">プロジェクトへようこそ</p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
          >
            GitHubでログイン
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800"
          >
            ログアウト
          </button>
        </form>
      </div>
    </div>
  );
}
