import { useState } from "react";

function RegistForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  return (
    <section className="bg-background mt-10 flex items-center justify-center rounded-2xl">
      <form className="w-full max-w-md space-y-6 p-8 text-white shadow-lg">
        <div className="space-y-3">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:ring-2 focus:outline-none"
          />
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus:ring-point w-1/2 rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:ring-2 focus:outline-none"
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="focus:ring-point w-1/2 rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:ring-2 focus:outline-none"
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:ring-2 focus:outline-none"
        />

        <div className="flex justify-between gap-2">
          {[
            { label: "여성", value: "female" },
            { label: "남성", value: "male" },
            { label: "비공개", value: "private" },
          ].map(({ label, value }) => (
            <label
              key={value}
              className={`flex-1 cursor-pointer rounded-lg border py-2 text-center transition ${
                gender === value
                  ? "bg-point border-point text-white"
                  : "hover:border-point border-[#333] bg-[#1B1B1E] text-white"
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={value}
                checked={gender === value}
                onChange={(e) => setGender(e.target.value)}
                className="hidden"
              />
              {label}
            </label>
          ))}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-point w-full rounded-lg py-3 font-semibold text-white"
        >
          회원가입
        </button>
      </form>
    </section>
  );
}

export default RegistForm;
