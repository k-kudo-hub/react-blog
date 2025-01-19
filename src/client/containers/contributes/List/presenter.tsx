import FloatButton from "@components/atoms/Buttons/FloatButton";
import CardList from "@components/organisms/CardList";
import DoubleLineTemplate from "@components/templates/DoubleLineTemplate";
import PAGES from "@constants/pages";
import Image from "next/image";
import styles from "./style.module.scss";
import TextWithIcon from "@components/atoms/Texts/TextWithIcon";
import { Contribute } from "src/client/models/contribute";
import { CONTRIBUTE_STATUS } from "@server/domain/entity/contribute";
import { Tag as TagType } from "src/client/models/tag";
import Tag from "@components/atoms/Tags";

type TProps = {
  contributes: Contribute[];
};

export const ContributeListPresenter: React.FC<TProps> = ({ contributes }) => {
  const {
    HOME: { TITLE, DESCRIPTION },
  } = PAGES;
  const asideContent = <p></p>;

  const createPublicStatusElement = (contribute: Contribute): JSX.Element => {
    switch (contribute.status) {
      case CONTRIBUTE_STATUS.PUBLISHED:
        return (
          <TextWithIcon
            iconName="feather-pen.svg"
            iconAlt="公開"
            text={contribute.publishedDate}
          />
        );
      case CONTRIBUTE_STATUS.DRAFT:
        return (
          <TextWithIcon iconName="lock.svg" iconAlt="下書き" text="下書き" />
        );
      case CONTRIBUTE_STATUS.DELETED:
        return (
          <TextWithIcon
            iconName="trash-gray.svg"
            iconAlt="削除"
            text="削除済み"
          />
        );
      default:
        return (
          <TextWithIcon iconName="lock.svg" iconAlt="下書き" text="下書き" />
        );
    }
  };

  const createTagsElement = (tags: TagType[]): JSX.Element => {
    return <>{tags?.map((tag) => <Tag tag={tag} key={tag.id} />)}</>;
  };

  const generateContributeContents = () => {
    return contributes.map((contribute) => ({
      id: contribute.id,
      title: contribute.title,
      link: `/contributes/${contribute.identityCode}`,
      topContent: createPublicStatusElement(contribute),
      bottomContent: createTagsElement(contribute.tags),
    }));
  };

  return (
    <DoubleLineTemplate
      asideContent={asideContent}
      pageTitle={TITLE}
      pageDescription={DESCRIPTION}
    >
      <CardList
        contents={generateContributeContents()}
        emptyMessage="投稿がありません"
      />
      <div className={styles.floatButtonContainer}>
        <FloatButton
          text={
            <Image
              src="/icons/feather-pen-white.svg"
              alt="投稿"
              width={25}
              height={25}
              color="white"
            />
          }
          link={PAGES.CONTRIBUTES_NEW.PATH}
        />
      </div>
    </DoubleLineTemplate>
  );
};
