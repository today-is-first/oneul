import { FcGoogle } from "react-icons/fc";
import GuestLoginBtn from "@components/login/GuestLoginBtn";

function OAuthBtn() {
  return (
    <div className="mt-10 flex w-[400px] flex-col items-center justify-center rounded-xl bg-[#1a1f2e] p-8 text-white">
      <button
        className="flex w-full transform cursor-pointer items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 font-medium text-black shadow-md transition-transform hover:bg-gray-100 active:scale-95"
        onClick={() => {
          window.location.href = `${import.meta.env.VITE_BASE_URL}/oauth2/authorization/google`;
        }}
      >
        <FcGoogle />
        Google 계정으로 로그인
      </button>

      <div className="mt-4 w-full text-center text-sm text-gray-400">
        <div>
          <p>구글 로그인이 번거로우신가요?</p>
          <p>
            저희는{" "}
            <span className="text-primary-purple-200 font-bold">
              게스트 로그인
            </span>
            을 제공합니다!
          </p>
        </div>
        <div className="mt-4 flex w-full gap-2">
          <GuestLoginBtn guestLoginNumber={1} />
          <GuestLoginBtn guestLoginNumber={2} />
        </div>
      </div>
    </div>
  );
}

export default OAuthBtn;
