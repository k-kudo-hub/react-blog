import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { User } from "src/client/models/user";
import useUserState from "src/client/state/ussr";

/**
 * ユーザー情報を取得してstateに保存するためのコンポーネント
 * 基本的にここ以外ではsetUserを使わないことにしたい
 */
const Auth = () => {
  const { setUser } = useUserState();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const user = {
        ...data.user,
        isLoggedIn: true,
      } as User;
      setUser(user);
    } else {
      const user = {
        email: "",
        name: "",
        image: "",
        isLoggedIn: false,
      };
      setUser(user);
    }
  }, [status, data]);

  return <></>;
};

export default Auth;
