import Head from "next/head";
import { ReactNode } from "react";
import SITE_INFO from "@constants/siteInfo";
import Header from "@components/organisms/Header";
import Footer from "@components/organisms/Footer";
import styles from "./style.module.scss";
import IMAGE_PATH from "../../../styles/images";

interface Props {
  children: ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const { TITLE: SITE_TITLE, DESCRIPTION } = SITE_INFO;

const SingleLineTemplate = ({
  children,
  pageTitle,
  pageDescription,
}: Props) => {
  const siteTitle = pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE;
  const siteDescription = pageDescription ? pageDescription : DESCRIPTION;

  return (
    <div className={styles.body}>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <link rel="icon" href={IMAGE_PATH.FIRE_ICON} />
      </Head>
      <Header />
      <div className={styles.doubleLineTemplateContainer}>
        <main className={styles.main}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default SingleLineTemplate;
