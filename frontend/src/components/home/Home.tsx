import GoToChallengeCreateButton from "@components/challengeCreate/GoToChallengeCreateButton";
import ChallengeList from "@/components/challenge/ChallengeList";
import MyWorkoutDashbaord from "@/components/home/MyWorkoutDashboard";

function Home() {
  return (
    <div className="h-full w-full bg-[#0E0E11]">
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
