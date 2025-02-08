"use client";

import "reflect-metadata";
import { RecoilRoot } from "recoil";
import "../client/styles/globals.css";
import Auth from "./auth";
import { FlashMessageProvider } from "@components/atoms/Flash";
import SessionProvider from "@/client/providers/SessionProvider";
import { getBaseUrl } from "@/common/utils/url";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = getBaseUrl();
  return (
    <html lang="ja">
      <head>
        <link
          rel="alternate"
          type="application/atom+xml"
          href={`${baseUrl}/contributes/feed.xml`}
        />
      </head>
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
