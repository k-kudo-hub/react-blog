"use client";

import { ContributeDetailPresenter } from "./presenter";
import { useContribute, useDeleteModal } from "./hooks";
import { useEffect } from "react";
import { ContributeDetailPresenterSkeleton } from "./Skeleton";
import { use } from "react";

type PageProps = {
  params: Promise<{
    identityCode: string;
  }>;
};

const ContributeDetail = (props: PageProps) => {
  const { identityCode } = use(props.params);
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
  }, [identityCode]);

  return contribute ? (
    <ContributeDetailPresenter
      contribute={contribute}
      isEditableContribute={isEditableContribute}
      isOpenDeleteModal={isOpenDeleteModal}
      openDeleteModal={openDeleteModal}
      closeDeleteModal={closeDeleteModal}
      deleteContribute={deleteContribute}
    />
  ) : (
    <ContributeDetailPresenterSkeleton />
  );
};
export default ContributeDetail;
