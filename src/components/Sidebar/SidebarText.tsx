import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

type SidebarTextProps = {
  id: number;
  icon: JSX.Element;
  sidebarText: string;
};

export const SidebarText: FC<SidebarTextProps> = ({ icon, sidebarText }) => {
  return (
    <Flex direction='column' align='left'>
      <Flex direction='column' justify='space-between' mb={8}>
        <Flex fontSize='24px' color='#A0AEC0' align='center' fontWeight='800'>
          {icon}
          <Text fontSize='md' ml='3'>
            <Link href='#'>
              <a>{sidebarText}</a>
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
