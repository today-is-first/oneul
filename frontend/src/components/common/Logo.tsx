import logo from '@imgs/logo2.png';

function Logo() {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <img className="w-[60px] h-[60px]" src={logo} alt="logo"></img>
    </div>
  );
}

export default Logo;
