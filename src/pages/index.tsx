import { useEffect, useState } from "react";
import type { NextPage } from "next";
import FullTemplate from "src/client/components/templates/FullTemplate";
import PAGES from "src/common/constants/pages";
import { get } from "src/common/utils/server";

const {
  HOME: { TITLE, DESCRIPTION },
} = PAGES;

interface contribute {
  id: number;
  title: string;
  tags: string[];
}

const Home: NextPage = () => {
  const [contributes, setContributes] = useState<contribute[]>([]);

  useEffect(() => {
    const fetchContributes = async () => {
      const response = await get("/contributes");
      setContributes(response.contributes);
    };
    fetchContributes();
  }, []);

  return (
    <FullTemplate pageTitle={TITLE} pageDescription={DESCRIPTION}>
      <main>
        {contributes.length ? (
          contributes.map((contribute) => (
            <div key={contribute.id}>
              <p>{contribute.id}</p>
              <p>{contribute.title}</p>
              <ul>
                {contribute.tags?.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>投稿はまだありません</p>
        )}
      </main>
    </FullTemplate>
  );
};

export default Home;
