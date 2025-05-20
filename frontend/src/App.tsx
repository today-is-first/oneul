import MainLayout from "@/layouts/MainLayout";
import ChallengeCreatePage from "@components/challengeCreate/ChallengeCreatePage";
import ChallengeDetailPage from "@components/challengeDetail/ChallengeDetailPage";
import ChallengeSearchPage from "@components/challengeSearch/ChallengeSearchPage";
import Home from "@components/home/Home";
import LoginPage from "@components/login/LoginPage";
import OAuthRedirectPage from "@components/login/OAuthRedirectPage";
import RegistPage from "@components/regist/RegistPage";
import { useSocketStore } from "@stores/socketStore";
import { useUserStore } from "@stores/userStore";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import "./chart";

import { get } from "./api/api";
import { useQuery } from "@tanstack/react-query";
import { useChallengeStore } from "@/stores/challengeStore";
import { useFeedStore } from "@/stores/feedStore";
import { Feed } from "@/types/Feed";
import { Streak } from "@/types/Streak";
import { Challenge } from "./types/Challenge";
import ChallengePaymentPage from "@components/payment/ChallengePaymentPage";
import PaymentSuccessPage from "./components/payment/PaymentSuccessPage";

function App() {
  const { user } = useUserStore();
  const { connect, disconnect } = useSocketStore();
  const { data: challengeList } = useQuery<Challenge[]>({
    queryKey: ["challengeList"],
    queryFn: () => get("/challenges"),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });

  const { data: myFeeds } = useQuery<Feed[]>({
    queryKey: ["myFeeds"],
    queryFn: () => get("/feeds/my"),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });

  const { data: communityFeeds } = useQuery<Feed[]>({
    queryKey: ["communityFeeds"],
    queryFn: () => get("/feeds/community"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: streak } = useQuery<Streak[]>({
    queryKey: ["streak"],
    queryFn: () => get("/feeds/streak"),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });

  const { data: communityChallengeList } = useQuery<Challenge[]>({
    queryKey: ["communityChallengeList"],
    queryFn: () => get("/challenges/community"),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });

  const { data: subscribedChallengeList } = useQuery<Challenge[]>({
    queryKey: ["subscribedChallengeList"],
    queryFn: () => get("/challenges/subscribed"),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });

  useEffect(() => {
    useUserStore.getState().initializeFromToken();
  }, []);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (challengeList) {
      useChallengeStore.getState().setChallenges(challengeList);
    }
  }, [challengeList]);

  useEffect(() => {
    if (myFeeds) {
      useFeedStore.getState().setMyFeeds(myFeeds);
    }
  }, [myFeeds]);

  useEffect(() => {
    if (communityFeeds) {
      useFeedStore.getState().setCommunityFeeds(communityFeeds);
    }
  }, [communityFeeds]);

  useEffect(() => {
    if (streak) {
      useFeedStore.getState().setStreak(streak);
    }
  }, [streak]);

  useEffect(() => {
    if (communityChallengeList) {
      useChallengeStore
        .getState()
        .setCommunityChallengeList(communityChallengeList);
    }
  }, [communityChallengeList]);

  useEffect(() => {
    if (subscribedChallengeList) {
      useChallengeStore
        .getState()
        .setSubscribedChallengeList(subscribedChallengeList);
    }
  }, [subscribedChallengeList]);

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
        </Route>

        {/* MainLayout이 필요없는 라우트들 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistPage />} />
        <Route path="/challenge/create" element={<ChallengeCreatePage />} />
        <Route path="/oauth/redirect" element={<OAuthRedirectPage />} />
        <Route
          path="challenge/:challengeId/order"
          element={<ChallengePaymentPage />}
        />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;
