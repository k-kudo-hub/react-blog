import Image from "next/image";
import Link from "next/link";
import SITE_INFO from "@constants/siteInfo";
import IMAGE_PATH from "../../../styles/images";
import styles from "./style.module.scss";

const header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <Image
          src={IMAGE_PATH.HERO}
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <div className={styles.heroTextContainer}>
          <Link href={"/"}>
            <p className={styles.heroText}>{SITE_INFO.TITLE}</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default header;
