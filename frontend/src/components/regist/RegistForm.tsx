import { useState } from 'react';

function RegistForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
  };

  return (
    <section className="flex items-center justify-center mt-10 bg-background rounded-2xl">
      <form className="text-white p-8 w-full max-w-md shadow-lg space-y-6">
        <div className="space-y-3">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#1B1B1E] border border-[#333] focus:outline-none focus:ring-2 focus:ring-point"
          />
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-1/2 px-4 py-3 rounded-lg bg-[#1B1B1E] border border-[#333] focus:outline-none focus:ring-2 focus:ring-point"
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="w-1/2 px-4 py-3 rounded-lg bg-[#1B1B1E] border border-[#333] focus:outline-none focus:ring-2 focus:ring-point"
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#1B1B1E] border border-[#333] focus:outline-none focus:ring-2 focus:ring-point"
        />

        <div className="flex justify-between gap-2">
          {[
            { label: '여성', value: 'female' },
            { label: '남성', value: 'male' },
            { label: '비공개', value: 'private' },
          ].map(({ label, value }) => (
            <label
              key={value}
              className={`flex-1 text-center py-2 rounded-lg cursor-pointer border transition
              ${
                gender === value
                  ? 'bg-point text-white border-point'
                  : 'bg-[#1B1B1E] text-white border-[#333] hover:border-point'
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
          className="w-full bg-point py-3 rounded-lg text-white font-semibold"
        >
          회원가입
        </button>
      </form>
    </section>
  );
}

export default RegistForm;
