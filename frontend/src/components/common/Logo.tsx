import logo from '@imgs/logo.png';

function Logo() {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <img className="w-[40px] h-[40px]" src={logo} alt="logo"></img>
      <span className="text-xl font-bold text-text-white">Oneul</span>
    </div>
  );
}

export default Logo;
