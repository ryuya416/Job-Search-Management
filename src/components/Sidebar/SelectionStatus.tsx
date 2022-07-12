import { Box, Flex, Text } from "@chakra-ui/react";
import React, { Dispatch, FC, SetStateAction } from "react";
import { CompanyFilterStatusType } from "src/types";

type FilteredStatusType = {
  id: number;
  color: string;
  value: string;
};
type SelectionStatusProps = {
  filteredStatus: FilteredStatusType;
  setFilterType: Dispatch<SetStateAction<CompanyFilterStatusType>>;
  setIsFilterd: Dispatch<SetStateAction<boolean>>;
};

export const SelectionStatus: FC<SelectionStatusProps> = ({
  setFilterType,
  filteredStatus,
  setIsFilterd,
}) => {
  const handleClick = () => {
    setFilterType(filteredStatus.value as CompanyFilterStatusType);
    filteredStatus.value === "全て" ? setIsFilterd(false) : setIsFilterd(true);
  };
  return (
    <>
      <Flex direction='column' align='left'>
        <Flex direction='column' justify='space-between' mb={8}>
          <Flex
            fontSize='24px'
            color='#A0AEC0'
            align='center'
            fontWeight='800'
            px='3'
            ml={8}
            cursor='pointer'
            onClick={handleClick}
          >
            <Box p={2} bg={filteredStatus.color} rounded='full'></Box>
            <Text fontSize='16px' ml='3'>
              {filteredStatus.value}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
