function Header() {
  return (
    <header className="flex items-center justify-between p-4 text-white">
      <p>
        <h1>Oneul</h1>
      </p>
      <p>
        <h2>홈</h2>
      </p>
      <p>
        <button className="rounded-lg bg-white px-4 py-2 text-black">
          로그인
        </button>
      </p>
    </header>
  );
}

export default Header;
