import styles from "./styles.module.scss";
import TextFormSkeleton from "@/client/components/atoms/TextForm/Skeleton";

const EditContributeSkeleton = () => {
  return (
    <section>
      <TextFormSkeleton />
      <div className={styles.contentContainer}>
        <div
          className={[styles.writeContainer, styles.skeleton].join(" ")}
        ></div>
        <div className={[styles.previewContainer, styles.skeleton].join(" ")}>
          <div className={styles.preview}></div>
        </div>
      </div>
    </section>
  );
};

export default EditContributeSkeleton;
