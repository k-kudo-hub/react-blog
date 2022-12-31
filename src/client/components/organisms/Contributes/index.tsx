import styles from "./style.module.scss";
import Contribute from "../../molecules/Contribute";
import { Contribute as ContributeType } from "../../../models/contribute";

const Contributes = ({ contributes }: { contributes: ContributeType[] }) => {
  return (
    <div className={styles.contributes}>
      {contributes.length ? (
        contributes.map((contribute) => (
          <Contribute contribute={contribute} key={contribute.id} />
        ))
      ) : (
        <p>投稿はまだありません</p>
      )}
    </div>
  );
};

export default Contributes;
