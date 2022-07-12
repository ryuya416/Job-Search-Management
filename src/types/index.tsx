export type Company = {
  id: string;
  memo: string;
  name: string;
  status: string;
};

export type Companies = { companies: Company[] } | undefined;

export type CompanySortType = "name" | "status";

export type CompanyFilterStatusType =
  | "全て"
  | "書類選考"
  | "一次面接"
  | "二次面接"
  | "最終面接"
  | "採用"
  | "不採用";

export type StatusListType = {
  id: number;
  color: string;
  value: string;
}[];
