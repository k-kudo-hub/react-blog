import styles from "./style.module.scss";
import LastEditedAt from "@components/atoms/LastEditedAt";
import Draft from "@components/atoms/Draft";
import Tag from "@components/atoms/Tag";
import Card from "@components/molecules/Card";
import { Tag as TagType } from "../../../models/tag";
import { Contribute as ContributeType } from "../../../models/contribute";

const createPublicStatusElement = (contribute: ContributeType): JSX.Element => {
  return contribute.status === "PUBLISHED" ? (
    <LastEditedAt lastEditedAt={contribute?.lastEditedAt} />
  ) : (
    <Draft />
  );
};

const createTagsElement = (tags: TagType[]): JSX.Element => {
  return (
    <div className={styles.tags}>
      {tags?.map((tag) => (
        <Tag tag={tag} key={tag.id} />
      ))}
    </div>
  );
};

const Contributes = ({ contributes }: { contributes: ContributeType[] }) => {
  return (
    <div className={styles.contributes}>
      {contributes.length ? (
        contributes.map((contribute) => (
          <Card
            key={contribute.id}
            uniqueKey={contribute.id}
            topContent={createPublicStatusElement(contribute)}
            titleText={contribute.title}
            titleLink={`/contributes/${contribute.identityCode}`}
            bottomContent={createTagsElement(contribute.tags)}
          />
        ))
      ) : (
        <p>投稿はまだありません</p>
      )}
    </div>
  );
};

export default Contributes;
