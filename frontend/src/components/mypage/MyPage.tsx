import MyChallengeList from "@/components/mypage/MyChallengeList";
import MyFeedList from "@/components/mypage/MyFeedList";

function MyPage() {
  return (
    <div className="h-full w-full bg-[#0E0E11]">
      <div className="flex flex-col px-4 py-10">
        <MyFeedList />
        <MyChallengeList />
      </div>
    </div>
  );
}

export default MyPage;
