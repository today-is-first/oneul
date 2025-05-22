import { FiX, FiXCircle } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentFailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { challengeId, errorMessage } = location.state || {};
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
          className="absolute right-6 top-6 h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-200"
        />
        <div className="flex flex-col items-center gap-4">
          <FiXCircle className="my-2 h-16 w-16 animate-pulse text-red-400" />
          <h3 className="text-2xl font-extrabold text-white">결제 실패</h3>
          <p className="text-center text-gray-300">
            {errorMessage || "알 수 없는 오류가 발생했습니다."}
          </p>
        </div>

        {challengeId && (
          <button
            onClick={() => navigate(`/challenge/${challengeId}/order`)}
            className="bg-primary-purple-300 hover:bg-primary-purple-400 w-full cursor-pointer rounded-lg px-6 py-4 font-semibold text-white"
          >
            다시 시도하기
          </button>
        )}
      </div>
    </div>
  );
}

export default PaymentFailPage;
