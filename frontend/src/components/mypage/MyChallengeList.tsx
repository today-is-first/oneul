import { categories, tabs } from "@/constants/challengeSearchContants";
import { Challenge } from "@/types/Challenge";
import { useState } from "react";
import { challengeStatusTranslate } from "@/constants/challengeSearchContants";
import { FiSearch } from "react-icons/fi";
import ChallenegeModeTab from "../challengeSearch/ChallenegeModeTab";
import ChallengeStatusTab from "../challengeSearch/ChallengeStatusTab";
import CategoryTab from "../challengeSearch/CategoryTab";
import ChallengeSearchRoomItem from "../challengeSearch/ChallengeSearchRoomItem";
import { useMyChallengeList } from "@/hooks/useChallenge";
import { filteredList } from "@/utils/challengeUtil";

function MyChallengeList() {
  const [activeTab, setActiveTab] = useState("전체");
  const [activeCategory, setActiveCategory] = useState<string | null>("전체");
  const [activeStatus, setActiveStatus] = useState("전체");
  const [keyword, setKeyword] = useState("");
  const myChallengeList = useMyChallengeList();

  const onChallengeClick = (challenge: Challenge) => {
    window.location.href = `/challenge/${challenge.challengeId}`;
  };

  const list = filteredList(
    myChallengeList ?? [],
    activeTab,
    activeCategory ?? "전체",
    activeStatus,
    keyword,
  );
  return (
    <div className="flex justify-center bg-[#0E0E11] px-4 py-10 text-white">
      <div className="flex w-full max-w-6xl flex-col gap-8">
        <h1 className="text-2xl font-bold text-white">참여한 챌린지</h1>

        {/* 필터 영역 */}
        <div className="rounded-xl bg-[#1A1A1E] p-6 shadow-md">
          <div className="flex flex-col gap-6">
            {/* 모드 탭 */}
            <div className="flex gap-3">
              {tabs.map((tab) => (
                <ChallenegeModeTab
                  key={tab}
                  tab={tab}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              ))}
            </div>

            {/* 챌린지 상태 탭 */}
            <div className="flex gap-3">
              {Object.keys(challengeStatusTranslate).map((status) => (
                <ChallengeStatusTab
                  key={status}
                  status={status}
                  activeStatus={activeStatus}
                  setActiveStatus={setActiveStatus}
                />
              ))}
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <CategoryTab
                  key={cat}
                  cat={cat}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              ))}
            </div>

            {/* 검색창 */}
            <div className="relative w-full max-w-md">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="챌린지 이름으로 검색하세요"
                className="bg-input-gray w-full rounded-md px-4 py-2 pr-10 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 챌린지 리스트 */}
        <div className="rounded-xl bg-[#1A1A1E] p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-white">
            나의 챌린지 목록
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list?.map((challenge) => (
              <ChallengeSearchRoomItem
                key={challenge.challengeId}
                challenge={challenge}
                setSelected={onChallengeClick}
                setIsModalOpen={() => {}}
              />
            ))}
            {list?.length === 0 && (
              <div className="col-span-full py-12 text-center text-sm text-gray-500">
                조건에 맞는 챌린지가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyChallengeList;
