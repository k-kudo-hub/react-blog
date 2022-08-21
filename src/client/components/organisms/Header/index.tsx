import Image from "next/image";
import styles from "./style.module.scss";

const header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <Image src="/images/hero.png" layout="fill" objectFit="cover" />
      </div>
    </header>
  );
};

export default header;
