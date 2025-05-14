import { Link } from "react-router-dom";

function NavBar() {
  return (
    <ul className="text-logo-white flex h-full w-full min-w-[400px] cursor-pointer justify-evenly gap-8">
      <Link to="/">
        <li>홈</li>
      </Link>
      <Link to="/challenge/search">
        <li>카테고리</li>
      </Link>
      <Link to="/mypage">
        <li>마이페이지</li>
      </Link>
    </ul>
  );
}

export default NavBar;
