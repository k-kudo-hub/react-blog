import { atom, useAtomValue, useSetAtom } from "jotai";
import Me from "src/client/models/me";

const meState = atom({
  id: "",
  name: "",
  email: "",
  image: "",
  isLoggedIn: false,
} as Me);

// setMeはAuthコンポーネントで呼び出す
const useMeState = () => {
  const me = useAtomValue(meState);
  const setMe = useSetAtom(meState);

  return { me, setMe };
};

export default useMeState;
