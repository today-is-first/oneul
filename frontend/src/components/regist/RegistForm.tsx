import { useUserStore } from "@stores/userStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketStore } from "@stores/socketStore";

function RegistForm() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [tel, setTel] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = useUserStore.getState().accessToken;
    await axios
      .patch(
        "http://localhost:8080/api/users",
        {
          username: name,
          email: email,
          nickname: nickname,
          userTel: tel,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true, // 쿠키도 같이 보낼 경우
        },
      )
      .then((_) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/signup");
      });
  };

  useEffect(() => {
    useUserStore.getState().initializeFromToken();
  }, []);

  useEffect(() => {
    if (!user) return;
    setEmail(user.email || "");
    setName(user.name || "");
  }, [user]);

  return (
    <section className="bg-background mt-10 flex items-center justify-center rounded-2xl">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-8 text-white shadow-lg"
      >
        <input
          type="email"
          placeholder="이메일"
          value={email}
          disabled
          className="w-full rounded-lg border border-[#333] bg-[#2a2a2d] px-4 py-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 text-white focus:outline-none focus:ring-2"
        />

        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 text-white focus:outline-none focus:ring-2"
        />

        <input
          type="tel"
          placeholder="전화번호"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 text-white focus:outline-none focus:ring-2"
        />

        <button
          type="submit"
          className="bg-point w-full rounded-lg py-3 font-semibold text-white hover:opacity-90"
        >
          회원가입
        </button>
      </form>
    </section>
  );
}

export default RegistForm;
