import { Box, Center, Heading, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { isCheckedState } from "src/components/store/CheckBox/SwitchIconDisplayCheckboxState";

export type CompanyCardProps = {
  id: string;
  icon: JSX.Element;
  name: string;
  status: {
    color: string;
    label: string;
  };
};

// 会社カードコンポーネント
export const CompanyCard: FC<CompanyCardProps> = ({ icon, name, status }) => {
  const isIconDisplay = useRecoilValue(isCheckedState);
  return (
    <HStack h='120px' shadow='md' borderWidth='1px' bgColor='white'>
      {/* ステータス（色） */}
      <Box bg={status.color} w='5' h='100%'></Box>
      {/* アイコン */}
      {isIconDisplay ? (
        <Center w={32} h={19} ml={8}>
          {icon}
        </Center>
      ) : null}
      {/* コンテンツ */}
      <Box pl={68}>
        {/* 会社名 */}
        <Heading fontSize='xl' fontWeight='normal'>
          {name}
        </Heading>
        {/* 選考ステータス */}
        <Text mt={4}>選考ステータス：{status.label}</Text>
      </Box>
    </HStack>
  );
};
