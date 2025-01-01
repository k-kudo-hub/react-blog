import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { Contribute } from "src/client/models/contribute";
import { RECOIL_KEYS } from "../../";

const contributeState = atom({
  key: RECOIL_KEYS.CONTRIBUTE,
  default: undefined as Contribute | undefined,
});

const useContributeState = () => {
  const contribute = useRecoilValue(contributeState);
  const setContribute = useSetRecoilState(contributeState);

  return { contribute, setContribute };
};

export default useContributeState;
