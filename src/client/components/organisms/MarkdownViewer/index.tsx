import styles from "./style.module.scss";
import MarkdownRenderer from "@components/atoms/MarkdownRenderer";
import Header from "@components/molecules/Header";

interface MarkdownViewerProps {
  imageWithTextElement: React.ReactNode;
  navigationElement: React.ReactNode;
  tagElement: React.ReactNode;
  title: string;
  content: string;
}

const MarkdownViewer = (props: MarkdownViewerProps) => {
  const {
    imageWithTextElement,
    navigationElement,
    tagElement,
    title,
    content,
  } = props;
  return (
    <>
      <section className={styles.detailHeader}>
        <Header
          userInfoElement={imageWithTextElement}
          navigationElement={navigationElement}
          tagElement={tagElement}
          title={title}
        />
      </section>
      <section className={styles.detailBody}>
        <MarkdownRenderer content={content} />
      </section>
    </>
  );
};

export default MarkdownViewer;
