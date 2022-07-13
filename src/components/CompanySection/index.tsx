import { Box, HStack, Select, Spacer, Text } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useSetRecoilState } from "recoil";
import { SwitchIconDisplayCheckbox } from "src/components/Checkbox/SwitchIconDisplayCheckbox";
import { CompanyCardList } from "src/components/CompanySection/CompanyCardList";
import { companyListState } from "src/components/store/Sort/CompanyListSort";
import {
  Companies,
  Company,
  CompanyFilterStatusType,
  CompanySortType,
  StatusListType,
} from "src/types";

type CompanySectionProps = {
  data: Companies;
  companies: Company[];
  error: Error;
  filteredStatusList: StatusListType;
  setSortType: Dispatch<SetStateAction<CompanySortType>>;
  filteredCompanies: Company[];
  filterType: CompanyFilterStatusType | undefined;
  setFilterType: Dispatch<SetStateAction<CompanyFilterStatusType>>;
  setIsFilterd: Dispatch<SetStateAction<boolean>>;
};
export const CompanySection: FC<CompanySectionProps> = ({
  data,
  companies,
  error,
  filteredStatusList,
  setSortType,
  filteredCompanies,
  filterType,
  setFilterType,
  setIsFilterd,
}) => {
  const setCompanyList = useSetRecoilState(companyListState);

  if (!companies && !error) {
    return <Box>Loading...</Box>;
  }
  if (error) {
    return <Box>{error.message}</Box>;
  }
  if (!companies) {
    return <Box>No data</Box>;
  }
  if (companies.length === 0) {
    return <Box>Empty...</Box>;
  }

  /*
  コンソールを確認したときに、他のコンポーネントをレンダーしているときに、状態をセットしてはいけないという警告が出る原因部分。エラー詳細は以下。
  Warning: Cannot update a component (`Batcher`) while rendering a different component (`CompanySection`). To locate the bad setState() call inside `CompanySection`
  */
  setCompanyList(() => [...companies]);
  const handleChangeSortType = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as CompanySortType);
  };
  const handleChangeFilterType = (e: ChangeEvent<HTMLSelectElement>) => {
    const filteredStatus = e.target.value as CompanyFilterStatusType;
    setFilterType(filteredStatus);
    filteredStatus === "全て" ? setIsFilterd(false) : setIsFilterd(true);
  };

  return (
    <>
      <HStack>
        <Text color='blue.500' fontSize='2xl' fontWeight='semibold'>
          企業一覧
        </Text>
        <Spacer />
        <Select maxW='2xs' bgColor='white' onChange={handleChangeSortType}>
          <option value='name'>名前順</option>
          <option value='status'>ステータス順</option>
        </Select>
        <Select maxW='2xs' bgColor='white' onChange={handleChangeFilterType}>
          <option value='全て'>全て</option>
          {filteredStatusList.map((status) =>
            filterType === status.value ? (
              <option key={status.id} value={status.value} selected>
                {status.value}
              </option>
            ) : (
              <option key={status.id} value={status.value}>
                {status.value}
              </option>
            )
          )}
        </Select>
      </HStack>
      <Box ml='32'>
        <SwitchIconDisplayCheckbox />
      </Box>
      <Box ml='6'>
        <CompanyCardList companies={filteredCompanies} />
      </Box>
    </>
  );
};
