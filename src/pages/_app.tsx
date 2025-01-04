import "reflect-metadata";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "../client/styles/globals.css";
import type { AppProps } from "next/app";
import Auth from "./auth";
import { FlashMessageProvider } from "@components/atoms/Flash";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session | null;
}>) {
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <FlashMessageProvider>
          <Auth />
          <Component {...pageProps} />
        </FlashMessageProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
