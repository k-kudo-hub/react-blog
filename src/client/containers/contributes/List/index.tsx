"use client";

import { useEffect } from "react";
import type { NextPage } from "next";
import { ContributeListPresenter } from "./presenter";
import { useContributes } from "./hooks";

const Home: NextPage = () => {
  const { contributes, fetchContributes } = useContributes();

  useEffect(() => {
    fetchContributes();
  }, []);

  return <ContributeListPresenter contributes={contributes} />;
};

export default Home;
