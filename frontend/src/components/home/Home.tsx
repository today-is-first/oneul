import Header from "@components/common/Header";
import Logo from "@components/common/Logo";
import NavBar from "@components/common/NavBar";
import LoginBtn from "@components/common/LoginBtn";
import GoToChallengeCreateButton from "@components/challengeCreate/GoToChallengeCreateButton";
import FeedCreateBtn from "@/components/feed/FeedCreateBtn";

function Home() {
  return (
    <div className="bg-background h-full w-full">
      <Header left={<Logo />} center={<NavBar />} right={<LoginBtn />} />
      <div className="flex flex-col items-center justify-center">
        <GoToChallengeCreateButton />
      </div>
      <div className="flex flex-col items-center justify-center">
        <FeedCreateBtn />
      </div>
    </div>
  );
}

export default Home;
