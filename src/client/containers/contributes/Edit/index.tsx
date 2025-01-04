import { useEffect, useState } from "react";
import PAGES from "@constants/pages";
import SingleLineWideTemplate from "@components/templates/SingleLineWideTemplate";
import MarkdownRenderer from "@components/atoms/MarkdownRenderer";
import { ContributeInterface } from "src/client/interface/contributes";
import useExclusiveControl from "src/client/hooks/useExclusiveControl";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";
import { useUpdateEffect } from "src/client/hooks/useUpdateEffect";
import { NextPage } from "next";
import Textarea from "@components/atoms/Textarea";
import TextForm from "@components/atoms/TextForm";
import FloatButton from "@components/atoms/Buttons/FloatButton/index";

// ここに置くべきではなさそう
const AUTO_SAVE_INTERVAL = 10000; // 自動保存の間隔 (単位:ms)

const contributeInterface = new ContributeInterface();

const EditContribute: NextPage = () => {
  const router = useRouter();
  const exclude = useExclusiveControl();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [identityCode, setIdentityCode] = useState<string>("");
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );

  useEffect(() => {
    if (router.query.identityCode) {
      fetchContribute(router.query.identityCode as string);
    }
  }, [router.query.identityCode]);

  useUpdateEffect(() => {
    clearTimeout(saveTimer);
    setSaveTimer(setTimeout(updateContribute, AUTO_SAVE_INTERVAL));
  }, [title, content]);

  const fetchContribute = async (identityCode: string) => {
    try {
      const existContribute =
        await contributeInterface.getContribute(identityCode);
      setTitle(existContribute?.title || "");
      setContent(existContribute?.content || "");
      setIdentityCode(existContribute?.identityCode || "");
    } catch (e) {
      // TODO: エラー処理
    }
  };

  const updateContribute = async () => {
    if (!identityCode) {
      return;
    }

    exclude(async () => {
      await contributeInterface.updateContribute({
        title,
        content,
        identityCode,
      });
    }, 500);
  };

  return (
    <SingleLineWideTemplate
      pageTitle={PAGES.CONTRIBUTES_NEW.TITLE}
      pageDescription={PAGES.CONTRIBUTES_NEW.DESCRIPTION}
    >
      <TextForm
        content={title}
        placeholder="まずはタイトルを入力しましょう"
        onChange={setTitle}
      />
      <div className={styles.contentContainer}>
        <div className={styles.writeContainer}>
          <Textarea
            content={content}
            placeholder="本文を入力しましょう。マークダウン記法に対応しています。"
            onChange={setContent}
          />
        </div>
        <div className={styles.previewContainer}>
          <div className={styles.preview}>
            <MarkdownRenderer content={content} />
          </div>
        </div>
      </div>
    </SingleLineWideTemplate>
  );
};

export default EditContribute;
