import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";
import { SelectionStatus } from "src/components/Sidebar/SelectionStatus";
import { SidebarText } from "src/components/Sidebar/SidebarText";
import {
  HiHome,
  HiCollection,
  HiInformationCircle,
  HiSupport,
  HiMail,
} from "react-icons/hi";
import { SelectionOptions } from "src/components/Sidebar/SelectionOptions";
import { CompanyFilterStatusType, StatusListType } from "src/types";

type SidebarProps = {
  // filteredStatusList: StatusListType;
  // setFilterType: Dispatch<SetStateAction<CompanyFilterStatusType>>;
  isFiltered: boolean;
  setIsFilterd: Dispatch<SetStateAction<boolean>>;
};
export const Sidebar: FC<SidebarProps> = ({
  // filteredStatusList,
  // setFilterType,
  isFiltered,
  setIsFilterd,
}) => {
  const SidebarListText: {
    id: number;
    icon: JSX.Element;
    sidebarText: string;
  }[] = [
    {
      id: 1,
      icon: <HiHome />,
      sidebarText: "ホーム",
    },
    {
      id: 2,
      icon: <HiCollection />,
      sidebarText: "質問",
    },
    {
      id: 3,
      icon: <HiInformationCircle />,
      sidebarText: "アバウト",
    },
    {
      id: 4,
      icon: <HiSupport />,
      sidebarText: "利用規約",
    },
    {
      id: 5,
      icon: <HiMail />,
      sidebarText: "お問い合わせ",
    },
  ];
  // 選考ステータスが「全て」
  const statusAll = { id: 0, color: "gray.900", value: "全て" };
  const SelectionStatusProps = {
    filteredStatus: statusAll,
    // setFilterType,
    setIsFilterd,
  };
  return (
    <>
      <Box w='240px' bg='gray.100' pl='16px'>
        <Heading as='h2' fontSize='32px' fontWeight='normal' py={16}>
          <Link href='/'>
            <a>Sokures</a>
          </Link>
        </Heading>
        <Box>
          {SidebarListText && SidebarListText.length > 0 ? (
            <Box>
              {SidebarListText.map((sidebarTest) => (
                <SidebarText key={sidebarTest.id} {...sidebarTest} />
              ))}
            </Box>
          ) : null}
        </Box>
        <Box mt={2}>
          {/* {filteredStatusList && filteredStatusList.length > 0 ? ( */}
          <Box>
            <Heading as='h2' fontSize='24px' fontWeight='normal' mb={8}>
              選考ステータス
            </Heading>
            {/* {filteredStatusList.map((filteredStatus) => (
                <SelectionStatus
                  key={filteredStatus.id}
                  {...SelectionStatusProps}
                  filteredStatus={filteredStatus}
                />
              ))}
              {isFiltered ? (
                <SelectionStatus key={statusAll.id} {...SelectionStatusProps} />
              ) : null} */}
          </Box>
          {/* ) : null} */}
        </Box>
        <SelectionOptions />
      </Box>
    </>
  );
};
