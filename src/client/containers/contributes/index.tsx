import { useEffect } from "react";
import type { NextPage } from "next";
import Button from "@components/atoms/Buttons";
import Contributes from "@components/organisms/Contributes";
import DoubleLineTemplate from "@components/templates/DoubleLineTemplate";
import PAGES from "../../../common/constants/pages";
import { ContributeInterface } from "../../../client/interface/contributes";
import styles from "./style.module.scss";
import useContributeState from "../../state/contributes";

const contributeInterface = new ContributeInterface();
const {
  HOME: { TITLE, DESCRIPTION },
} = PAGES;

const Home: NextPage = () => {
  const { contributes, setContributes } = useContributeState();

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
        <Button text="+" link={PAGES.CONTRIBUTES_NEW.PATH} />
      </div>
    </DoubleLineTemplate>
  );
};

export default Home;
