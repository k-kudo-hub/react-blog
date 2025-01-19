import { ContributeInterface } from "src/client/interface/contributes";
import useContributesState from "src/client/state/contributes";

const contributeInterface = new ContributeInterface();

export const useContributes = () => {
  const { contributes, setContributes } = useContributesState();

  const fetchContributes = async () => {
    const contributes = await contributeInterface.getAllContributes();
    setContributes(contributes);
  };

  return { contributes, fetchContributes };
};
