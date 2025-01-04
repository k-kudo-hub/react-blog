import style from "./style.module.scss";

interface ButtonProps {
  text: string;
  onClick: () => void;
  type: "main" | "sub";
}

const Button = (props: ButtonProps) => {
  const { text, onClick, type } = props;

  return (
    <button
      className={type === "main" ? style.main : style.sub}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
