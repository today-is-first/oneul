import "./App.css";
import { Routes, Route } from "react-router";
import Home from "@components/home/Home";
import LoginPage from "@components/login/LoginPage";
import RegistPage from "@components/regist/RegistPage";
import ChallengeCreatePage from "@components/challengeCreate/ChallengeCreatePage";
import ChallengeDetailPage from "@components/challengeDetail/ChallengeDetailPage";
import OAuthRedirectPage from "@components/login/OAuthRedirectPage";
import { useEffect } from "react";
import { useUserStore } from "@stores/userStore";
import { useSocketStore } from "./stores/socketStore";

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
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistPage />} />
        <Route
          path="/challenge/:challengeId"
          element={<ChallengeDetailPage />}
        />
        <Route path="/challenge/create" element={<ChallengeCreatePage />} />
        <Route path="/challenge/detail" element={<ChallengeDetailPage />} />
        <Route path="/oauth/redirect" element={<OAuthRedirectPage />} />
      </Routes>
    </div>
  );
}

export default App;
