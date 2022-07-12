import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { HiCog, HiTrash } from "react-icons/hi";
import { UserIcon } from "src/components/Sidebar/UserIcon";
export const SelectionOptions = () => {
  return (
    <Box mt={8} ml={0}>
      <Flex direction='column' align='left'>
        <Flex direction='column' justify='space-between' mb={8}>
          <Flex fontSize='24px' color='#A0AEC0' align='center' fontWeight='800'>
            <HiCog />
            <Text fontSize='16px' ml='3'>
              <NextLink href='#'>
                <Link>設定</Link>
              </NextLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex direction='column' align='left'>
        <Flex direction='column' justify='space-between' mb={8}>
          <Flex fontSize='24px' color='#A0AEC0' align='center' fontWeight='800'>
            <HiTrash />
            <Text fontSize='16px' ml='3'>
              <NextLink href='#'>
                <Link>ゴミ箱</Link>
              </NextLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <UserIcon />
    </Box>
  );
};
