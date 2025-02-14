import EmptyCard from "../../molecules/Card/Skeleton";
import styles from "./style.module.scss";
import Card from "@components/molecules/Card";

interface IContent {
  id: string | number;
  title: string;
  link: string;
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  coverImageUrl?: string;
}

interface ICardListParams {
  contents: IContent[];
}

const CardList = (params: ICardListParams) => {
  const { contents } = params;

  return (
    <section className={styles.cardListContainer}>
      {contents.length ? (
        contents.map((content) => (
          <Card
            key={content.id}
            uniqueKey={content.id}
            topContent={content.topContent}
            titleText={content.title}
            titleLink={content.link}
            bottomContent={content.bottomContent}
          />
        ))
      ) : (
        <EmptyCard />
      )}
    </section>
  );
};

export default CardList;
