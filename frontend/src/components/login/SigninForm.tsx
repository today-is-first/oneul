import { Link } from "react-router";

function SigninForm() {
  return (
    <section className="text-logo-white bg-background mt-10 flex h-[460px] w-[400px] flex-col items-center justify-center rounded-2xl p-8">
      <form className="text-logo-white flex h-full w-full flex-col items-center justify-center gap-12 p-4">
        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full flex-col justify-center gap-2">
            <span className="text-lg font-bold">아이디</span>
            <input
              type="text"
              className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex w-full flex-col justify-center gap-2">
            <span className="text-lg font-bold">비밀번호</span>
            <input
              type="password"
              className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:outline-none focus:ring-2"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <button type="submit" className="bg-point h-[40px] w-full rounded-lg">
            로그인
          </button>
          <Link to="/signup">
            <span className="text-center text-sm text-gray-400">
              회원가입으로 이동하기
            </span>
          </Link>
        </div>
      </form>
    </section>
  );
}

export default SigninForm;
