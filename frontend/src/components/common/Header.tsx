interface HeaderProps {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}

function Header({ left, center, right }: HeaderProps) {
  return (
    <div className="header">
      <div className="header-left">{left}</div>
      <div className="header-center">{center}</div>
      <div className="header-right">{right}</div>
    </div>
  );
}

export default Header;
