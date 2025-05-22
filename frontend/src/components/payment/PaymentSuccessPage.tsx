import { FiCheckCircle, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { challengeId } = (location.state as { challengeId: string }) || {};
  if (!challengeId) return <p>잘못된 접근입니다.</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0E0E11] p-4">
      <div
        className="relative flex w-full max-w-sm flex-col items-center gap-8 rounded-2xl border border-gray-700 bg-gray-800/80 p-12 shadow-2xl backdrop-blur-md"
        style={{
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)",
        }}
      >
        <FiX
          onClick={() => navigate("/challenge/search", { replace: true })}
          className="absolute right-6 top-6 h-6 w-6 cursor-pointer text-gray-400 transition-colors hover:text-gray-200"
        />
        <div className="flex flex-col items-center gap-4">
          <FiCheckCircle className="text-primary-purple-300 my-2 h-16 w-16 animate-pulse" />
          <h3 className="text-2xl font-extrabold text-white">결제 완료!</h3>
          <p className="text-center text-gray-300">
            당신의 더 멋진 오늘을 응원해요!
          </p>
        </div>

        <button
          onClick={() =>
            navigate(`/challenge/${challengeId}`, { replace: true })
          }
          className="bg-primary-purple-300 hover:bg-primary-purple-400 w-full flex-1 transform cursor-pointer rounded-lg p-4 font-semibold text-white"
        >
          챌린지 가기
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
