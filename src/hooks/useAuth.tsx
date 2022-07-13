import { useState } from "react";
import { useMessage } from "./useMessage";
import { useRecoilState } from "recoil";
import { isLoginState } from "src/components/store/LoginUser/LoginUser";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { useAuthContext } from "../src/context/AuthContext";

import app, { auth } from "src/Firebase/firebase";

export const useAuth = () => {
  const [isUser, setIsUser] = useRecoilState(isLoginState);
  const [loading, setLoading] = useState(false);

  const { showMessage } = useMessage();
  const router = useRouter();
  const auth = getAuth(app);

  const handleLogout = async () => {
    await signOut(auth);
    await router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, isUser.email, isUser.password);
    router.push("/");
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUser({ ...isUser, email: e.currentTarget.value });
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUser({ ...isUser, password: e.currentTarget.value });
  };

  // const handleOnClick = () => {
  //   setLoading(true);
  //   fetch(API_URL, requestOptionsSignIn)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       showMessage({ title: "ログインしました", status: "success" });
  //       setLoading(false);
  //       router.push("/");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       showMessage({ title: "ログインに失敗しました", status: "error" });
  //       setLoading(false);
  //     })
  //     .finally(() => {
  //       onClose();
  //     });
  // };

  return {
    isUser,
    setIsUser,
    loading,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLogout,
  };
};
