// pages/ChallengeSearchPage.tsx
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Badge from "@components/common/Badge";
import { categories, tabs } from "@/constants/challengeSearchContants";
import { useChallengeStore } from "@/stores/challengeStore";
import { Challenge } from "@/types/Challenge";
import ChallengeDetailModal from "@components/challengeRegist/ChallengeDetailModal";

const ChallengeSearchPage = () => {
  const [activeTab, setActiveTab] = useState("전체");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState<Challenge | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const challengeList = useChallengeStore(
    (state) => state.communityChallengeList,
  );

  const filteredList = challengeList.filter((c) => {
    const matchTab =
      activeTab === "전체" ||
      (activeTab === "챌린지" && c.challenge) ||
      (activeTab === "일반" && !c.challenge);

    const category = categories[c.categoryId];
    const matchCategory = !activeCategory || category === activeCategory;
    const matchKeyword =
      keyword === "" || c.name.toLowerCase().includes(keyword.toLowerCase());
    return matchTab && matchCategory && matchKeyword;
  });

  return (
    <div className="flex justify-center bg-[#0E0E11] px-4 py-10 text-white">
      <div className="flex w-full max-w-6xl flex-col gap-8">
        {/* 타이틀 */}
        <h1 className="text-2xl font-bold text-white">챌린지 방 탐색</h1>

        {/* 필터 영역 */}
        <div className="rounded-xl bg-[#1A1A1E] p-6 shadow-md">
          <div className="flex flex-col gap-6">
            {/* 탭 */}
            <div className="flex gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-white text-black"
                      : "bg-[#2A2A2E] text-white hover:bg-[#3A3A3E]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setActiveCategory((prev) => (prev === cat ? null : cat))
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${activeCategory === cat ? "bg-[#8B5CF6] text-white" : "bg-[#2A2A2E] text-white hover:bg-[#3A3A3E]"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 검색창 */}
            <div className="relative w-full max-w-md">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type="text"
                placeholder="방 이름으로 검색하세요"
                className="w-full rounded-md bg-[#222227] px-4 py-2 pr-10 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
              <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 챌린지 리스트 */}
        <div className="rounded-xl bg-[#1A1A1E] p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold text-white">
            추천 방 목록
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredList.map((room) => (
              <div
                key={room.challengeId}
                className="cursor-pointer rounded-lg border border-[#2F2F33] bg-[#222227] p-5 shadow-sm transition hover:shadow-md"
                onClick={() => {
                  setSelected(room);
                  setIsModalOpen(true);
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="line-clamp-1 text-base font-semibold text-white">
                    {room.name}
                  </h3>
                  <Badge type={room.challenge ? "challenge" : "normal"}>
                    {room.challenge ? "챌린지" : "일반"}
                  </Badge>
                </div>
                <p className="mb-2 line-clamp-2 text-sm text-gray-400">
                  {room.description}
                </p>
                <div className="text-xs text-gray-500">
                  {room.totalDay}일 중 {room.goalDay}일 목표 ・ 참여자{" "}
                  {room.memberCount || 0}명
                </div>
              </div>
            ))}
            {filteredList.length === 0 && (
              <div className="col-span-full py-12 text-center text-sm text-gray-500">
                조건에 맞는 방이 없습니다.
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
