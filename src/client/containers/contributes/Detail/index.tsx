import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Contribute as ContributeType } from "../../../models/contribute";
import { ContributeInterface } from "../../../interface/contributes";
import styles from "./style.module.scss";
import CodeBlock from "./CodeBlock";
import IMAGE_PATH from "../../../styles/images";
import SingleLineTemplate from "@components/templates/SingleLineTemplate";

const contributeInterface = new ContributeInterface();

const ContributeDetail: NextPage = () => {
  const router = useRouter();
  const [contribute, setContribute] = useState<ContributeType>();

  useEffect(() => {
    if (router.query.identityCode) {
      fetchContribute(router.query.identityCode as string);
    }
  }, [router.query]);

  const fetchContribute = async (identityCode: string) => {
    const contribute = await contributeInterface.getContribute(identityCode);
    setContribute(contribute);
  };

  return (
    <SingleLineTemplate pageTitle={contribute?.title}>
      <div className={styles.detailContainer}>
        <section className={styles.detailHeader}>
          <div className={styles.userInfoContainer}>
            <div className={styles.userInfo}>
              <div className={styles.userIcon}>
                <Image src={IMAGE_PATH.FIRE_ICON} width={30} height={30} />
              </div>
              <span>@{contribute?.user.nickName}</span>
            </div>
            <div className={styles.publishedAtContainer}>
              {contribute?.publishedAt ? (
                <span>公開日: {contribute?.publishedAt}</span>
              ) : null}
              {contribute?.lastEditedAt ? (
                <span>更新日: {contribute?.lastEditedAt}</span>
              ) : null}
            </div>
          </div>
          <h1 className={styles.title}>{contribute?.title}</h1>
          <p>
            {contribute?.tags?.map((tag) => (
              <span className={styles.tag} key={tag.id}>
                # {tag.name}
              </span>
            ))}
          </p>
        </section>
        <section className={styles.detailBody}>
          <div className={styles.markdownContainer}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock,
              }}
            >
              {contribute?.content as string}
            </ReactMarkdown>
          </div>
        </section>
      </div>
    </SingleLineTemplate>
  );
};
export default ContributeDetail;
