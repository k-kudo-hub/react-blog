import Head from "next/head";
import { ReactNode } from "react";
import SITE_INFO from "src/common/constants/siteInfo";
import Header from "src/client/components/organisms/Header";
import Footer from "src/client/components/organisms/Footer";
import styles from "./style.module.scss";

interface Props {
  children: ReactNode;
  asideContent?: ReactNode;
  pageTitle?: string;
  pageDescription?: string;
}

const { TITLE: SITE_TITLE, DESCRIPTION } = SITE_INFO;
const FAVICON_PATH = "/fire.png";

const FullTemplate = ({
  children,
  asideContent,
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
        <link rel="icon" href={FAVICON_PATH} />
      </Head>
      <Header />
      <div className={styles.fullTemplateContainer}>
        <main className={styles.main}>{children}</main>
        {asideContent && (
          <aside className={styles.aside}>
            <div className={styles.dummy}>{asideContent}</div>
          </aside>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FullTemplate;
