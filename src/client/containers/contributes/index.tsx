import { useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRecoilState } from "recoil";
import Contributes from "@components/organisms/Contributes";
import DoubleLineTemplate from "@components/templates/DoubleLineTemplate";
import PAGES from "../../../common/constants/pages";
import contributesState from "../../state/contributes";
import { Contribute } from "../../models/contribute";
import { ContributeInterface } from "../../../client/interface/contributes";
import styles from "./style.module.scss";

const contributeInterface = new ContributeInterface();
const {
  HOME: { TITLE, DESCRIPTION },
} = PAGES;

const Home: NextPage = () => {
  const [contributes, setContributes] =
    useRecoilState<Contribute[]>(contributesState);

  useEffect(() => {
    fetchContributes();
  }, []);

  const fetchContributes = async () => {
    const contributes = await contributeInterface.getAllContributes();
    setContributes(contributes);
  };

  const asideContent = <p></p>;

  return (
    <DoubleLineTemplate
      asideContent={asideContent}
      pageTitle={TITLE}
      pageDescription={DESCRIPTION}
    >
      <Contributes contributes={contributes} />
      <div className={styles.floatButtonContainer}>
        <Link href="/">
          <div className={styles.floatButton}>
            <a className={styles.buttonText}>+</a>
          </div>
        </Link>
      </div>
    </DoubleLineTemplate>
  );
};

export default Home;
