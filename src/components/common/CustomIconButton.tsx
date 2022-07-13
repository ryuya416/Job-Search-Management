import { Box, Button } from "@chakra-ui/react";
import { FC } from "react";
import { HoverText } from "src/components/common/HoverText";

export type CustomIconButtonPropsType = {
  // Buttonに付与するテストID。存在確認テストで必要
  btnTestId: string;
  // Buttonクリック時のアクション
  handleClick: (() => void) | undefined;
  // 表示させるIcon要素
  iconElement: JSX.Element;
  // Buttonホバー時の説明テキスト
  hoverText: string;
  // Buttonホバー時の説明テキストに付与するテストID。存在確認テストで必要
  hoverTextTestId: string;
};

/*
自作アイコンボタン
propsにアイコン要素を持たせることで、そのアイコンのボタンを作成できる。
ホバー時に説明テキスト付属
*/
export const CustomIconButton: FC<CustomIconButtonPropsType> = ({
  btnTestId,
  handleClick,
  iconElement,
  hoverText,
  hoverTextTestId,
}) => {
  return (
    <Box role='group'>
      <Button
        colorScheme='whiteAlpha'
        onClick={handleClick}
        data-testid={btnTestId}
      >
        {iconElement}
      </Button>
      <HoverText text={hoverText} testId={hoverTextTestId} />
    </Box>
  );
};
