import "./App.css";
import { Routes, Route } from "react-router";
import MainLayout from "@/layouts/MainLayout";
import Home from "@components/home/Home";
import LoginPage from "@components/login/LoginPage";
import RegistPage from "@components/regist/RegistPage";
import ChallengeCreatePage from "@components/challengeCreate/ChallengeCreatePage";
import ChallengeDetailPage from "@components/challengeDetail/ChallengeDetailPage";
import OAuthRedirectPage from "@components/login/OAuthRedirectPage";
import { useEffect } from "react";
import { useUserStore } from "@stores/userStore";
import { useSocketStore } from "./stores/socketStore";
import "./chart";

function App() {
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    useUserStore.getState().initializeFromToken();
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

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
        </Route>

        {/* MainLayout이 필요없는 라우트들 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistPage />} />
        <Route path="/challenge/create" element={<ChallengeCreatePage />} />
        <Route path="/oauth/redirect" element={<OAuthRedirectPage />} />
      </Routes>
    </div>
  );
}

export default App;
