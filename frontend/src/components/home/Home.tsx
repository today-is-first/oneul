import GoToChallengeCreateButton from "@components/challengeCreate/GoToChallengeCreateButton";
import ChallengeList from "@/components/challenge/ChallengeList";
import MyWorkoutDashbaord from "@/components/home/MyWorkoutDashboard";

function Home() {
  return (
    <div className="bg-background h-full w-full">
      <div className="flex items-center justify-center">
        <MyWorkoutDashbaord />
      </div>

      <div className="flex flex-col items-center justify-center">
        <ChallengeList />
        <GoToChallengeCreateButton />
      </div>
    </div>
  );
}

export default Home;
