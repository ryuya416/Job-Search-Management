import type { NextPage } from "next";
import Head from "next/head";
import { SignInButton } from "src/components/Auth/SignInButton";

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Component Login</title>
        <meta
          name='description'
          content='エントリーシートを管理するアプリです'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <SignInButton />
      </main>
    </div>
  );
};

export default Login;
