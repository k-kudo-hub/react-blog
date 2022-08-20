import Head from "next/head";
import { ReactNode } from "react";
import SITE_INFO from "@constants/siteInfo";
import Header from "@components/organisms/Header";
import Footer from "@components/organisms/Footer";
import styles from "./style.module.scss";

interface Props {
  children: ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const { TITLE: SITE_TITLE, DESCRIPTION } = SITE_INFO;
const FAVICON_PATH = "/fire.png";

const FullTemplate = ({ children, pageTitle, pageDescription }: Props) => {
  const siteTitle = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;
  const siteDescription = pageDescription ? pageDescription : DESCRIPTION;

  return (
    <div className={styles.body}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href={FAVICON_PATH} />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default FullTemplate;
