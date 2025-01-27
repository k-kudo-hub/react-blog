import Image from "next/image";
import styles from "./style.module.scss";

interface ITextWithIconProps {
  iconName: string;
  iconAlt: string;
  text: string;
}

const TextWithIcon = (params: ITextWithIconProps) => {
  const { iconName, iconAlt, text } = params;

  return (
    <div className={styles.textWithIconContainer}>
      <Image
        src={`/icons/${iconName}`}
        className={styles.iconImage}
        alt={iconAlt}
        height={12}
        width={12}
      />
      <span>{text}</span>
    </div>
  );
};

export default TextWithIcon;
