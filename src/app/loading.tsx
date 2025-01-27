"use client";

import DoubleLineTemplate from "@/client/components/templates/DoubleLineTemplate";
import { NextPage } from "next";
import styles from "./style.module.scss";
import EmptyCard from "@/client/components/molecules/Card/Skeleton";

const Loading: NextPage = () => {
  return (
    <DoubleLineTemplate>
      <div className={styles.cardListContainer}>
        <EmptyCard />
      </div>
    </DoubleLineTemplate>
  );
};

export default Loading;
