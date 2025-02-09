import styles from "./style.module.scss";

interface HeaderProps {
  userInfoElement: React.ReactNode;
  navigationElement: React.ReactNode;
  title: string;
  tagElement: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  const { userInfoElement, navigationElement, title, tagElement } = props;
  return (
    <>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfo}>{userInfoElement}</div>
        <div className={styles.publishedAtContainer}>{navigationElement}</div>
      </div>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.tags}>{tagElement}</div>
    </>
  );
};

export default Header;
