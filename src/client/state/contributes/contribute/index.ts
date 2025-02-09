import { atom, useAtomValue, useSetAtom } from "jotai";
import { Contribute } from "src/client/models/contribute";

const contributeState = atom(undefined as Contribute | undefined);

const useContributeState = () => {
  const contribute = useAtomValue(contributeState);
  const setContribute = useSetAtom(contributeState);

  return { contribute, setContribute };
};

export default useContributeState;
