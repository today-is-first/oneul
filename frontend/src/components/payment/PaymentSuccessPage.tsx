import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0E0E11] p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl bg-gray-800/80 px-8 py-12 shadow-2xl backdrop-blur-md">
        <FiCheckCircle className="text-primary-purple-300 h-16 w-16 animate-pulse" />
        <h3 className="text-3xl font-extrabold text-white">결제 완료!</h3>
        <p className="text-center text-gray-300">
          당신의 더 멋진 오늘을 응원해요!
        </p>
        <button
          onClick={() => navigate("/challenges")}
          className="bg-primary-purple-400 mt-4 transform cursor-pointer rounded-full px-8 py-4 font-semibold text-white"
        >
          챌린지 바로가기
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
