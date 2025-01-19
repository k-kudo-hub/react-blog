import { NextPage } from "next";
import { useEffect } from "react";
import { ContributeDetailPresenter } from "./presenter";
import { useContribute, useDeleteModal, useRouterProps } from "./hooks";

const ContributeDetail: NextPage = () => {
  const { query, identityCode } = useRouterProps();
  const {
    contribute,
    isEditableContribute,
    fetchContribute,
    deleteContribute,
  } = useContribute();
  const { isOpenDeleteModal, openDeleteModal, closeDeleteModal } =
    useDeleteModal();

  useEffect(() => {
    if (identityCode) {
      fetchContribute(identityCode as string);
    }
  }, [query]);

  return contribute ? (
    <ContributeDetailPresenter
      contribute={contribute}
      isEditableContribute={isEditableContribute}
      isOpenDeleteModal={isOpenDeleteModal}
      openDeleteModal={openDeleteModal}
      closeDeleteModal={closeDeleteModal}
      deleteContribute={deleteContribute}
    />
  ) : null;
};
export default ContributeDetail;
