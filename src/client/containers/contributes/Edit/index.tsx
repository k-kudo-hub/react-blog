import { useEffect, useState } from "react";
import PAGES from "@constants/pages";
import SingleLineWideTemplate from "@components/templates/SingleLineWideTemplate";
import MarkdownRenderer from "@components/atoms/MarkdownRenderer";
import { ContributeInterface } from "../../../..//client/interface/contributes";
import useExclusiveControl from "src/client/hooks/useExclusiveControl";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { useUpdateEffect } from "src/client/hooks/useUpdateEffect";
import { NextPage } from "next";
import Textarea from "@components/atoms/Textarea";
import TextForm from "@components/atoms/TextForm";
import FloatButton from "@components/atoms/Buttons/FloatButton/index";
import useContributeState from "src/client/state/contributes/contribute";
import Button from "@components/atoms/Buttons";
import Modal from "@components/molecules/Modal";
import { CONTRIBUTE_STATUS } from "@server/domain/entity/contribute";
import { FLASH_TYPE, useFlashMessage } from "@components/atoms/Flash";
import Image from "next/image";

// ここに置くべきではなさそう
const AUTO_SAVE_INTERVAL = 10000; // 自動保存の間隔 (単位:ms)

const contributeInterface = new ContributeInterface();

const EditContribute: NextPage = () => {
  const router = useRouter();
  const exclude = useExclusiveControl();
  const { contribute, setContribute } = useContributeState();
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );
  const [isOpenStatusModal, setIsOpenStatusModal] = useState<boolean>(false);
  const { showFlashMessage } = useFlashMessage();

  // TODO: 綺麗にする
  const changeableStatus =
    contribute?.status === CONTRIBUTE_STATUS.DRAFT
      ? CONTRIBUTE_STATUS.PUBLISHED
      : CONTRIBUTE_STATUS.DRAFT;
  const changeableStatusString =
    contribute?.status === CONTRIBUTE_STATUS.DRAFT ? "公開" : "下書き";
  const changeableStatusDescription =
    contribute?.status === CONTRIBUTE_STATUS.DRAFT
      ? "この記事を、全てのユーザーが閲覧できるようになります。"
      : "この記事は、あなた以外のユーザーが閲覧できないようになります。";

  useEffect(() => {
    if (router.query.identityCode) {
      fetchContribute(router.query.identityCode as string);
    }
  }, [router.query.identityCode]);

  useUpdateEffect(() => {
    clearTimeout(saveTimer);
    setSaveTimer(setTimeout(updateContribute, AUTO_SAVE_INTERVAL));
  }, [contribute]);

  const fetchContribute = async (identityCode: string) => {
    try {
      const contribute = await contributeInterface.getContribute(identityCode);
      setContribute(contribute);
    } catch (e) {
      // TODO: エラー処理
    }
  };

  const setTitle = (title: string) => {
    if (!contribute) {
      return;
    }
    setContribute({ ...contribute, title });
  };

  const setContent = (content: string) => {
    if (!contribute) {
      return;
    }
    setContribute({ ...contribute, content });
  };

  const updateContribute = async () => {
    if (!contribute?.identityCode) {
      return;
    }

    exclude(async () => {
      await contributeInterface.updateContribute(contribute);
    }, 500);
  };

  const updateContributeStatus = async () => {
    if (!contribute?.identityCode) {
      return;
    }

    exclude(async () => {
      setContribute({
        ...contribute,
        status: changeableStatus,
      });
      const updatedContribute =
        await contributeInterface.updateContributeStatus({
          ...contribute,
          status: changeableStatus,
        });
      if (!updatedContribute) {
        showFlashMessage(
          "記事のステータスを更新できませんでした。もう1度お試しいただくか、カスタマーサポートまでご連絡ください。",
          FLASH_TYPE.ERROR,
        );
        closeStatusModal();
      } else {
        showFlashMessage(
          `記事のステータスを「${changeableStatusString}」に更新しました。`,
          FLASH_TYPE.SUCCESS,
        );
        router.push(PAGES.HOME.PATH);
      }
    }, 500);
  };

  const openStatusModal = () => {
    setIsOpenStatusModal(true);
  };

  const closeStatusModal = () => {
    setIsOpenStatusModal(false);
  };

  return (
    <SingleLineWideTemplate
      pageTitle={PAGES.CONTRIBUTES_NEW.TITLE}
      pageDescription={PAGES.CONTRIBUTES_NEW.DESCRIPTION}
    >
      {!contribute ? (
        // TODO: ローディングコンポーネントを作成する
        // ローディングコンポーネントの粒度についても検討する
        <div>読み込み中...</div>
      ) : (
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
          <div className={styles.floatButtonContainer}>
            <FloatButton
              text={
                <Image
                  src="/icons/earth.svg"
                  alt="投稿"
                  width={25}
                  height={25}
                  color="white"
                />
              }
              onClick={openStatusModal}
            />
          </div>
          {isOpenStatusModal && (
            <Modal onCancel={closeStatusModal}>
              <h2 className={styles.modalTitle}>
                この記事を「{changeableStatusString}」にしますか？
              </h2>
              <p className={styles.modalContent}>
                {changeableStatusDescription}
              </p>
              <div className={styles.modalButtonContainer}>
                <Button
                  text={changeableStatusString}
                  onClick={updateContributeStatus}
                  type="main"
                />
              </div>
            </Modal>
          )}
        </section>
      )}
    </SingleLineWideTemplate>
  );
};

export default EditContribute;
