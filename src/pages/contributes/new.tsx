import SingleLineWideTemplate from "@components/templates/SingleLineWideTemplate";
import styles from "./styles.module.scss";
import MarkdownRenderer from "@components/atoms/MarkdownRenderer";
import { useState } from "react";
import PAGES from "@constants/pages";

const CreateContribute = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <SingleLineWideTemplate
      pageTitle={PAGES.CONTRIBUTES_NEW.TITLE}
      pageDescription={PAGES.CONTRIBUTES_NEW.DESCRIPTION}
    >
      <input
        type="text"
        className={styles.titleForm}
        placeholder="まずはタイトルを入力しましょう"
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
