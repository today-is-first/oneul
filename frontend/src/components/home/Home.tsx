import Header from '@components/common/Header';
import Logo from '@components/common/Logo';
import NavBar from '@components/common/NavBar';
import LoginBtn from '../common/LoginBtn';

function Home() {
  return (
    <div className="w-full h-full">
      <Header left={<Logo />} center={<NavBar />} right={<LoginBtn />} />
    </div>
  );
}

export default Home;
