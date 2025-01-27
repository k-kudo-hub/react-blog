import styles from "./style.module.scss";

const DUMMY_TEXT = "　";

const SkeletonHeader = () => {
  return (
    <>
      <div className={styles.userInfoContainer}>
        <div className={[styles.userInfo, styles.skeleton].join(" ")}>
          {DUMMY_TEXT}
        </div>
        <div
          className={[styles.publishedAtContainer, styles.skeleton].join(" ")}
        >
          {DUMMY_TEXT}
        </div>
      </div>
      <h1 className={[styles.title, styles.skeleton].join(" ")}>
        {DUMMY_TEXT}
      </h1>
      <div className={[styles.tags, styles.skeleton].join(" ")}>
        {DUMMY_TEXT}
      </div>
    </>
  );
};

export default SkeletonHeader;
