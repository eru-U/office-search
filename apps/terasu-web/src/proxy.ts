// middleware.ts
export { auth as proxy } from "@terasu/auth/auth";

export const config = {
  // 静的ファイルや画像以外はすべてミドルウェアを通す設定
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
