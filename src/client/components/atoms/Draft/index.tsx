import styles from "./style.module.scss";
import Image from "next/image";

const Tag = () => {
  return (
    <div className={styles.draft}>
      <div className={styles.draftIcon}>
        <Image src="/icons/lock.svg" objectFit="cover" height={12} width={12} />
      </div>
      <span>非公開</span>
    </div>
  );
};

export default Tag;
