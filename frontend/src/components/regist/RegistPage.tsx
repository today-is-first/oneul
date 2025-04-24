import Header from '@components/common/Header';
import Logo from '@components/common/Logo';
import RegistForm from '@components/regist/RegistForm';

function RegistPage() {
  return (
    <div className="overflow-auto w-full h-full bg-gradient-to-br from-[#21414F] via-[#10212b] to-[#17171C]">
      <Header left={<Logo />} center={<></>} right={<></>} />
      <section className="flex flex-col items-center justify-center ">
        <span className="text-4xl font-bold text-logo-white ">회원가입</span>
        <RegistForm />
      </section>
    </div>
  );
}

export default RegistPage;
