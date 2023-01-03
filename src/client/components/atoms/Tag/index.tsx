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
      <span># {tag.name}</span>
    </div>
  );
};

export default Tag;
