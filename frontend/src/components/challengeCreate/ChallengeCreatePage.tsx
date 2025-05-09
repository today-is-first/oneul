import Header from "@components/common/Header";
import Logo from "@components/common/Logo";
import ChallengeRoomForm from "@components/challengeCreate/ChallengeRoomForm";
import NavBar from "@components/common/NavBar";
import LoginBtn from "@components/common/LoginBtn";

function ChallengeCreatePage() {
  return (
    <div className="flex min-h-screen select-none flex-col items-center bg-gradient-to-bl from-[#21414F] via-[#10212b] to-[#17171C]">
      <Header left={<Logo />} center={<NavBar />} right={<LoginBtn />} />

      <div className="flex w-full flex-1 items-center justify-center">
        <ChallengeRoomForm />
      </div>
    </div>
  );
}

export default ChallengeCreatePage;
