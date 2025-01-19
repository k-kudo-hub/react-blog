import { NextPage } from "next";
import { useContributes } from "./hooks";
import { useEffect } from "react";
import { MyPagePresenter } from "./presenter";

const MyPage: NextPage = () => {
  const { contributes, fetchContributes } = useContributes();

  useEffect(() => {
    fetchContributes();
  }, []);

  return <MyPagePresenter contributes={contributes} />;
};

export default MyPage;
