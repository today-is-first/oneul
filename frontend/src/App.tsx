import "./App.css";
import { Routes, Route } from "react-router";
import Home from "@components/home/Home";
import LoginPage from "@components/login/LoginPage";
import RegistPage from "@components/regist/RegistPage";
import ChallengeCreatePage from "./components/challengeCreate/ChallengeCreatePage";
import ChallengeRoomPage from "./components/challenge/roomDetail/ChallengeRoomPage";
import ChallengeDetailPage from "./components/challengeDetail/challengeDetailPage";

function App() {
  return (
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistPage />} />
        <Route path="/challenge/create" element={<ChallengeCreatePage />} />
        <Route path="/challenge" element={<ChallengeRoomPage />} />
        <Route path="/challenge/detail" element={<ChallengeDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
