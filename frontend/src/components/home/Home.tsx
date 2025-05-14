import GoToChallengeCreateButton from "@components/challengeCreate/GoToChallengeCreateButton";
import ChallengeList from "../challenge/ChallengeList";
import MyWorkoutDashbaord from "./MyWorkoutDashboard";

function Home() {
  return (
    <div className="bg-background h-full w-full">
      <div className="flex items-center justify-center">
        <MyWorkoutDashbaord />
        <div className="flex flex-col items-center justify-center"></div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <ChallengeList />
        <GoToChallengeCreateButton />
      </div>
    </div>
  );
}

export default Home;
