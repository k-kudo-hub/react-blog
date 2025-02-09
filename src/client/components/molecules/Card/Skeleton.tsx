import styles from "./style.module.scss";

const EmptyCard = (): React.ReactNode => {
  return (
    <div className={styles.card}>
      <div className={[styles.cardHeader, styles.skeleton].join(" ")}></div>
      <div className={styles.cardBody}>
        <div
          className={[styles.cardBodyHeader, styles.skeleton].join(" ")}
        ></div>
        <p className={styles.skeleton}> </p>
        <div className={[styles.cardBodyFooter, styles.skeleton].join(" ")}>
          <div className={[styles.tags, styles.skeleton].join(" ")}></div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
