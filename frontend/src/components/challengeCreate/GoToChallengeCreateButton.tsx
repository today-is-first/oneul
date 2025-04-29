import { Link } from "react-router-dom";

function GoToChallengeCreateButton() {
  return (
    <Link to="/challenge/create">
      <button className="bg-point font-lg text-semibold h-12 w-40 rounded-lg text-white shadow-md transition-all hover:opacity-90">
        챌린지 방 생성
      </button>
    </Link>
  );
}

export default GoToChallengeCreateButton;
