import SingleLineWideTemplate from "@components/templates/SingleLineWideTemplate";
import styles from "./styles.module.scss";
import MarkdownRenderer from "@components/atoms/MarkdownRenderer";
import { useEffect, useState } from "react";
import PAGES from "@constants/pages";
import { ContributeInterface } from "src/client/interface/contributes";
import useExclusiveControl from "src/client/hooks/useExclusiveControl";
import { NextPage } from "next";
import Textarea from "@components/atoms/Textarea";
import TextForm from "@components/atoms/TextForm";

// ここに置くべきではなさそう
const AUTO_SAVE_INTERVAL = 10000; // 自動保存の間隔 (単位:ms)

const contributeInterface = new ContributeInterface();

const CreateContribute: NextPage = () => {
  const exclude = useExclusiveControl();
  const [identityCode, setIdentityCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );

  useEffect(() => {
    clearTimeout(saveTimer);
    setSaveTimer(setTimeout(createContribute, AUTO_SAVE_INTERVAL));
  }, [identityCode, title, content]);

  const createContribute = async () => {
    if (!title || !content) {
      return;
    }

    exclude(async () => {
      if (identityCode) {
        await contributeInterface.updateContribute({
          title,
          content,
          identityCode,
        });
        return;
      } else {
        const contribute = await contributeInterface.createContribute({
          title,
          content,
          identityCode,
        });
        setIdentityCode(contribute?.identityCode);
      }
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

export default CreateContribute;
