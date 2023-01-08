import Image from "next/image";
import styles from "./style.module.scss";
import IMAGE_PATH from "../../../styles/images";
import Link from "next/link";

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
            <a className={styles.heroText}>Cut Blog</a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default header;
