import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { ContributeInterface } from "../../../interface/contributes";
import styles from "./style.module.scss";
import SingleLineTemplate from "@components/templates/SingleLineTemplate";
import FloatButton from "@components/atoms/Buttons/FloatButton";
import useMeState from "src/client/state/me";
import useContributeState from "src/client/state/contributes/contribute";
import MarkdownViewer from "@components/organisms/MarkdownViewer";
import Image from "next/image";
import IMAGE_PATH from "src/client/styles/images";
import Tag from "@components/atoms/Tags";
import { Tag as TagType } from "src/client/models/tag";
import Modal from "@components/molecules/Modal";
import Button from "@components/atoms/Buttons";
import PAGES from "@constants/pages";
import { FLASH_TYPE, useFlashMessage } from "@components/atoms/Flash";

const contributeInterface = new ContributeInterface();

interface UserInfoProps {
  name: string;
  imageUrl: string;
  identityCode: string;
}

interface PublicStatusProps {
  lastEditedDate: string | null;
  publishedDate: string | null;
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
  const { lastEditedDate, publishedDate } = props;
  return (
    <>
      {publishedDate ? <span>公開日: {publishedDate}</span> : null}
      {lastEditedDate ? <span>更新日: {lastEditedDate}</span> : null}
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
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { showFlashMessage } = useFlashMessage();

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

  const openDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const deleteContribute = async () => {
    if (!contribute) {
      return;
    }

    const result = await contributeInterface.deleteContribute(
      contribute.identityCode,
    );
    if (!result) {
      showFlashMessage("投稿の削除に失敗しました。", FLASH_TYPE.ERROR);
      closeDeleteModal();
      return;
    }

    showFlashMessage("投稿を削除しました。", FLASH_TYPE.SUCCESS);
    router.push(PAGES.HOME.PATH);
  };

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
              publishedDate: contribute.publishedDate,
              lastEditedDate: contribute.lastEditedDate,
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
                  src="/icons/trash.svg"
                  alt="投稿の削除"
                  width={25}
                  height={25}
                  color="white"
                />
              }
              onClick={openDeleteModal}
            />
            <FloatButton
              text={
                <Image
                  src="/icons/feather-pen-white.svg"
                  alt="投稿の更新"
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
      {isOpenDeleteModal && (
        <Modal onCancel={closeDeleteModal}>
          <h2 className={styles.modalTitle}>この記事を削除しますか？</h2>
          <p className={styles.modalContent}>
            削除した投稿を元に戻すことはできません。本当に削除しますか？
          </p>
          <div className={styles.modalButtonContainer}>
            <Button text="削除する" onClick={deleteContribute} type="main" />
          </div>
        </Modal>
      )}
    </SingleLineTemplate>
  );
};
export default ContributeDetail;
