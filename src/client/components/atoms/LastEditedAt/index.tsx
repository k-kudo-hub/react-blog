import styles from "./style.module.scss";
import Image from "next/image";

const LastEditedAt = ({ lastEditedAt }: { lastEditedAt: string }) => {
  return (
    <div className={styles.lastEditedAt}>
      <div className={styles.lastEditIcon}>
        <Image
          src="/icons/feather-pen.svg"
          objectFit="cover"
          height={12}
          width={12}
        />
      </div>
      <span>{lastEditedAt}</span>
    </div>
  );
};

export default LastEditedAt;
