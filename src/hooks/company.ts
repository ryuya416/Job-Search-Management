import { useState } from "react";
import {
  Companies,
  CompaniesRespose,
  Company,
  CompanyFilterStatusType,
  CompanyRespose,
  CompanySortType,
} from "src/types";
import { fetcher } from "src/utils/fetcher";
import useSWR from "swr";

// 会社情報を取得するカスタムフック
export const useFetchCompanies = () => {
  const url = "http://localhost:2222/companies";
  const [companyList, setCompanyList] = useState<any>([]);

  const { data: response, error: fetchError } = useSWR<CompaniesRespose>(
    url,
    fetcher
  );
  const companies = response?.data?.companies;
  const isLoading = !response && !fetchError;
  const err = response?.err;
  const isError = err?.statusCode !== 200;
  const errMessage = err?.message;
  return {
    companies,
    isLoading,
    isError,
    errMessage,
  };
};

// companiesをソートするカスタムフック
export const useSortCompanies = (companies?: Company[]) => {
  const [sortType, setSortType] = useState<CompanySortType>("name");
  let sortedCompanies: Company[] = companies ?? [];

  if (!companies) return { sortedCompanies, setSortType };

  // ソート用関数の定義---------------------------------
  const sortCompaniesByName = () => {
    companies.sort((a, b) => (a.name <= b.name ? -1 : 1));
  };

  const sortCompaniesByStatus = () => {
    companies.sort((a, b) => (a.status <= b.status ? -1 : 1));
  };

  // --------------------------------------------------

  // ソート用関数を実行する------------------------------
  switch (sortType) {
    case "name":
      sortCompaniesByName();
      break;
    case "status":
      sortCompaniesByStatus();
      break;
  }
  // ---------------------------------------------------

  return { sortedCompanies, setSortType };
};

//会社を選考ステータスでfilterするカスタムフック
export const useFilterCompaniesByStatus = (companies?: Company[]) => {
  const [filterType, setFilterType] = useState<CompanyFilterStatusType>("全て");
  let filteredCompanies: Company[] = companies ?? [];

  if (!companies) return { filteredCompanies, setFilterType };

  // 会社を選考ステータスでfilterする関数------------------------------
  const filterCompaniesByStatus = (status: CompanyFilterStatusType) => {
    filteredCompanies = companies.filter(
      (company) => company.status === status
    );
  };
  // --------------------------------------------------

  if (filterType !== "全て") {
    filterCompaniesByStatus(filterType);
  }

  return { filteredCompanies, filterType, setFilterType };
};

// 会社情報をcompany_idで取得するカスタムフック
export const useFetchCompaniesByCompanyId = (url: string) => {
  const { data: response, error: fetchError } = useSWR<CompanyRespose>(
    url,
    fetcher
  );
  const err = response?.err;
  return {
    company: response?.data,
    isLoading: !response && !fetchError,
    isError: err?.statusCode !== 200,
    errMessage: err?.message,
  };
};

// 会社情報をcompany_idで削除するカスタムフック
export const useDeleteCompaniesByCompanyId = (
  url: RequestInfo | URL,
  requestOption: RequestInit
) => {
  fetch(url, requestOption)
    .then((res) => res.json())
    .then((json) => {
      if (json.err.statusCode !== 200) {
        console.log("Error:", json);
      } else {
        console.log("Success:", json);
      }
      return { json };
    })
    .catch((err) => {
      console.error("Error:", err);
      return { err };
    });
};

// 会社情報をcompany_idで編集するカスタムフック
export const useEditCompaniesByCompanyId = (
  url: RequestInfo | URL,
  requestOption: RequestInit
) => {
  fetch(url, requestOption)
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
      return { data };
    })
    .catch((error) => {
      console.error("Error:", error);
      return { error };
    });
};
