interface HeaderProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

function Header({ left, center, right }: HeaderProps) {
  return (
    <div className="flex justify-between items-center w-full h-16 px-12 py-10">
      <div className="">{left}</div>
      <div className="">{center}</div>
      <div className="">{right}</div>
    </div>
  );
}

export default Header;
