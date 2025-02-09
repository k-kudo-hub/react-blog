import { NextPage } from "next";
import EditContributeSkeleton from "./Skeleton";
import { useContributeEditor, usePublishModal } from "./hooks";
import ContributeEditPresenter from "./presenter";
import { use } from "react";

type IContributeEditProps = {
  params: Promise<{
    identityCode: string;
  }>;
};

const EditContribute: NextPage<IContributeEditProps> = ({
  params,
}: IContributeEditProps) => {
  const { identityCode } = use(params);
  const {
    contribute,
    setTitle,
    setContent,
    updateContributeStatus,
    canPublish,
  } = useContributeEditor(identityCode);
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
