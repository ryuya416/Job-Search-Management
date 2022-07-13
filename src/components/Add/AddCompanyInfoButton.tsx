import { useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { AddCompanyModal } from "src/components/Add/AddCompanyModal";
import { AddMenu } from "src/components/Add/AddMenu";

// 企業情報を追加するボタン
export const AddCompanyInfoButton: FC = () => {
  // モーダルの表示状態
  const { isOpen, onOpen, onClose } = useDisclosure();
  // モーダルに渡す値
  const addCompanyModalProps = {
    isOpen,
    onClose,
  };
  return (
    <>
      <AddMenu onOpen={onOpen} />
      <AddCompanyModal {...addCompanyModalProps} />
    </>
  );
};
