import styles from "./style.module.scss";
import Image from "next/image";

interface TagProps {
  id: number;
  name: string;
  description: string;
}

const Tag = ({ tag }: { tag: TagProps }) => {
  return (
    <div className={styles.tag}>
      <div className={styles.tagIcon}>
        <Image src="/icons/tag.svg" objectFit="cover" height={12} width={12} />
      </div>
      <span>{tag.name}</span>
    </div>
  );
};

export default Tag;
