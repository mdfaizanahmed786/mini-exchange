import { atom } from "recoil";

const todoState = atom({
  key: "todoState",
  default: [],
});

export { todoState };