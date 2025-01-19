import { ContributeInterface } from "src/client/interface/contributes";
import useContributesState from "src/client/state/contributes";
import useMeState from "src/client/state/me";

const contributeInterface = new ContributeInterface();

export const useContributes = () => {
  const {
    me: { id: meId },
  } = useMeState();
  const { contributes, setContributes } = useContributesState();

  const fetchContributes = async () => {
    const contributes = await contributeInterface.getMyContributes(meId);
    setContributes(contributes);
  };

  return { contributes, fetchContributes };
};
