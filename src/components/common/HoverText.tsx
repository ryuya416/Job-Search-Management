import { Box } from "@chakra-ui/react";
import { FC } from "react";

type HoverTextProps = {
  text: string;
  testId: string;
};
// ボタンホバー時に表示させるテキスト
export const HoverText: FC<HoverTextProps> = ({ text, testId }) => {
  return (
    <Box
      as='span'
      position='absolute'
      mt={2}
      ml={-2}
      fontSize='sm'
      textColor='gray.500'
      opacity='0'
      _groupHover={{ opacity: 1 }}
      data-testid={testId}
    >
      {text}
    </Box>
  );
};
