import SingleLineWideTemplate from "@components/templates/SingleLineWideTemplate";
import styles from "./styles.module.scss";
import MarkdownRenderer from "@components/atoms/MarkdownRenderer";
import { useEffect, useState } from "react";
import PAGES from "@constants/pages";
import { ContributeInterface } from "src/client/interface/contributes";

// ここに置くべきではなさそう
const AUTO_SAVE_INTERVAL = 10000; // 自動保存の間隔 (単位:ms)

const contributeInterface = new ContributeInterface();

const CreateContribute = () => {
  const [identityCode, setIdentityCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  useEffect(() => {
    clearTimeout(saveTimer);
    setSaveTimer(setTimeout(saveContribute, AUTO_SAVE_INTERVAL));
  }, [identityCode, title, content]);

  const saveContribute = async () => {
    const contribute = await contributeInterface.createContribute({
      userId: 1,
      title,
      content,
      identityCode,
    });
    setIdentityCode(contribute?.identityCode);
  };

  return (
    <SingleLineWideTemplate
      pageTitle={PAGES.CONTRIBUTES_NEW.TITLE}
      pageDescription={PAGES.CONTRIBUTES_NEW.DESCRIPTION}
    >
      <input
        type="text"
        className={styles.titleForm}
        placeholder="まずはタイトルを入力しましょう"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className={styles.contentContainer}>
        <div className={styles.writeContainer}>
          <textarea
            id="content"
            name="content"
            value={content}
            className={styles.contentForm}
            onChange={(e) => setContent(e.target.value)}
            placeholder="本文を入力しましょう。マークダウン記法に対応しています。"
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
