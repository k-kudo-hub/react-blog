import styles from "./style.module.scss";

const TextFormSkeleton = () => {
  return (
    <input
      type="text"
      className={[styles.textForm, styles.skeleton].join(" ")}
    />
  );
};

export default TextFormSkeleton;
