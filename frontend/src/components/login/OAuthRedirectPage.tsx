import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const signupCompletedStr = params.get("signupCompleted");
    const signupCompleted = signupCompletedStr === "true";
    signupCompleted ? navigate("/") : navigate("/signup");
  }, [navigate]);

  return (
    <div>
      <h1>로그인 처리 중...</h1>
    </div>
  );
};

export default OAuthRedirectPage;
