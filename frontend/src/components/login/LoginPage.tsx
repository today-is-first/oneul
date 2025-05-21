import Header from "@components/common/Header";
import Logo from "@components/common/Logo";
import OAuthBtn from "@components/login/OAuthBtn";
import GuestLoginBtn from "@components/login/GuestLoginBtn";

function LoginPage() {
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
