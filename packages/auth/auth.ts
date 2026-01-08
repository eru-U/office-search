// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"; // 例としてGitHubを使用

const { AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, AUTH_SECRET } = process.env;

if (!AUTH_GITHUB_ID || !AUTH_GITHUB_SECRET || !AUTH_SECRET) {
  throw new Error(
    "[Error] 環境変数 AUTH_GITHUB_ID と AUTH_GITHUB_SECRET と AUTH_SECRET を設定する必要があります。",
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: AUTH_GITHUB_ID,
      clientSecret: AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: AUTH_SECRET,
});
