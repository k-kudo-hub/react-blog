import Link from "next/link";
import styles from "./style.module.scss";

interface ButtonProps {
  text: string;
  link: string;
}

const Button = (props: ButtonProps) => {
  const { text, link } = props;

  return (
    <Link href={link}>
      <div className={styles.floatButton}>
        <a className={styles.buttonText}>{text}</a>
      </div>
    </Link>
  );
};

export default Button;
