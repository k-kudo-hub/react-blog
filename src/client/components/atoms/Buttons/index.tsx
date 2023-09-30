import Link from "next/link";
import styles from "./style.module.scss";

interface ButtonProps {
  text: string;
  link: string;
}

const Button = (props: ButtonProps) => {
  const { text, link } = props;

  return (
    <div className={styles.floatButton}>
      <Link href={link} className={styles.buttonText}>
        {text}
      </Link>
    </div>
  );
};

export default Button;
