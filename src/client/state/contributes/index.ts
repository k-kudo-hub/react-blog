import { atom, useAtomValue, useSetAtom } from "jotai";
import { Contribute } from "src/client/models/contribute";

const contributesState = atom([] as Contribute[]);

const useContributesState = () => {
  const contributes = useAtomValue(contributesState);
  const setContributes = useSetAtom(contributesState);

  return { contributes, setContributes };
};

export default useContributesState;
