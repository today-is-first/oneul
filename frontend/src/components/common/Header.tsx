interface HeaderProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

function Header({ left, center, right }: HeaderProps) {
  return (
    <div className="left-0 right-0 top-0 z-10 flex h-16 w-full items-center justify-between px-16 py-4 text-white">
      <div className="">{left}</div>
      <div className="">{center}</div>
      <div className="">{right}</div>
    </div>
  );
}

export default Header;
