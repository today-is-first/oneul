interface HeaderProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

function Header({ left, center, right }: HeaderProps) {
  return (
    <div className="flex h-16 w-full items-center justify-between px-12 py-10">
      <div className="">{left}</div>
      <div className="">{center}</div>
      <div className="">{right}</div>
    </div>
  );
}

export default Header;
