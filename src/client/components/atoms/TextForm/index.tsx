import styles from "./style.module.scss";

interface TextFormProps {
  content: string;
  placeholder: string;
  onChange: (content: string) => void;
}

const TextForm: React.FC<TextFormProps> = (props: TextFormProps) => {
  return (
    <input
      type="text"
      className={styles.textForm}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.content}
    />
  );
};

export default TextForm;
