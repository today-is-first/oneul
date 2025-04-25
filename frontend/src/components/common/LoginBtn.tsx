import { Link } from "react-router";
import Button from "./Button";

function LoginBtn() {
  return (
    <Link to="/login">
      <Button onClick={() => {}}>로그인</Button>
    </Link>
  );
}

export default LoginBtn;
