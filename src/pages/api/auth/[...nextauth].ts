import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { SessionStrategy } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  session: {
    /**
     * strategyについて、本来はdatabaseを使用したかったが、
     * middlewareが使用できなくなる問題が発生したためjwtを使用する。
     * https://github.com/nextauthjs/next-auth/issues/5170#issuecomment-1228008390
     */
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  theme: {
    brandColor: "#b30000",
    colorScheme: "auto" as const,
    logo: "	http://localhost:3000/fire.png",
  },
};

export default NextAuth(authOptions);
