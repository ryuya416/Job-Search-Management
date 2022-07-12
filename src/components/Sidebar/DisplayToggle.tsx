import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

type DisplayToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
};
export const DisplayToggle: FC<DisplayToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <Box>
      <Box
        mt={2}
        ml={2}
        onClick={() => {
          onToggle();
        }}
        cursor='pointer'
        pos='absolute'
      >
        {isOpen ? (
          <HiChevronDoubleLeft size='24px' />
        ) : (
          <HiChevronDoubleRight size='24px' />
        )}
      </Box>
    </Box>
  );
};
