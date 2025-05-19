// ChallengePaymentPage.tsx
import { useEffect, useState } from "react";
import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useUserStore } from "@/stores/userStore";
import { useParams } from "react-router";
import { useChallenge } from "@/hooks/useChallenge";

interface Amount {
  currency: "KRW";
  value: number;
}

const ChallengePaymentPage: React.FC = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const user = useUserStore.getState().user;
  const customerKey = user ? "user_" + user.id : null; // 고객 식별키

  // 챌린지 정보 호출
  const {
    data: challenge,
    isLoading,
    isError,
    error,
  } = useChallenge(challengeId ?? "");

  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [amount, setAmount] = useState<Amount>({ currency: "KRW", value: 0 });
  const [isReady, setIsReady] = useState(false);

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
    if (!widgets) return;
    (async () => {
      // 1) 금액 설정
      await widgets.setAmount(amount);

      // 2) 결제 수단 렌더링
      await widgets.renderPaymentMethods({
        selector: "#payment-method",
        variantKey: "DEFAULT",
      });

      // 3) 약관 UI 렌더링 후, 이벤트 리스너 등록
      const agreementWidget = await widgets.renderAgreement({
        selector: "#agreement",
        variantKey: "AGREEMENT",
      });
      agreementWidget.on("agreementStatusChange", ({ agreedRequiredTerms }) => {
        // 꼭 필수 약관에 동의해야만 결제 버튼 활성화
        setIsReady(agreedRequiredTerms);
      });
      setIsReady(true);
    })();
  }, [widgets, amount]);

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
      // TODO: 서버에 orderId/amount 저장
      await widgets.requestPayment({
        orderId: "rIc1Ge6eo-bWcEidwcINX",
        orderName: challenge.name,
        customerEmail: user?.email,
        customerName: user?.name,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!challenge) return <p>잘못된 결제 요청입니다.</p>;

  // ─── 렌더 ─────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#0E0E11]">
      <div className="flex min-h-screen flex-col gap-4 bg-white pt-4">
        <section className="flex w-[600px] flex-col items-center p-8">
          <h1 className="mb-8 text-2xl font-bold">챌린지 결제</h1>
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

          <button
            onClick={onPayClick}
            disabled={!isReady}
            className="bg-primary-purple-400 disabled:bg-primary-purple-100 w-full cursor-pointer rounded-lg px-6 py-5 font-medium text-white disabled:cursor-default disabled:opacity-50"
          >
            결제하기
          </button>
        </section>
      </div>
    </div>
  );
};

export default ChallengePaymentPage;
