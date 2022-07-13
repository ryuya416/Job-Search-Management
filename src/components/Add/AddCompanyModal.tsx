import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import {
  Field,
  FieldInputProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { FC, useRef } from "react";
import { STATUS_LIST } from "src/constants/Status";
import { useSWRConfig } from "swr";

// APIエンドポイント
const API_URL = "http://localhost:2222/companies";

type AddCompanyModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
type FormValues = {
  name: string;
  status: string;
};

// 企業情報を追加するモーダル
export const AddCompanyModal: FC<AddCompanyModalProps> = ({
  isOpen,
  onClose,
}) => {
  // モーダルの表示状態
  const initialRef = useRef(null);
  const { mutate } = useSWRConfig();

  // 会社を追加するフェッチ処理
  const addCompany = (requestOptionsAddCompany: RequestInit) => {
    fetch(API_URL, requestOptionsAddCompany)
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        mutate(API_URL);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // フォーム送信時の処理
  const formHandleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    // フェッチに渡す要素
    const body = JSON.stringify({
      name: values.name,
      memo: "",
      status: values.status,
    });
    // フェッチに使用するリクエストオプション
    const requestOptionsAddCompany: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
      credentials: "include",
      mode: "cors",
    };
    addCompany(requestOptionsAddCompany);
    onClose();
    setSubmitting(false);
  };
  return (
    <Box>
      <Modal
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>企業情報の追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Formik
              initialValues={{ name: "", status: "" }}
              onSubmit={formHandleSubmit}
            >
              {(formik: FormikProps<FormValues>) => (
                <Form id='add-company-form' onSubmit={formik.handleSubmit}>
                  <Field name='name'>
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <FormControl>
                        <Input
                          {...field}
                          id='name'
                          name='name'
                          ref={initialRef}
                          placeholder='企業名'
                          size='lg'
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name='status'>
                    {({ field }: { field: FieldInputProps<string> }) => (
                      <FormControl>
                        <Select
                          {...field}
                          id='status'
                          name='status'
                          mt={8}
                          placeholder='選考ステータス'
                          size='sm'
                        >
                          {STATUS_LIST.map((status) => (
                            <option key={status.id} value={status.value}>
                              {status.value}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter gap={8}>
            <Button onClick={onClose} width='24%'>
              キャンセル
            </Button>
            <Button
              type='submit'
              form='add-company-form'
              colorScheme='blue'
              mr={3}
              width='24%'
            >
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
