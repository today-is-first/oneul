import GoToChallengeCreateButton from "@components/challengeCreate/GoToChallengeCreateButton";
import ChallengeList from "../challenge/ChallengeList";

function Home() {
  return (
    <div className="bg-background h-full w-full">
      <div className="flex flex-col items-center justify-center">
        <GoToChallengeCreateButton />
      </div>
      <div className="flex flex-col items-center justify-center">
        <ChallengeList />
      </div>
    </div>
  );
}

export default Home;
