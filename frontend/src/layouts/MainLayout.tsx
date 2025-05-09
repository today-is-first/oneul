import { Outlet } from "react-router-dom";
import SideBar from "@components/common/SideBar";
import Logo from "@components/common/Logo";
import NavBar from "@components/common/NavBar";
import LoginBtn from "@components/common/LoginBtn";
import Header from "@/components/common/Header";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header left={<Logo />} center={<NavBar />} right={<LoginBtn />} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
