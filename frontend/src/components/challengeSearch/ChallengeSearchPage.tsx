// pages/ChallengeSearchPage.tsx
import {
  categories,
  challengeStatusTranslate,
  tabs,
} from "@/constants/challengeSearchContants";
import { useChallengeStore } from "@/stores/challengeStore";
import { Challenge } from "@/types/Challenge";
import ChallengeDetailModal from "@components/challengeRegist/ChallengeDetailModal";
import CategoryTab from "@components/challengeSearch/CategoryTab";
import ChallenegeModeTab from "@components/challengeSearch/ChallenegeModeTab";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import ChallengeSearchRoomItem from "@components/challengeSearch/ChallengeSearchRoomItem";
import ChallengeStatusTab from "@components/challengeSearch/ChallengeStatusTab";
import ChallegeCreateBtn from "@components/challengeSearch/ChallegeCreateBtn";

const ChallengeSearchPage = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [activeCategory, setActiveCategory] = useState<string | null>("전체");
  const [activeStatus, setActiveStatus] = useState("모집중");
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<Challenge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const challengeList = useChallengeStore(
    (state) => state.communityChallengeList,
  );

  const filteredList = challengeList.filter((c) => {
    const matchTab =
      activeTab === "전체"
        ? true
        : (activeTab === "챌린지" && c.challenge) ||
          (activeTab === "일반" && !c.challenge);

    const category = categories[c.categoryId];
    const matchCategory =
      activeCategory === "전체" ? true : category === activeCategory;

    const matchStatus =
      activeStatus === "전체"
        ? true
        : (activeStatus === "모집중" &&
            c.challengeStatus === challengeStatusTranslate["모집중"]) ||
          (activeStatus === "진행중" &&
            c.challengeStatus === challengeStatusTranslate["진행중"]) ||
          (activeStatus === "종료" &&
            c.challengeStatus === challengeStatusTranslate["종료"]);

    const matchKeyword =
      keyword === "" || c.name.toLowerCase().includes(keyword.toLowerCase());

    return matchTab && matchCategory && matchKeyword && matchStatus;
  });

  return (
    <div className="flex justify-center bg-[#0E0E11] px-4 py-10 text-white">
      <div className="flex w-full max-w-6xl flex-col gap-8">
        <h1 className="text-2xl font-bold text-white">챌린지 방 탐색</h1>
        <div className="flex items-center justify-between gap-4">
          {/* 필터 영역 */}
          <div className="w-2/3 rounded-xl bg-[#1A1A1E] p-6 shadow-md">
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
          <div className="flex h-full w-1/3 flex-col rounded-2xl bg-[#1A1A1E] p-6 shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-white">
              나만의 챌린지 만들기
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              내가 원하는 챌린지를 만들어보세요!
            </p>
            <ChallegeCreateBtn />
          </div>
        </div>

        {/* 챌린지 리스트 */}
        <div className="rounded-xl bg-[#1A1A1E] p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-white">
            추천 챌린지 목록
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredList.map((challenge) => (
              <ChallengeSearchRoomItem
                key={challenge.challengeId}
                challenge={challenge}
                setSelected={setSelected}
                setIsModalOpen={setIsModalOpen}
              />
            ))}
            {filteredList.length === 0 && (
              <div className="col-span-full py-12 text-center text-sm text-gray-500">
                조건에 맞는 챌린지가 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 모달 삽입 */}
        {selected && (
          <ChallengeDetailModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            challenge={selected}
          />
        )}
      </div>
    </div>
  );
};

export default ChallengeSearchPage;
