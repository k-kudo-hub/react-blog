import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from "./style.module.scss";

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
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
