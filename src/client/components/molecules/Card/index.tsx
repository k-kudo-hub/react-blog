import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import IMAGE_PATH from "../../../styles/images";

interface CardProps {
  uniqueKey: string | number;
  coverImageUrl?: string;
  topContent?: JSX.Element;
  titleText: string;
  titleLink: string;
  bottomContent?: JSX.Element;
}

const Card = (props: CardProps): JSX.Element => {
  const {
    uniqueKey,
    coverImageUrl,
    topContent,
    titleText,
    titleLink,
    bottomContent,
  } = props;

  return (
    <div className={styles.card} key={uniqueKey}>
      <div className={styles.cardHeader}>
        <Image
          className={styles.cardImage}
          src={coverImageUrl || IMAGE_PATH.HERO_ORIGIN}
          layout="fill"
          alt="カードの画像"
        />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardBodyHeader}>{topContent}</div>
        <p className={styles.title}>
          <Link href={titleLink}>{titleText || "(タイトルなし)"}</Link>
        </p>
        <div className={styles.cardBodyFooter}>
          <div className={styles.tags}>{bottomContent}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
