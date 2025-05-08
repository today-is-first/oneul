import logo from "@imgs/logo2.png";
import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/">
      <div className="flex min-w-[64px] cursor-pointer items-center gap-1">
        <img className="h-[64px] w-[64px]" src={logo} alt="logo"></img>
      </div>
    </Link>
  );
}

export default Logo;
