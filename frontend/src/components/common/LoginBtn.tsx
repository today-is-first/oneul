import { Link } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import { useState, useRef, useEffect } from "react";
import { useChallengeStore } from "@/stores/challengeStore";
import { useSocketStore } from "@/stores/socketStore";
import { useFeedStore } from "@/stores/feedStore";
import { useQueryClient } from "@tanstack/react-query";

function LoginButton() {
  const { user } = useUserStore();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

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

  const buttonBaseClass =
    "flex w-17 h-17 flex-col items-center justify-center rounded-2xl transition hover:bg-[#2d2d35] px-2 py-2";

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={buttonBaseClass}
        >
          <img
            src={user.profile || "/svgs/default-profile.svg"}
            alt="프로필"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="mt-1 max-w-[64px] truncate text-center text-xs text-gray-300">
            {user.nickname || user.name || "사용자"}
          </span>
        </button>

        {/* 드롭다운 */}
        <div
          id="user-dropdown"
          className={`fixed right-16 top-14 z-[9999] w-[120px] transform overflow-hidden rounded-lg border border-[#3a3a3a] bg-[#1f1f25] shadow-lg transition-all duration-200 ease-in-out ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none -translate-y-2 scale-95 opacity-0"
          }`}
        >
          <Link
            to="/mypage"
            className="block w-full px-4 py-3 text-center text-sm text-gray-200 hover:bg-[#2d2d35]"
            onClick={() => setOpen(false)}
          >
            마이페이지
          </Link>
          <button
            onClick={() => {
              document.cookie =
                "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              queryClient.clear();
              useUserStore.getState().logout();
              useChallengeStore.getState().setInitChallengeStore();
              useSocketStore.getState().setInitSocketStore();
              useFeedStore.getState().setInitFeedStore();
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-center text-sm text-gray-200 hover:bg-[#2d2d35]"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link to="/login" className="w-full">
      <button className={buttonBaseClass}>
        <img
          src="/svgs/default-profile.svg"
          alt="디폴트 프로필"
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="mt-1 text-xs text-gray-300">로그인</span>
      </button>
    </Link>
  );
}

export default LoginButton;
