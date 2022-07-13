import { atom } from "recoil";

// コマンドパレットを表示させるフラグ
export const isOpenState = atom<boolean>({
  key: "isOpen",
  default: false,
});

// 検索ワード
export const searchState = atom<string>({
  key: "search",
  default: "",
});
