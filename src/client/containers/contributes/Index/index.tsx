import { useEffect } from "react";
import type { NextPage } from "next";
import FloatButton from "@components/atoms/Buttons/FloatButton";
import DoubleLineTemplate from "@components/templates/DoubleLineTemplate";
import PAGES from "../../../../common/constants/pages";
import { ContributeInterface } from "../../../interface/contributes";
import styles from "./style.module.scss";
import useContributesState from "../../../state/contributes";
import Tag from "@components/atoms/Tags";
import { Tag as TagType } from "../../../models/tag";
import { Contribute as ContributeType } from "../../../models/contribute";
import { CONTRIBUTE_STATUS } from "@server/domain/entity/contribute";
import TextWithIcon from "@components/atoms/Texts/TextWithIcon";
import CardList from "@components/organisms/CardList";
import Image from "next/image";

const contributeInterface = new ContributeInterface();
const {
  HOME: { TITLE, DESCRIPTION },
} = PAGES;

const createPublicStatusElement = (contribute: ContributeType): JSX.Element => {
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

const Home: NextPage = () => {
  const { contributes, setContributes } = useContributesState();

  useEffect(() => {
    fetchContributes();
  }, []);

  const fetchContributes = async () => {
    const contributes = await contributeInterface.getAllContributes();
    setContributes(contributes);
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

  const asideContent = <p></p>;

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

export default Home;
