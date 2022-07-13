import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FC } from "react";
import {
  HiOutlineCollection,
  HiOutlineOfficeBuilding,
  HiOutlinePlus,
} from "react-icons/hi";
import { HoverText } from "src/components/common/HoverText";

type AddMenuProps = {
  onOpen: () => void;
};

// 追加ボタンメニュー
export const AddMenu: FC<AddMenuProps> = ({ onOpen }) => {
  const addIcon: JSX.Element = <HiOutlinePlus size={48} color='black' />;
  const HioutlineOfficeBuildingIcon: JSX.Element = (
    <HiOutlineOfficeBuilding size={32} />
  );
  const HiOutlineCollectionIcon: JSX.Element = (
    <HiOutlineCollection size={32} />
  );
  return (
    <Box>
      <Menu>
        <Box role='group' display='flex'>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={addIcon}
            variant='ghost'
          />
          <Box ml='4'>
            <HoverText text='新規追加' testId='add-info-button-hover-text' />
          </Box>
        </Box>
        <MenuList>
          <MenuItem
            icon={HioutlineOfficeBuildingIcon}
            fontSize='large'
            onClick={onOpen}
          >
            企業情報
          </MenuItem>
          <MenuItem icon={HiOutlineCollectionIcon} fontSize='large'>
            質問・回答
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
