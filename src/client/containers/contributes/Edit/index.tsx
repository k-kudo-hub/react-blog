import { NextPage } from "next";
import EditContributeSkeleton from "./Skeleton";
import { useContributeEditor, usePublishModal } from "./hooks";
import ContributeEditPresenter from "./presenter";

type IContributeEditProps = {
  params: {
    identityCode: string;
  };
};

const EditContribute: NextPage<IContributeEditProps> = ({
  params,
}: IContributeEditProps) => {
  const {
    contribute,
    setTitle,
    setContent,
    updateContributeStatus,
    canPublish,
  } = useContributeEditor(params.identityCode);
  const { isOpenStatusModal, openStatusModal, closeStatusModal } =
    usePublishModal();

  return contribute ? (
    <ContributeEditPresenter
      contribute={contribute}
      setTitle={setTitle}
      setContent={setContent}
      updateContributeStatus={updateContributeStatus}
      canPublish={canPublish}
      isOpenStatusModal={isOpenStatusModal}
      openStatusModal={openStatusModal}
      closeStatusModal={closeStatusModal}
    />
  ) : (
    <EditContributeSkeleton />
  );
};

export default EditContribute;
