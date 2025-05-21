import { FcPortraitMode } from "react-icons/fc";

interface GuestLoginBtnProps {
  guestLoginNumber: number;
}

function GuestLoginBtn({ guestLoginNumber }: GuestLoginBtnProps) {
  return (
    <button
      className="flex w-full transform cursor-pointer items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 font-medium text-black shadow-md transition-transform hover:bg-gray-100 active:scale-95"
      onClick={() => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/api/users/guest-login/${guestLoginNumber}`;
      }}
    >
      <FcPortraitMode />
      게스트 로그인 {guestLoginNumber}
    </button>
  );
}

export default GuestLoginBtn;
