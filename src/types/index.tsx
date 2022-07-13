export type Company = {
  id: string;
  name: string;
  memo: string;
  status: string;
  createdAt: string;
};

export type Companies = Company[];

export type CompaniesData = { companies: Companies } | null;

export type CompaniesError = {
  statusCode: number;
  type: string;
  message: string;
};

export type CompaniesRespose =
  | { data: CompaniesData; err: CompaniesError }
  | undefined;

export type CompanyError = {
  statusCode: number;
  type: string;
  message: string;
};

export type CompanyRespose = { data: Company; err: CompanyError } | undefined;

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
