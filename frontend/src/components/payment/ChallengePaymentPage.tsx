import { useEffect, useState } from "react";
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useUserStore } from "@/stores/userStore";
import { useNavigate, useParams } from "react-router";
import { useChallenge } from "@/hooks/useChallenge";
import { getOrderId } from "@/api/payment";
import { FiArrowLeft } from "react-icons/fi";
import { Amount, ConfirmPaymentRequest } from "@/types/Payment";
import { useConfirmPayment } from "@/hooks/usePayment";
import { AxiosError } from "axios";

const ChallengePaymentPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const user = useUserStore.getState().user;
  const customerKey = user ? "user_" + user.id : null; // 고객 식별키
  const navigate = useNavigate();

  // 챌린지 정보 호출
  const {
    data: challenge,
    isLoading,
    isError,
    error,
  } = useChallenge(challengeId ?? "");

  const { mutateAsync: confirmPayment } = useConfirmPayment();

  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = useState<Amount>({ currency: "KRW", value: 0 });
  const [isReady, setIsReady] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);

  const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY!;

  // 1) SDK 초기화
  useEffect(() => {
    if (!customerKey) return;
    loadTossPayments(clientKey)
      .then((toss) => setWidgets(toss.widgets({ customerKey })))
      .catch(console.error);
  }, [clientKey, customerKey]);

  // 2) challenge.entryFee가 로드되면 amount 세팅
  useEffect(() => {
    if (challenge?.entryFee) {
      setAmount({ currency: "KRW", value: challenge.entryFee });
    }
  }, [challenge]);

  // 3) widgets & amount 준비되면 결제 UI 렌더링
  useEffect(() => {
    // widgets가 준비되고, challenge(entryFee)가 로드된 다음에만 실행
    if (!widgets || isLoading || !challenge) return;

    (async () => {
      try {
        // 1) 금액 설정
        await widgets.setAmount({ currency: "KRW", value: challenge.entryFee });

        // 2) 결제 수단 렌더링
        await widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        });

        // 3) 약관 렌더링 & 이벤트 등록
        const agreementWidget = await widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        });
        agreementWidget.on(
          "agreementStatusChange",
          ({ agreedRequiredTerms }) => {
            setIsReady(agreedRequiredTerms);
          },
        );

        setIsReady(true);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [widgets, isLoading, challenge]);

  // ─── 화면 상태 처리 ─────────────────────────────────────────────
  if (!challengeId) {
    return <p className="p-4 text-center">잘못된 경로입니다.</p>;
  }
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        로딩 중…
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400">
        에러: {(error as Error).message}
      </div>
    );
  }

  // ─── 결제 요청 핸들러 ────────────────────────────────────────────
  const onPayClick = async () => {
    if (!widgets || !challenge) return;
    try {
      // 서버에 orderId 요청
      setIsOrdering(true);
      const { orderId } = await getOrderId(challengeId);
      console.log(orderId);

      const {
        paymentKey,
        orderId: paidOrderId,
        amount: paidAmount,
      } = await widgets.requestPayment({
        orderId: orderId,
        orderName: challenge.name,
        customerEmail: user?.email,
        customerName: user?.name,
      });

      sessionStorage.setItem(
        "toss:paymentPending",
        JSON.stringify({ orderId: paidOrderId, paymentKey }),
      ); // 페이먼트 키+오더아이디 저장

      const payload: ConfirmPaymentRequest = {
        challengeId: +challengeId,
        orderId: paidOrderId,
        paymentKey,
        amount: paidAmount.value,
      };

      // 서버에 결제 검증 요청
      await confirmPayment(payload);

      // 성공 페이지로 이동, 뒤로가기 X
      navigate(`/payment/success/${challengeId}`, {
        replace: true,
      });
    } catch (err) {
      console.error("결제 오류:", err);
      const axiosErr = err as AxiosError<{
        errorCode: number;
        errorMessage: string;
      }>;
      const httpStatus = axiosErr.response?.status;
      const body = axiosErr.response?.data;
      const errorCode = body?.errorCode;
      const errorMessage = body?.errorMessage;

      // 실패 페이지로 이동, 뒤로가기 X
      navigate(`/payment/fail/${challengeId}`, {
        replace: true,
        state: { httpStatus, errorCode, errorMessage },
      });
    } finally {
      setIsOrdering(false);
    }
  };

  if (!challenge) return <p>잘못된 결제 요청입니다.</p>;

  // ─── 렌더 ─────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0E0E11]">
      <div className="flex min-h-screen flex-col gap-4 bg-white pt-4">
        <section className="flex w-[600px] flex-col items-center p-8">
          <div className="relative mb-8 flex w-full items-center justify-center">
            <button
              onClick={() => window.history.back()}
              className="absolute left-[30px] flex cursor-pointer items-center text-2xl text-gray-400"
            >
              <FiArrowLeft />
            </button>
            <h1 className="text-2xl font-bold">챌린지 결제</h1>
          </div>
          <div className="w-full px-[24px]">
            <div className="border-primary-purple-100 flex flex-col gap-2 rounded-md border p-8">
              <div className="flex justify-between gap-4">
                <span className="font-semibold text-gray-500">챌린지 이름</span>
                <span>{challenge.name}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="font-semibold text-gray-500">결제 금액</span>
                <span>{amount.value.toLocaleString()}원</span>
              </div>
            </div>
          </div>
          <div id="payment-method" className="w-full" />
          <div id="agreement" className="mb-6 w-full text-center" />
          <div className="w-full px-[30px]">
            <button
              onClick={onPayClick}
              disabled={!isReady || isOrdering}
              className="bg-primary-purple-400 disabled:bg-primary-purple-100 w-full rounded-lg px-6 py-5 text-lg font-semibold text-white disabled:cursor-default disabled:opacity-50"
            >
              {isOrdering ? "결제 진행중" : "결제하기"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChallengePaymentPage;
