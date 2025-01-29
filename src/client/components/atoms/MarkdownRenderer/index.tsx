import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./style.module.scss";
import CodeBlock from "./CodeBlock";
import remarkBreaks from "remark-breaks";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = (props: MarkdownRendererProps) => {
  const { content } = props;
  return (
    <div className={styles.markdownContainer}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          code: CodeBlock,
          p: ({ children }) => (
            <p style={{ marginBottom: "12px" }}>{children}</p>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
