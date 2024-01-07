import Image from "next/image";
import Link from "next/link";
import SITE_INFO from "@constants/siteInfo";
import IMAGE_PATH from "../../../styles/images";
import styles from "./style.module.scss";
import useUserState from "src/client/state/ussr";
import { signIn } from "next-auth/react";

const Header = () => {
  const {
    user: { isLoggedIn, image: userImage },
  } = useUserState();

  return (
    <header className={styles.header}>
      <div className={styles.hero}>
        <Image
          src={IMAGE_PATH.HERO}
          layout="fill"
          objectFit="cover"
          priority={true}
          alt="ヘッダー画像"
        />
        <div className={styles.heroTextContainer}>
          <Link href={"/"}>
            <p className={styles.heroText}>{SITE_INFO.TITLE}</p>
          </Link>
        </div>
      </div>
      {!isLoggedIn ? (
        <Image
          className={styles.loginButton}
          onClick={() => signIn()}
          src="/icons/login.svg"
          objectFit="cover"
          height={32}
          width={32}
          alt="ログイン"
        />
      ) : (
        <Image
          className={styles.iconButton}
          src={userImage}
          objectFit="cover"
          height={36}
          width={36}
          alt="ユーザー"
        />
      )}
    </header>
  );
};

export default Header;
