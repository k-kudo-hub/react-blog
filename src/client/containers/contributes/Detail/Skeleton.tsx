import styles from "./style.module.scss";
import SingleLineTemplate from "@components/templates/SingleLineTemplate";
import MarkdownViewerSkeleton from "@/client/components/organisms/MarkdownViewer/Skeleton";

export const ContributeDetailPresenterSkeleton: React.FC = () => {
  return (
    <SingleLineTemplate>
      <article className={styles.detailContainer}>
        <MarkdownViewerSkeleton />
      </article>
    </SingleLineTemplate>
  );
};
