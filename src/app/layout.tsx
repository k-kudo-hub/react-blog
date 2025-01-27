"use client";

import "reflect-metadata";
import { RecoilRoot } from "recoil";
import "../client/styles/globals.css";
import Auth from "./auth";
import { FlashMessageProvider } from "@components/atoms/Flash";
import SessionProvider from "@/client/providers/SessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <RecoilRoot>
          <SessionProvider>
            <FlashMessageProvider>
              <Auth />
              {children}
            </FlashMessageProvider>
          </SessionProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
