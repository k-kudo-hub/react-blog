import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import Tag from "../../atoms/Tag";
import Draft from "../../atoms/Draft";
import LastEditedAt from "../../atoms/LastEditedAt";

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

const Contribute = ({ contribute }: { contribute: ContributeType }) => {
  return (
    <div className={styles.contribute} key={contribute.id}>
      <div className={styles.contributeHeader}>
        <Image src="/images/hero.png" layout="fill" objectFit="cover" />
      </div>
      <div className={styles.contributeBody}>
        <div className={styles.contributeBodyHeader}>
          <div className={styles.tags}>
            {contribute.tags?.map((tag) => (
              <Tag tag={tag} key={tag.id} />
            ))}
          </div>
          {contribute.lastEditedAt ? (
            <LastEditedAt lastEditedAt={contribute.lastEditedAt} />
          ) : (
            <Draft />
          )}
        </div>
        <p className={styles.title}>
          <Link href={"/"}>{contribute.title || "title"}</Link>
        </p>
      </div>
    </div>
  );
};

export default Contribute;
