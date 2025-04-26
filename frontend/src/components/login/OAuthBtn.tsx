import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function OAuthBtn() {
  return (
    <div className="mt-10 flex w-[400px] flex-col items-center justify-center rounded-xl bg-[#1a1f2e] p-8 text-white">
      <button
        className="flex w-full transform cursor-pointer items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 font-medium text-black shadow-md transition-transform hover:bg-gray-100 active:scale-95"
        onClick={() => {
          window.location.href = "/oauth2/authorization/google";
        }}
      >
        <FcGoogle />
        Google 계정으로 로그인
      </button>

      <div className="mt-4 text-sm text-gray-400">
        아직 회원이 아니신가요?{" "}
        <Link to="/signup" className="text-blue-400 underline">
          가입하기
        </Link>
      </div>
    </div>
  );
}

export default OAuthBtn;
