// auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"; // 例としてGitHubを使用

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
