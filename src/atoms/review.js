import { atom } from "recoil";

export const filterListAtom = atom({
  key: "filerListAtom",
  default: [],
});

export const listViewAtom = atom({
  key: "listViewAtom",
  default: "LIST",
});
