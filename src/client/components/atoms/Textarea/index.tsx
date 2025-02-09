import styles from "./style.module.scss";

interface TextareaProps {
  content: string;
  placeholder: string;
  onChange: (content: string) => void;
}

const Textarea = (props: TextareaProps): React.ReactNode => {
  return (
    <textarea
      id="content"
      name="content"
      value={props.content}
      className={styles.contentForm}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
    />
  );
};

export default Textarea;
