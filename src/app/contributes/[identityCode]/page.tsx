import { createOpenGraphImage } from "@/client/hooks/useOpengraphImage";
import { ContributeInterface } from "@/client/interface/contributes";
import ContributeDetail from "@containers/contributes/Detail";

const contributeInterface = new ContributeInterface();
export const generateMetadata = async ({
  params,
}: {
  params: {
    identityCode: string;
  };
}) => {
  const contribute = await contributeInterface.getContribute(
    params.identityCode,
  );
  return createOpenGraphImage({
    title: contribute?.title as string,
    description: contribute?.content as string,
    url: `/contributes/${contribute?.identityCode}`,
    imagePath: "/images/pr_logo.png",
  });
};

export default ContributeDetail;
