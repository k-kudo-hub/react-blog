interface Contribute {
  id: number;
  title: string;
  tags: string[];
}

export const getAllContributes = () => {
  const dummyContributes: Contribute[] = [
    {
      id: 1,
      title: "Reactのこれまでとこれから",
      tags: ["React", "Javascript"],
    },
    { id: 2, title: "初心者エンジニア放浪記 - 1", tags: ["初心者"] },
    { id: 3, title: "プロジェクトマネジメント論", tags: [] },
  ];

  return dummyContributes;
};
