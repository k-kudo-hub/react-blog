import { atom } from "recoil";
import { Contribute } from "src/client/models/contribute";
import { RECOIL_KEYS } from "..";

const contributesState = atom({
  key: RECOIL_KEYS.CONTRIBUTES,
  default: [] as Contribute[],
});

export default contributesState;
