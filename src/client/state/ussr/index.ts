import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { User } from "src/client/models/user";
import { RECOIL_KEYS } from "..";

const userState = atom({
  key: RECOIL_KEYS.USER,
  default: {
    id: "",
    name: "",
    email: "",
    image: "",
    isLoggedIn: false,
  } as User,
});

// setUserはAuthコンポーネントで呼び出す
const useUserState = () => {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);

  return { user, setUser };
};

export default useUserState;
