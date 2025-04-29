import Header from "@components/common/Header";
import Logo from "@components/common/Logo";
import ChallengeRoomForm from "@components/challengeCreate/ChallengeRoomForm";
import NavBar from "@components/common/NavBar";
import LoginBtn from "@components/common/LoginBtn";

function ChallengeCreatePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-[#21414F] via-[#10212b] to-[#17171C] select-none">
      <Header left={<Logo />} center={<NavBar />} right={<LoginBtn />} />
      <ChallengeRoomForm />
    </div>
  );
}

export default ChallengeCreatePage;
