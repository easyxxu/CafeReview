import { atom } from "recoil";

export const commentFormInfoAtom = atom({
  key: "commentFormInfoAtom",
  default: {
    type: "ADD",
    commentId: null,
  },
});

export const commentsAtom = atom({
  key: "commentsAtom",
  default: [],
});
