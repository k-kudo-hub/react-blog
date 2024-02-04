import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Me from "src/client/models/me";
import useMeState from "src/client/state/me";

const AUTH_STATUS = {
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
  LOADING: "loading",
} as const;

/**
 * ユーザー情報を取得してstateに保存するためのコンポーネント
 * 基本的にここ以外ではsetMeを使わないことにしたい
 */
const Auth = () => {
  const { setMe } = useMeState();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === AUTH_STATUS.AUTHENTICATED) {
      const user = {
        ...data.user,
        isLoggedIn: true,
      } as Me;
      setMe(user);
    } else {
      const user = {
        id: "",
        email: "",
        name: "",
        image: "",
        isLoggedIn: false,
      };
      setMe(user);
    }
  }, [status, data]);

  return <></>;
};

export default Auth;
