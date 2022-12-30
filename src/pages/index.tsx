import { useEffect, useState } from "react";
import type { NextPage } from "next";
import PAGES from "src/common/constants/pages";
import { get } from "src/common/utils/server";
import FullTemplate from "src/client/components/templates/FullTemplate";
import Contributes from "@components/organisms/Contributes";

const {
  HOME: { TITLE, DESCRIPTION },
} = PAGES;

interface Contribute {
  id: number;
  title: string;
  tags: Tag[];
  content: string;
  lastEditedAt: string;
  publishedAt: string;
}

interface Tag {
  id: number;
  name: string;
  description: string;
}

const Home: NextPage = () => {
  const [contributes, setContributes] = useState<Contribute[]>([]);

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
