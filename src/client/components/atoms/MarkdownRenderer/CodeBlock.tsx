import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./style.module.scss";
import { ComponentPropsWithoutRef } from "react";
import { Components } from "react-markdown";

type TCodeBlockProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  className?: string;
};

const CodeBlock: Components["code"] = ({
  inline,
  className,
  children,
}: TCodeBlockProps) => {
  const match = /language-(\w+)(:.+)/.exec(className || "");
  const language = match && match[1] ? match[1] : "";
  const name = match && match[2] ? match[2].slice(1) : "";
  return inline ? (
    <code className={className}>{children}</code>
  ) : (
    <div className={styles.syntaxHighlightContainer}>
      <div className={styles.syntaxHighlightFileName}>{name}</div>
      <SyntaxHighlighter style={atomDark} language={language}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
