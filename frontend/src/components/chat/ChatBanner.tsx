import { useNavigate } from "react-router-dom";

function ChatBanner({ challengeId }: { challengeId: number }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-primary-purple-500 hover:bg-primary-purple-400 flex w-24 cursor-pointer justify-center rounded-xl px-2 py-2 text-center text-sm font-semibold text-white shadow transition active:brightness-90"
      onClick={() => navigate(`/challenge/${challengeId}`)}
    >
      <span>상세보기</span>
    </div>
  );
}

export default ChatBanner;
