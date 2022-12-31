import { atom } from "recoil";
import { Contribute } from "src/client/models/contribute";

export const contributesState = atom({
  key: "Contributes",
  default: [] as Contribute[],
});
