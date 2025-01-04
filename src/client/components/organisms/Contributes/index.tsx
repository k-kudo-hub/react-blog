import styles from "./style.module.scss";
import Tag from "@components/atoms/Tags";
import Card from "@components/molecules/Card";
import { Tag as TagType } from "../../../models/tag";
import { Contribute as ContributeType } from "../../../models/contribute";
import { CONTRIBUTE_STATUS } from "@server/domain/entity/contribute";
import TextWithIcon from "@components/atoms/Texts/TextWithIcon";

const createPublicStatusElement = (contribute: ContributeType): JSX.Element => {
  return contribute.status === CONTRIBUTE_STATUS.PUBLISHED &&
    !!contribute.publishedAt ? (
    <TextWithIcon
      iconName="feather-pen.svg"
      iconAlt="公開"
      text={contribute.publishedAt}
    />
  ) : (
    <TextWithIcon iconName="lock.svg" iconAlt="下書き" text="下書き" />
  );
};

const createTagsElement = (tags: TagType[]): JSX.Element => {
  return <>{tags?.map((tag) => <Tag tag={tag} key={tag.id} />)}</>;
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
