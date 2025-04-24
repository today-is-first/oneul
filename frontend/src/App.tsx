import './App.css';
import Header from '@components/common/Header';
import Logo from './components/common/Logo';
import LoginBtn from './components/common/LoginBtn';

function App() {
  return (
    <div className="w-full h-full">
      <Header left={<Logo />} center={<div>Center</div>} right={<LoginBtn />} />
    </div>
  );
}

export default App;
