import Header from '@components/common/Header';
import Logo from '@components/common/Logo';
import SigninForm from './SigninForm';

function LoginPage() {
  return (
    <div className="w-full h-full bg-gradient-to-bl from-[#21414F] via-[#10212b] to-[#17171C]">
      <Header left={<Logo />} center={<></>} right={<></>} />
      <section className="flex flex-col items-center justify-center ">
        <span className="text-4xl font-bold text-logo-white ">로그인</span>
        <SigninForm />
      </section>
    </div>
  );
}

export default LoginPage;
