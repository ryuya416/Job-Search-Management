import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { useAuth } from "src/hooks/useAuth";
import { isLoginState } from "../store/LoginUser/LoginUser";

// サインインボタン
export const SignInButton: FC = () => {
  const { handleSubmit, handleChangeEmail, handleChangePassword } = useAuth();
  const [isUser] = useRecoilState(isLoginState);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Flex align='center' justify='center'>
          <Box bg='white' w='3xl' p={8} borderRadius='md' shadow='md'>
            <Heading as='h1' size='lg' textAlign='center'>
              就活管理アプリ
            </Heading>
            <Divider my={4} />
            <Stack spacing={6} py={4} px={10}>
              <Input
                placeholder='Email'
                value={isUser.email}
                onChange={(e) => handleChangeEmail(e)}
              />
              <Input
                placeholder='Password'
                value={isUser.password}
                type='password'
                name='password'
                onChange={(e) => handleChangePassword(e)}
              />
              <Button
                type='submit'
                disabled={isUser.email === "" || isUser.password === ""}
              >
                ログイン
              </Button>
            </Stack>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};
