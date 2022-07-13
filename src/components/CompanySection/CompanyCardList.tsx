import { Image, Stack, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { FcReddit } from "react-icons/fc";
import {
  CompanyCard,
  CompanyCardProps,
} from "src/components/CompanySection/CompanyCard";
import { STATUS_LIST } from "src/constants/Status";
import { Company } from "src/types";

type Props = {
  companies: Company[];
};

// 会社情報一覧を表示するコンポーネント
export const CompanyCardList: FC<Props> = ({ companies }) => {
  // 選考ステータスの色を取得する関数
  const getColor = (fetchedStatus: string) => {
    const color = STATUS_LIST.filter(
      (status) => status.value === fetchedStatus
    )[0].color;
    return color;
  };

  // 会社情報
  const companyList: CompanyCardProps[] = companies.map((company, i) => {
    const color = getColor(company.status);
    const icon = [
      <Image src='/mercari.svg' alt='Mercari Icon' boxSize={48} />,
      <FcReddit size={48} />,
      <Image src='/toyota.svg' alt='Toyota Icon' boxSize={48} />,
    ];
    return {
      id: company.id,
      icon: icon[i],
      name: company.name,
      status: { color, label: company.status },
    };
  });

  return (
    <VStack>
      {/* カード */}
      {companyList && companyList.length > 0 ? (
        <Stack w='100%' mt={8} mx={20} spacing={14}>
          {companyList.map((company) => (
            <Link key={company.id} href={`/CompanyDetail/${company.id}`}>
              <a>
                <CompanyCard key={company.id} {...company} />
              </a>
            </Link>
          ))}
        </Stack>
      ) : null}
    </VStack>
  );
};
