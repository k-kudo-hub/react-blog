import { NextPage } from "next";
import TextForm from "@/client/components/atoms/TextForm";
import SingleLineWideTemplate from "@/client/components/templates/SingleLineWideTemplate";
import { Contribute } from "@/client/models/contribute";
import PAGES from "@/common/constants/pages";
import styles from "./styles.module.scss";
import Textarea from "@/client/components/atoms/Textarea";
import MarkdownRenderer from "@/client/components/atoms/MarkdownRenderer";
import FloatButton from "@/client/components/atoms/Buttons/FloatButton";
import Image from "next/image";
import Modal from "@/client/components/molecules/Modal";
import Button from "@/client/components/atoms/Buttons";

type TContributeEditProps = {
  contribute: Contribute | undefined;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  updateContributeStatus: () => void;
  canPublish: boolean;
  isOpenStatusModal: boolean;
  openStatusModal: () => void;
  closeStatusModal: () => void;
};

const ContributeEditPresenter: NextPage<TContributeEditProps> = ({
  contribute,
  setTitle,
  setContent,
  updateContributeStatus,
  canPublish,
  isOpenStatusModal,
  openStatusModal,
  closeStatusModal,
}: TContributeEditProps) => {
  return (
    <SingleLineWideTemplate
      pageTitle={PAGES.CONTRIBUTES_EDIT.TITLE}
      pageDescription={PAGES.CONTRIBUTES_EDIT.DESCRIPTION}
    >
      <section>
        <TextForm
          content={contribute?.title || ""}
          placeholder="まずはタイトルを入力しましょう"
          onChange={setTitle}
        />
        <div className={styles.contentContainer}>
          <div className={styles.writeContainer}>
            <Textarea
              content={contribute?.content || ""}
              placeholder="本文を入力しましょう。マークダウン記法に対応しています。"
              onChange={setContent}
            />
          </div>
          <div className={styles.previewContainer}>
            <div className={styles.preview}>
              <MarkdownRenderer
                content={
                  contribute?.content || "ここにプレビューが表示されます。"
                }
              />
            </div>
          </div>
        </div>
        {canPublish && (
          <div className={styles.floatButtonContainer}>
            <FloatButton
              text={
                <Image
                  src="/icons/earth.svg"
                  alt="公開"
                  width={25}
                  height={25}
                  color="white"
                />
              }
              onClick={openStatusModal}
            />
          </div>
        )}
        {isOpenStatusModal && (
          <Modal onCancel={closeStatusModal}>
            <h2 className={styles.modalTitle}>この記事を公開しますか？</h2>
            <p className={styles.modalContent}>
              この記事を公開すると、全てのユーザーが閲覧できるようになります。
            </p>
            <div className={styles.modalButtonContainer}>
              <Button
                text="公開する"
                onClick={updateContributeStatus}
                type="main"
              />
            </div>
          </Modal>
        )}
      </section>
    </SingleLineWideTemplate>
  );
};

export default ContributeEditPresenter;
