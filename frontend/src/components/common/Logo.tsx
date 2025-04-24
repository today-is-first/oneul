import logo from '@imgs/logo2.png';
import { Link } from 'react-router';

function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center gap-1 cursor-pointer">
        <img className="w-[64px] h-[64px]" src={logo} alt="logo"></img>
      </div>
    </Link>
  );
}

export default Logo;
