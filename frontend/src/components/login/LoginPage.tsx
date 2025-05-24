import Header from "@components/common/Header";
import Logo from "@components/common/Logo";
import OAuthBtn from "@components/login/OAuthBtn";
import { useLocation } from "react-router";
import { useEffect } from "react";
import Toast from "../Toast/Toast";

function LoginPage() {
  const location = useLocation();
  const state = location.state as { showAuthToast?: boolean };

  useEffect(() => {
    if (state?.showAuthToast) {
      Toast.info("로그인이 필요한 페이지입니다");
      window.history.replaceState({}, "");
    }
  }, [state]);

  return (
    <div className="h-full w-full bg-gradient-to-bl from-[#21414F] via-[#10212b] to-[#17171C]">
      <Header left={<Logo />} center={<></>} right={<></>} />
      <section className="flex flex-col items-center justify-center">
        <span className="text-logo-white text-4xl font-bold">로그인</span>
        <OAuthBtn />
      </section>
    </div>
  );
}

export default LoginPage;
