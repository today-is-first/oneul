import { Link } from 'react-router-dom';
import Button from './Button';

function LoginBtn() {
  return (
    <Link to="/login">
      <Button onClick={() => {}}>로그인</Button>
    </Link>
  );
}

export default LoginBtn;
