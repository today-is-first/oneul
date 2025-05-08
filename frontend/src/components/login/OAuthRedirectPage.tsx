import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketStore } from "@stores/socketStore";
import { useUserStore } from "@/stores/userStore";

const OAuthRedirectPage = () => {
  const navigate = useNavigate();
  const { connect } = useSocketStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const signupCompletedStr = params.get("signupCompleted");
    const signupCompleted = signupCompletedStr === "true";
    useUserStore.getState().initializeFromToken();
    if (signupCompleted) {
      console.log("signupCompleted : connect 시도");
      connect();
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, [navigate, connect]);

  return (
    <div>
      <h1>로그인 처리 중...</h1>
    </div>
  );
};

export default OAuthRedirectPage;
