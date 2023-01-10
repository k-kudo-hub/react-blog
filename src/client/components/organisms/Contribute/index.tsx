import { Contribute as ContributeType } from "../../../models/contribute";
import styles from "./style.module.scss";
import Image from "next/image";
import IMAGE_PATH from "src/client/styles/images";
import MarkdownRenderer from "@components/atoms/MarkdownRenderer";
import Tag from "@components/atoms/Tag";
import { Tag as TagType } from "src/client/models/tag";
import Header from "@components/molecules/Header";

interface UserInfoProps {
  nickName: string;
  imageUrl: string;
  identityCode: string;
}

interface ContributeContentProps {
  contribute: ContributeType;
}

interface PublicStatusProps {
  lastEditedAt: string | null;
  publishedAt: string | null;
}

interface TagsProps {
  tags: TagType[];
}

const createUserInfoElement = (props: UserInfoProps): JSX.Element => {
  const { nickName, imageUrl } = props;
  return (
    <>
      <div className={styles.userIcon}>
        <Image src={imageUrl || IMAGE_PATH.FIRE_ICON} width={30} height={30} />
      </div>
      <span>@{nickName}</span>
    </>
  );
};

const createPublicStatusElement = (props: PublicStatusProps): JSX.Element => {
  const { lastEditedAt, publishedAt } = props;
  return (
    <>
      {publishedAt ? <span>公開日: {publishedAt}</span> : null}
      {lastEditedAt ? <span>更新日: {lastEditedAt}</span> : null}
    </>
  );
};

const createTagElement = (props: TagsProps) => {
  const { tags } = props;
  return (
    <>
      {tags?.map((tag) => (
        <Tag tag={tag} key={tag.id} />
      ))}
    </>
  );
};

const ContributeContent = (props: ContributeContentProps) => {
  const { contribute } = props;
  return (
    <>
      <section className={styles.detailHeader}>
        <Header
          userInfoElement={createUserInfoElement({
            nickName: contribute?.user.nickName,
            identityCode: contribute?.identityCode,
            imageUrl: "",
          })}
          navigationElement={createPublicStatusElement({
            publishedAt: contribute?.publishedAt,
            lastEditedAt: contribute?.lastEditedAt,
          })}
          title={contribute?.title}
          tagElement={createTagElement({
            tags: contribute?.tags,
          })}
        />
      </section>
      <section className={styles.detailBody}>
        <MarkdownRenderer content={contribute?.content as string} />
      </section>
    </>
  );
};

export default ContributeContent;
