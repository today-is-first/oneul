import MainLayout from "@/layouts/MainLayout";
import ChallengeCreatePage from "@components/challengeCreate/ChallengeCreatePage";
import ChallengeDetailPage from "@components/challengeDetail/ChallengeDetailPage";
import ChallengeSearchPage from "@components/challengeSearch/ChallengeSearchPage";
import Home from "@components/home/Home";
import LoginPage from "@components/login/LoginPage";
import OAuthRedirectPage from "@components/login/OAuthRedirectPage";
import RegistPage from "@components/regist/RegistPage";
import { useSocketStore } from "@stores/socketStore";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import "@/App.css";
import "@/chart";
import ChallengePaymentPage from "@components/payment/ChallengePaymentPage";
import PaymentSuccessPage from "@components/payment/PaymentSuccessPage";
import PaymentFailPage from "@components/payment/PaymentFailPage";
import MyPage from "@components/mypage/MyPage";

import { useUserStore } from "./stores/userStore";

function App() {
  const { connect, disconnect } = useSocketStore();
  const { user } = useUserStore();

  useEffect(() => {
    useUserStore.getState().initializeFromToken();
  }, []);

  useEffect(() => {
    if (user) {
      connect();
      return () => disconnect();
    }
  }, [user]);

  return (
    <div className="bg-background h-full w-full">
      <Routes>
        {/* MainLayout이 필요한 라우트들 */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/challenge/:challengeId"
            element={<ChallengeDetailPage />}
          />
          <Route path="/challenge/detail" element={<ChallengeDetailPage />} />
          <Route path="/challenge/search" element={<ChallengeSearchPage />} />
          <Route path="/challenge/create" element={<ChallengeCreatePage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        {/* MainLayout이 필요없는 라우트들 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistPage />} />
        <Route path="/oauth/redirect" element={<OAuthRedirectPage />} />
        <Route
          path="challenge/:challengeId/order"
          element={<ChallengePaymentPage />}
        />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/fail" element={<PaymentFailPage />} />
      </Routes>
    </div>
  );
}

export default App;
