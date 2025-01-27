import Image from "next/image";
import Link from "next/link";
import SITE_INFO from "@constants/siteInfo";
import IMAGE_PATH from "../../../styles/images";
import styles from "./style.module.scss";
import useMeState from "src/client/state/me";
import { signIn } from "next-auth/react";
import PAGES from "@constants/pages";
import { useRouter } from "next/navigation";

const Header = () => {
  const {
    me: { isLoggedIn, image: userImage, name },
  } = useMeState();
  const router = useRouter();

  const goToMypage = () => {
    if (!isLoggedIn) {
      signIn();
    } else {
      router.push(PAGES.MYPAGE.PATH);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <Image
          src={IMAGE_PATH.HERO}
          className={styles.heroImage}
          layout="fill"
          priority={true}
          alt="ヘッダー画像"
        />
        <div className={styles.heroTextContainer}>
          <Link href={PAGES.HOME.PATH}>
            <p className={styles.heroText}>{SITE_INFO.TITLE}</p>
          </Link>
        </div>
      </div>
      {!isLoggedIn ? (
        <Image
          className={styles.loginButton}
          onClick={() => signIn()}
          src="/icons/login.svg"
          height={32}
          width={32}
          alt="ログイン"
        />
      ) : (
        <Image
          className={styles.iconButton}
          onClick={() => goToMypage()}
          src={userImage}
          height={36}
          width={36}
          alt={`${name}のユーザーアイコン`}
        />
      )}
    </header>
  );
};

export default Header;
