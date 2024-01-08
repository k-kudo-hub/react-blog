import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Contribute } from "../../../models/contribute";
import { ContributeInterface } from "../../../interface/contributes";
import styles from "./style.module.scss";
import SingleLineTemplate from "@components/templates/SingleLineTemplate";
import ContributeContent from "@components/organisms/Contribute";

const contributeInterface = new ContributeInterface();

const ContributeDetail: NextPage = () => {
  const router = useRouter();
  const [contribute, setContribute] = useState<Contribute>();

  useEffect(() => {
    if (router.query.identityCode) {
      fetchContribute(router.query.identityCode as string);
    }
  }, [router.query]);

  const fetchContribute = async (identityCode: string) => {
    const contribute = await contributeInterface.getContribute(identityCode);
    setContribute(contribute);
  };

  return (
    <SingleLineTemplate pageTitle={contribute?.title}>
      <div className={styles.detailContainer}>
        <ContributeContent contribute={contribute as Contribute} />
      </div>
    </SingleLineTemplate>
  );
};
export default ContributeDetail;
