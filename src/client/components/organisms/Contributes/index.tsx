import styles from "./style.module.scss";
import Contribute from "../../molecules/Contribute";

interface ContributeType {
  id: number;
  title: string;
  tags: TagType[];
  content: string;
  lastEditedAt: string;
  publishedAt: string;
}

interface TagType {
  id: number;
  name: string;
  description: string;
}

const Contributes = ({ contributes }: { contributes: ContributeType[] }) => {
  return (
    <div className={styles.contributes}>
      {contributes.length ? (
        contributes.map((contribute) => (
          <Contribute contribute={contribute} key={contribute.id} />
        ))
      ) : (
        <p>投稿はまだありません</p>
      )}
    </div>
  );
};

export default Contributes;
