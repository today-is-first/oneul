function SigninForm() {
  return (
    <section className="flex flex-col items-center justify-center mt-10 text-logo-white bg-background w-[400px] h-[460px] rounded-lg p-8">
      <form className="flex flex-col items-center justify-center gap-12 text-logo-white w-full h-full">
        <div className="flex flex-col justify-center gap-2 ">
          <span className="text-lg font-bold">아이디</span>
          <input
            type="text"
            className="pl-4 rounded-lg border-1 border-gray-1 focus:outline-none w-[300px] h-[40px]"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 ">
          <span className="text-lg font-bold">비밀번호</span>
          <input
            type="password"
            className="pl-4 rounded-lg border-1 border-gray-1 focus:outline-none w-[300px] h-[40px]"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-point w-[300px] h-[40px]"
        >
          로그인
        </button>
      </form>
    </section>
  );
}

export default SigninForm;
