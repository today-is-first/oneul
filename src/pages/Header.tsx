function Header() {
  return (
    <header className="flex items-center justify-between p-4 text-white">
      <h1>Oneul</h1>
      <h2 className="fixed left-1/2 -translate-x-1/2">홈</h2>
      <button className="rounded-lg bg-white px-4 py-2 text-black">
        로그인
      </button>
    </header>
  );
}

export default Header;
