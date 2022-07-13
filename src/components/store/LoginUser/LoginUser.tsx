import { atom } from "recoil";

type UserType = {
  email: string;
  password: string;
};

export const isLoginState = atom<UserType>({
  key: "isLoginState",
  default: {
    email: "",
    password: "",
  },
});
