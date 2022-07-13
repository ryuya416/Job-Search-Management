import type { NextPage } from "next";
import Head from "next/head";
import { Search } from "src/components/Search";
import { CompanySection } from "src/components/CompanySection";
import { AddCompanyInfoButton } from "src/components/Add/AddCompanyInfoButton";
import { Sidebar } from "src/components/Sidebar";
import {
  Box,
  Center,
  Collapse,
  Divider,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useFetchCompanies,
  useFilterCompaniesByStatus,
  useSortCompanies,
} from "src/hooks/company";
import { STATUS_LIST } from "src/constants/Status";
import { StatusListType } from "src/types";
import { useEffect, useState } from "react";
import { DisplayToggle } from "src/components/Sidebar/DisplayToggle";
import { collection, getDocs } from "firebase/firestore";
import { db } from "src/Firebase/firebase";

const Home: NextPage = () => {
  const [companies, setCompanies] = useState<any>([]);

  useEffect(() => {
    const companiesCollectionRef = collection(db, "companies");
    getDocs(companiesCollectionRef).then((querySnapshot) => {
      setCompanies(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  // 会社一覧を取得する;
  const { data, error } = useFetchCompanies();
  {
    console.log("データの中身", data);
  }
  {
    console.log("companiesの中身", companies);
  }
  // 会社一覧を並び替える
  const { sortedCompanies, setSortType } = useSortCompanies(companies);
  // 会社一覧をフィルタリングする;
  const { filteredCompanies, filterType, setFilterType } =
    useFilterCompaniesByStatus(sortedCompanies);
  // 会社一覧からステータスだけを取得;
  const dataStatusList = companies.map((company) => company.status);
  // ステータスリストからデータに存在するステータスだけを取得;
  const filteredStatusList: StatusListType = STATUS_LIST.filter((STATUS) =>
    dataStatusList?.includes(STATUS.value)
  );
  // 選考ステータスがフィルタリングされているかどうかを判定する
  const [isFiltered, setIsFilterd] = useState(false);
  // サイドバーのトランジション制御
  const { isOpen, onToggle, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  // if (!data && !error) {
  //   return <Box>Loading...</Box>;
  // }
  // if (error) {
  //   return <Box>{error.message}</Box>;
  // }
  // if (!data) {
  //   return <Box>No data</Box>;
  // }
  // if (data.companies.length === 0) {
  //   return <Box>Empty...</Box>;
  // }

  // 企業一覧コンポーネントに渡すプロパティ;
  const companySectionProps = {
    data,
    companies,
    error,
    filteredStatusList,
    setSortType,
    filteredCompanies,
    filterType,
    setFilterType,
    setIsFilterd,
  };
  const displayToggleProps = {
    isOpen,
    onToggle,
  };
  // サイドバーコンポーネントに渡すプロパティ
  const SidebarProps = {
    filteredStatusList,
    setFilterType,
    isFiltered,
    setIsFilterd,
  };

  return (
    <Box>
      <Head>
        <title>Sokures</title>
        <meta
          name='description'
          content='エントリーシートを管理するアプリです'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box as='main'>
        <Flex maxW='2000px' direction='row'>
          <Collapse in={isOpen} animateOpacity>
            <Flex h='100vh' top={0} position='sticky'>
              <Sidebar {...SidebarProps} />
              <Center my='10'>
                <Divider orientation='vertical' />
              </Center>
            </Flex>
          </Collapse>
          <DisplayToggle {...displayToggleProps} />
          <Flex direction='column' w='100%' bgColor='gray.50'>
            <Flex py='36px' bgColor='white'>
              <Box ml='80px'>
                <Search />
              </Box>
              <Box mx='auto'>
                <AddCompanyInfoButton />
              </Box>
            </Flex>
            <Box p='56px'>
              <CompanySection {...companySectionProps} />
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
