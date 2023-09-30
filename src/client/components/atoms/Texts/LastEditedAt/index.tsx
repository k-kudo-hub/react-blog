import styles from "./style.module.scss";
import Image from "next/image";

const LastEditedAt = ({
  lastEditedAt = "",
}: {
  lastEditedAt: string | null;
}) => {
  return !!lastEditedAt ? (
    <div className={styles.lastEditedAt}>
      <div className={styles.lastEditIcon}>
        <Image
          src="/icons/feather-pen.svg"
          objectFit="cover"
          height={12}
          width={12}
          alt="最終編集"
        />
      </div>
      <span>{lastEditedAt}</span>
    </div>
  ) : null;
};

export default LastEditedAt;
