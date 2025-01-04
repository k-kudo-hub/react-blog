import { useEffect } from "react";
import type { NextPage } from "next";
import FloatButton from "@components/atoms/Buttons/FloatButton/index";
import Contributes from "@components/organisms/Contributes";
import DoubleLineTemplate from "@components/templates/DoubleLineTemplate";
import PAGES from "../../../common/constants/pages";
import { ContributeInterface } from "../../../client/interface/contributes";
import styles from "./style.module.scss";
import useContributesState from "../../state/contributes";

const contributeInterface = new ContributeInterface();
const {
  HOME: { TITLE, DESCRIPTION },
} = PAGES;

const Home: NextPage = () => {
  const { contributes, setContributes } = useContributesState();

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
        <FloatButton text="+" link={PAGES.CONTRIBUTES_NEW.PATH} />
      </div>
    </DoubleLineTemplate>
  );
};

export default Home;
