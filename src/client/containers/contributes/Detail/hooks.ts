import { FLASH_TYPE, useFlashMessage } from "@components/atoms/Flash";
import { CONTRIBUTE_STATUS } from "@server/domain/entity/contribute";
import { useRef, useState } from "react";
import { ContributeInterface } from "../../../interface/contributes";
import { Contribute } from "src/client/models/contribute";
import useContributeState from "src/client/state/contributes/contribute";
import useMeState from "src/client/state/me";
import { useRouter } from "next/router";
import PAGES from "@constants/pages";

const contributeInterface = new ContributeInterface();

export const useRouterProps = () => {
  const {
    query: { identityCode },
    query,
  } = useRouter();
  return { query, identityCode };
};

export const useDeleteModal = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const openDeleteModal = () => setIsOpenDeleteModal(true);
  const closeDeleteModal = () => setIsOpenDeleteModal(false);
  return { isOpenDeleteModal, openDeleteModal, closeDeleteModal };
};

export const useContribute = () => {
  const isEditableContribute = useRef<boolean>(false);
  const router = useRouter();

  const {
    me: { id: meId },
  } = useMeState();
  const { contribute, setContribute } = useContributeState();
  const { closeDeleteModal } = useDeleteModal();
  const { showFlashMessage } = useFlashMessage();

  const fetchContribute = async (identityCode: string) => {
    const contribute = await contributeInterface.getContribute(identityCode);
    setContribute(contribute);
    setIsEditableContribute(contribute);
  };

  const deleteContribute = async () => {
    if (!contribute) {
      return;
    }
    const result = await contributeInterface.deleteContribute(
      contribute.identityCode,
    );
    if (!result) {
      showFlashMessage("投稿の削除に失敗しました。", FLASH_TYPE.ERROR);
      closeDeleteModal();
      return;
    }

    showFlashMessage("投稿を削除しました。", FLASH_TYPE.SUCCESS);
    router.push(PAGES.HOME.PATH);
  };

  const setIsEditableContribute = (contribute: Contribute | undefined) => {
    if (
      contribute?.userId === meId &&
      contribute?.status !== CONTRIBUTE_STATUS.DELETED
    ) {
      isEditableContribute.current = true;
    }
    return isEditableContribute.current;
  };

  return {
    fetchContribute,
    contribute,
    isEditableContribute,
    deleteContribute,
  };
};
