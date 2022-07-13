import { useToast } from "@chakra-ui/react";

type Props = {
  title: string;
  status: "info" | "success" | "warning" | "error";
};

export const useMessage = () => {
  const toast = useToast();

  const showMessage = (props: Props) => {
    const { title, status } = props;
    toast({
      title,
      status,
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };
  return { showMessage };
};
