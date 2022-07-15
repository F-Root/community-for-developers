/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Divider } from "antd";
import Link from "next/link";
import SignInForm from "../../components/Sign/SignInForm";
import LoginLogo from "../../components/Sign/LoginLogo";
import { LoginPageContainer } from "./loginstyle";
import OAuthSign from "../../components/Sign/OAuthSign";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "next/router";
const Login = () => {
  const { isLoggedin } = useSelector((state) => state.user);

  // 로그인 된 상태로 로그인 페이지 이동 시 홈으로 라우팅

  useEffect(() => {
    if (isLoggedin) Router.push("/");
  }, [isLoggedin]);

  return (
    <div css={LoginPageContainer}>
      <Link href="/">
        <a>
          <LoginLogo />
        </a>
      </Link>
      <SignInForm />
      <Link href="/signup">
        <h2 className="signUp">회원가입</h2>
      </Link>
      <div>
        <Divider plain></Divider>
      </div>
      <OAuthSign />
    </div>
  );
};
export default Login;