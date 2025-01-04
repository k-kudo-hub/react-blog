import styles from "./style.module.scss";
import Card from "@components/molecules/Card";

interface IContent {
  id: string | number;
  title: string;
  link: string;
  topContent: JSX.Element;
  bottomContent: JSX.Element;
  coverImageUrl?: string;
}

interface ICardListParams {
  contents: IContent[];
  emptyMessage: string;
}

const CardList = (params: ICardListParams) => {
  const { contents, emptyMessage } = params;

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
        <p>{emptyMessage}</p>
      )}
    </section>
  );
};

export default CardList;
