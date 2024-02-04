import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { RECOIL_KEYS } from "..";
import Me from "src/client/models/me";

const meState = atom({
  key: RECOIL_KEYS.ME,
  default: {
    id: "",
    name: "",
    email: "",
    image: "",
    isLoggedIn: false,
  } as Me,
});

// setMeはAuthコンポーネントで呼び出す
const useMeState = () => {
  const me = useRecoilValue(meState);
  const setMe = useSetRecoilState(meState);

  return { me, setMe };
};

export default useMeState;
