import { Outlet } from "react-router-dom";
import SideBar from "@components/sideBar/SideBar";
import Logo from "@components/common/Logo";
import NavBar from "@components/common/NavBar";
import Header from "@components/common/Header";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header left={<Logo />} center={<NavBar />} right={<></>} />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-y-auto pr-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
