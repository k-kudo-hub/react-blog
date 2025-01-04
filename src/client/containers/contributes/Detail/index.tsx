import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Contribute } from "../../../models/contribute";
import { ContributeInterface } from "../../../interface/contributes";
import styles from "./style.module.scss";
import SingleLineTemplate from "@components/templates/SingleLineTemplate";
import ContributeContent from "@components/organisms/Contribute";
import FloatButton from "@components/atoms/Buttons/FloatButton/index";
import useMeState from "src/client/state/me";
import useContributeState from "src/client/state/contributes/contribute";

const contributeInterface = new ContributeInterface();

const ContributeDetail: NextPage = () => {
  const router = useRouter();
  const isEditableContribute = useRef<boolean>(false);
  const { contribute, setContribute } = useContributeState();
  const {
    me: { id: meId },
  } = useMeState();

  useEffect(() => {
    if (router.query.identityCode) {
      fetchContribute(router.query.identityCode as string);
    }
  }, [router.query]);

  useEffect(() => {
    if (contribute?.userId === meId) {
      isEditableContribute.current = true;
    }
  });

  const fetchContribute = async (identityCode: string) => {
    const contribute = await contributeInterface.getContribute(identityCode);
    setContribute(contribute);
  };

  return (
    <SingleLineTemplate pageTitle={contribute?.title}>
      <div className={styles.detailContainer}>
        <ContributeContent contribute={contribute as Contribute} />
        {isEditableContribute.current ? (
          <div className={styles.floatButtonContainer}>
            <FloatButton
              text="#"
              link={`/contributes/${contribute?.identityCode}/edit`}
            />
          </div>
        ) : null}
      </div>
    </SingleLineTemplate>
  );
};
export default ContributeDetail;
