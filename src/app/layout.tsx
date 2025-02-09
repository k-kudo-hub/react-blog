"use client";

import "reflect-metadata";
import "../client/styles/globals.css";
import Auth from "./auth";
import { FlashMessageProvider } from "@components/atoms/Flash";
import SessionProvider from "@/client/providers/SessionProvider";
import { getBaseUrl } from "@/common/utils/url";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = getBaseUrl();
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";
  return (
    <html lang="ja">
      <head>
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        <link
          rel="alternate"
          type="application/atom+xml"
          href={`${baseUrl}/contributes/feed.xml`}
        />
      </head>
      <body>
        <SessionProvider>
          <FlashMessageProvider>
            <Auth />
            {children}
          </FlashMessageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
