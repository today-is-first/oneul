import { Link } from 'react-router';

function SigninForm() {
  return (
    <section className="flex flex-col items-center justify-center mt-10 text-logo-white bg-background w-[400px] h-[460px] rounded-2xl p-8">
      <form className="flex flex-col items-center justify-center gap-12 text-logo-white w-full h-full p-4">
        <div className="flex flex-col justify-center gap-2 w-full">
          <span className="text-lg font-bold">아이디</span>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-[#1B1B1E] border border-[#333] focus:outline-none focus:ring-2 focus:ring-point"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 w-full ">
          <span className="text-lg font-bold">비밀번호</span>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-[#1B1B1E] border border-[#333] focus:outline-none focus:ring-2 focus:ring-point"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-point w-full h-[40px]"
        >
          로그인
        </button>
      </form>
      <Link to="/signup">
        <span className="text-sm text-gray-400">회원가입으로 이동하기</span>
      </Link>
    </section>
  );
}

export default SigninForm;
