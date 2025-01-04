import Link from "next/link";
import styles from "./style.module.scss";

interface ButtonProps {
  text: string | JSX.Element;
  link?: string;
  onClick?: () => void;
}

/**
 * linkの方がSEO的には良いが、onClickの方が使い勝手が良い
 * そのため、onClickが指定されている場合はonClickを優先する
 */
const FloatButton = (props: ButtonProps) => {
  const { text, link, onClick } = props;
  const isLink = !!link && !onClick;

  if (!link && !onClick) {
    return null;
  }

  return (
    <div className={styles.floatButton}>
      {isLink ? (
        // linkが指定されており、onClickが指定されていない場合
        <Link href={link} className={styles.buttonText}>
          {text}
        </Link>
      ) : (
        // onClickが指定されている場合
        <a className={styles.buttonText} onClick={onClick}>
          {text}
        </a>
      )}
    </div>
  );
};

export default FloatButton;
