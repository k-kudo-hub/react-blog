import styles from "./style.module.scss";
import SkeletonHeader from "../../molecules/Header/Skeleton";

const MarkdownViewerSkeleton = () => {
  return (
    <>
      <section className={styles.detailHeader}>
        <SkeletonHeader />
      </section>
      <section
        className={[styles.detailBody, styles.skeleton].join(" ")}
      ></section>
    </>
  );
};

export default MarkdownViewerSkeleton;
