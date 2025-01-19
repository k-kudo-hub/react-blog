import { ContributeListPresenter } from "@containers/contributes/List/presenter";
import { Contribute } from "src/client/models/contribute";

type TProps = {
  contributes: Contribute[];
};

export const MyPagePresenter: React.FC<TProps> = ({ contributes }) => {
  return <ContributeListPresenter contributes={contributes} />;
};
