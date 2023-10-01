import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Contribute } from "src/client/models/contribute";
import { RECOIL_KEYS } from "..";

const contributesState = atom({
  key: RECOIL_KEYS.CONTRIBUTES,
  default: [] as Contribute[],
});

const useContributeState = () => {
  const contributes = useRecoilValue(contributesState);
  const setContributes = useSetRecoilState(contributesState);

  return { contributes, setContributes };
};

export default useContributeState;
