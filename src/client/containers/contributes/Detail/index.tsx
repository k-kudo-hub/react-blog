import { NextPage } from "next";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { ContributeInterface } from "../../../interface/contributes";
import styles from "./style.module.scss";
import SingleLineTemplate from "@components/templates/SingleLineTemplate";
import FloatButton from "@components/atoms/Buttons/FloatButton/index";
import useMeState from "src/client/state/me";
import useContributeState from "src/client/state/contributes/contribute";
import MarkdownViewer from "@components/organisms/MarkdownViewer";
import Image from "next/image";
import IMAGE_PATH from "src/client/styles/images";
import Tag from "@components/atoms/Tags";
import { Tag as TagType } from "src/client/models/tag";

const contributeInterface = new ContributeInterface();

interface UserInfoProps {
  name: string;
  imageUrl: string;
  identityCode: string;
}

interface PublicStatusProps {
  lastEditedAt: string | null;
  publishedAt: string | null;
}

interface TagsProps {
  tags: TagType[];
}

const createUserInfoElement = (props: UserInfoProps): JSX.Element => {
  const { name, imageUrl } = props;
  return (
    <>
      <div className={styles.userIcon}>
        <Image
          src={imageUrl || IMAGE_PATH.FIRE_ICON}
          width={30}
          height={30}
          alt={`${name}のユーザー画像`}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <span>@{name}</span>
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
  return <>{tags?.map((tag) => <Tag tag={tag} key={tag.id} />)}</>;
};

const ContributeDetail: NextPage = () => {
  const router = useRouter();
  const isEditableContribute = useRef<boolean>(false);
  const { contribute, setContribute } = useContributeState();
  const {
    me: { id: meId },
  } = useMeState();

  useEffect(() => {
    if (router.query.identityCode) {
      fetchContribute(router.query.identityCode as string);
    }
  }, [router.query]);

  useEffect(() => {
    if (contribute?.userId === meId) {
      isEditableContribute.current = true;
    }
  });

  const fetchContribute = async (identityCode: string) => {
    const contribute = await contributeInterface.getContribute(identityCode);
    setContribute(contribute);
  };

  return (
    <SingleLineTemplate pageTitle={contribute?.title}>
      <article className={styles.detailContainer}>
        {contribute === undefined ? null : (
          <MarkdownViewer
            imageWithTextElement={createUserInfoElement({
              name: contribute.user.name,
              identityCode: contribute.identityCode,
              imageUrl: contribute.user.image,
            })}
            navigationElement={createPublicStatusElement({
              publishedAt: contribute.publishedAt,
              lastEditedAt: contribute.lastEditedAt,
            })}
            tagElement={createTagElement({
              tags: contribute.tags,
            })}
            title={contribute.title}
            content={contribute.content}
          />
        )}
        {!!contribute && isEditableContribute.current ? (
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
              link={`/contributes/${contribute.identityCode}/edit`}
            />
          </div>
        ) : null}
      </article>
    </SingleLineTemplate>
  );
};
export default ContributeDetail;
