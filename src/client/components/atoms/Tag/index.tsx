import styles from "./style.module.scss";
import Image from "next/image";

interface TagProps {
  id: number;
  name: string;
  description: string;
}

const Tag = ({ tag }: { tag: TagProps }) => {
  return <span className={styles.tag}># {tag.name}</span>;
};

export default Tag;
