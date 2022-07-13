import { atom } from "recoil";
import { Company } from "src/types";
export const companyListState = atom<Company[]>({
  key: "companyList",
  default: [],
});
