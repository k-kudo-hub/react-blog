import "reflect-metadata";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "../client/styles/globals.css";
import type { AppProps } from "next/app";
import Auth from "./auth";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session | null;
}>) {
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <Auth />
        <Component {...pageProps} />
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;
