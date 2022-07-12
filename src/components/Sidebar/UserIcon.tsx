import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineUser,
  HiOutlineUserRemove,
} from "react-icons/hi";
// import { SignInButton } from "src/components/Auth/SignInButton";
import { HoverText } from "src/components/common/HoverText";

// ユーザーアイコン
export const UserIcon = () => {
  const userIcon: JSX.Element = <HiOutlineUser color='black' size={56} />;
  const HiOutlineQuestionMarkCircleIcon: JSX.Element = (
    <HiOutlineQuestionMarkCircle color='black' size={32} />
  );
  const HiOutlineUserRemoveIcon: JSX.Element = (
    <HiOutlineUserRemove size={32} />
  );
  const userIconElement: JSX.Element = (
    <HiOutlineUser color='black' size={32} />
  );
  return (
    <Box>
      <Menu>
        <Flex role='group' justifyContent='center'>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={userIcon}
            variant='ghost'
          />
          <Box ml='4'>
            <HoverText text='ユーザー情報' testId='user-button-hover-text' />
          </Box>
        </Flex>
        <MenuList>
          <MenuItem icon={userIconElement} fontSize='large'>
            マイページ
          </MenuItem>
          <MenuItem icon={HiOutlineQuestionMarkCircleIcon} fontSize='large'>
            ヘルプ
          </MenuItem>
          <MenuItem icon={HiOutlineUserRemoveIcon} fontSize='large'>
            ログアウト
          </MenuItem>
          <MenuItem>{/* <SignInButton /> */}</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
