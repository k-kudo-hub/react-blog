import MarkdownViewer from "@components/organisms/MarkdownViewer";
import styles from "./style.module.scss";
import SingleLineTemplate from "@components/templates/SingleLineTemplate";
import { Contribute } from "src/client/models/contribute";
import Modal from "@components/molecules/Modal";
import Button from "@components/atoms/Buttons";
import FloatButton from "@components/atoms/Buttons/FloatButton";
import Image from "next/image";
import IMAGE_PATH from "src/client/styles/images";
import { Tag as TagType } from "src/client/models/tag";
import Tag from "@components/atoms/Tags";

type TProps = {
  contribute: Contribute;
  isOpenDeleteModal: boolean;
  isEditableContribute: React.MutableRefObject<boolean>;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  deleteContribute: () => void;
};

type TUserInfoProps = {
  name: string;
  imageUrl: string;
  identityCode: string;
};

type TPublicStatusProps = {
  lastEditedDate: string | null;
  publishedDate: string | null;
};

type TTagsProps = {
  tags: TagType[];
};

const createUserInfoElement = (props: TUserInfoProps): JSX.Element => {
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

const createPublicStatusElement = (props: TPublicStatusProps): JSX.Element => {
  const { lastEditedDate, publishedDate } = props;
  return (
    <>
      {publishedDate ? <span>公開日: {publishedDate}</span> : null}
      {lastEditedDate ? <span>更新日: {lastEditedDate}</span> : null}
    </>
  );
};

const createTagElement = (props: TTagsProps) => {
  const { tags } = props;
  return <>{tags?.map((tag) => <Tag tag={tag} key={tag.id} />)}</>;
};

export const ContributeDetailPresenter: React.FC<TProps> = ({
  contribute,
  isEditableContribute,
  isOpenDeleteModal,
  openDeleteModal,
  closeDeleteModal,
  deleteContribute,
}: TProps) => {
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
