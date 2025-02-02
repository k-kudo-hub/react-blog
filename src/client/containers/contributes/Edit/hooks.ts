import { FLASH_TYPE, useFlashMessage } from "@/client/components/atoms/Flash";
import useExclusiveControl from "@/client/hooks/useExclusiveControl";
import { useUpdateEffect } from "@/client/hooks/useUpdateEffect";
import { ContributeInterface } from "@/client/interface/contributes";
import useContributeState from "@/client/state/contributes/contribute";
import PAGES from "@/common/constants/pages";
import { CONTRIBUTE_STATUS } from "@/server/domain/entity/contribute";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ここに置くべきではなさそう
const AUTO_SAVE_INTERVAL = 10000; // 自動保存の間隔 (単位:ms)
const contributeInterface = new ContributeInterface();

export const usePublishModal = () => {
  const [isOpenStatusModal, setIsOpenStatusModal] = useState<boolean>(false);
  const openStatusModal = () => {
    setIsOpenStatusModal(true);
  };
  const closeStatusModal = () => {
    setIsOpenStatusModal(false);
  };
  return { isOpenStatusModal, openStatusModal, closeStatusModal };
};

export const useContributeEditor = (identityCode: string) => {
  const router = useRouter();
  const exclude = useExclusiveControl();
  const { showFlashMessage } = useFlashMessage();
  const { contribute, setContribute } = useContributeState();
  const [saveTimer, setSaveTimer] = useState<NodeJS.Timeout | undefined>(
    undefined,
  );
  const canPublish = contribute?.status === CONTRIBUTE_STATUS.DRAFT;

  useEffect(() => {
    if (identityCode) {
      fetchContribute(identityCode as string);
    }
  }, [identityCode]);

  useUpdateEffect(() => {
    clearTimeout(saveTimer);
    setSaveTimer(setTimeout(updateContribute, AUTO_SAVE_INTERVAL));
  }, [contribute]);

  const fetchContribute = async (identityCode: string) => {
    const contribute = await contributeInterface.getContribute(identityCode);
    setContribute(contribute);
  };

  const setTitle = (title: string) => {
    if (!contribute) {
      return;
    }
    setContribute({ ...contribute, title });
  };

  const setContent = (content: string) => {
    if (!contribute) {
      return;
    }
    setContribute({ ...contribute, content });
  };

  const updateContribute = async () => {
    if (!contribute?.identityCode) {
      return;
    }

    exclude(async () => {
      await contributeInterface.updateContribute(contribute);
    }, 500);
  };

  const updateContributeStatus = async () => {
    if (!contribute?.identityCode) {
      return;
    }

    exclude(async () => {
      setContribute({
        ...contribute,
        status: CONTRIBUTE_STATUS.PUBLISHED,
      });
      const updatedContribute =
        await contributeInterface.updateContributeStatus({
          ...contribute,
          status: CONTRIBUTE_STATUS.PUBLISHED,
        });
      if (!updatedContribute) {
        showFlashMessage(
          "記事の公開に失敗しました。もう1度お試しいただくか、カスタマーサポートまでご連絡ください。",
          FLASH_TYPE.ERROR,
        );
      } else {
        showFlashMessage(`記事を公開しました。`, FLASH_TYPE.SUCCESS);
        router.push(PAGES.HOME.PATH);
      }
    }, 500);
  };

  return {
    contribute,
    canPublish,
    setTitle,
    setContent,
    updateContributeStatus,
  };
};
