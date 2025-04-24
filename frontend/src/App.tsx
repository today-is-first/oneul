import './App.css';
import Header from '@components/common/Header';
import Logo from './components/common/Logo';
import LoginBtn from './components/common/LoginBtn';
import NavBar from './components/common/NavBar';
function App() {
  return (
    <div className="w-full h-full">
      <Header left={<Logo />} center={<NavBar />} right={<LoginBtn />} />
    </div>
  );
}

export default App;
