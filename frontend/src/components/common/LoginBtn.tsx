import { Link } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import { useState, useRef, useEffect } from "react";

function LoginBtn() {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (user) {
    return (
      <div className="relative min-w-[120px]" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-center gap-2 rounded-full bg-transparent px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <img
            src={user.profile || "/default-profile.png"}
            alt="프로필"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="min-w-[100px] flex-shrink-0">
            <span className="text-sm font-medium text-black dark:text-white">
              {user.nickname || user.name || "사용자"}
            </span>
          </div>
        </button>

        {open && (
          <div className="absolute right-0 z-50 mt-2 min-w-[160px] rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-600 dark:bg-gray-800">
            <Link
              to="/mypage"
              className="block rounded-t-lg px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              마이페이지
            </Link>
            <button
              onClick={() => {
                useUserStore.getState().logout();
                setOpen(false);
              }}
              className="w-full rounded-b-lg px-4 py-2 text-left text-sm text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link to="/login">
      <button className="min-w-[100px] rounded-full bg-[#3384fa] px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
        로그인
      </button>
    </Link>
  );
}

export default LoginBtn;
