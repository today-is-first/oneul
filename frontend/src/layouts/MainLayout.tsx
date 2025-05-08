import { Outlet } from "react-router-dom";
import SideBar from "@components/common/SideBar";
import Logo from "@components/common/Logo";
import NavBar from "@components/common/NavBar";
import LoginBtn from "@components/common/LoginBtn";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-black-chat fixed left-0 right-0 top-0 z-10 flex h-16 w-full items-center justify-between px-4 text-white">
        <div className="mx-auto flex w-[1200px] items-center justify-between px-4">
          <div>
            <Logo />
          </div>
          <div className="text-center">
            <NavBar />
          </div>
          <div>
            <LoginBtn />
          </div>
        </div>
      </header>

      <div className="mt-16 flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
