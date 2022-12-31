import { useEffect } from "react";
import type { NextPage } from "next";
import PAGES from "src/common/constants/pages";
import { get } from "src/common/utils/server";
import FullTemplate from "src/client/components/templates/FullTemplate";
import Contributes from "@components/organisms/Contributes";
import { contributesState } from "src/client/state/contributes";
import { useRecoilState } from "recoil";

const {
  HOME: { TITLE, DESCRIPTION },
} = PAGES;

const Home: NextPage = () => {
  const [contributes, setContributes] = useRecoilState(contributesState);

  useEffect(() => {
    // TODO: どこかに逃す
    const fetchContributes = async () => {
      const response = await get("/contributes");
      const contribute = response?.data || [];
      setContributes(contribute);
    };
    fetchContributes();
  }, []);

  const asideContent = <p></p>;

  return (
    <FullTemplate
      asideContent={asideContent}
      pageTitle={TITLE}
      pageDescription={DESCRIPTION}
    >
      <Contributes contributes={contributes} />
    </FullTemplate>
  );
};

export default Home;
