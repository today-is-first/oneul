import MyFeedCard from "@/components/feed/MyFeedCard";
import BannerSlider from "@/components/home/BannerSlider";
import CommunityFeed from "@/components/home/CommunityFeedList";
import { Feed } from "@/types/Feed";
import { useState } from "react";
import MonthlyStats from "@/components/home/MonthlyStats";
import StreakCalendar from "@/components/home/StreakCalendar";
import WorkoutModal from "@/components/home/WorkoutModal";
import FeedCreateModal from "@/components/feed/FeedCreateModal";
import { useFeedStore } from "@/stores/feedStore";
import { useQueryClient } from "@tanstack/react-query";
import FeedUpdateModal from "@/components/feed/FeedUpdateModal";
import FeedDetailModal from "@/components/feed/FeedDetailModal";

export const getContributionColor = (count: number) => {
  if (count >= 4) return "bg-primary-500"; // 진한 보라색
  if (count >= 3) return "bg-primary-400"; // 중간 보라색
  if (count >= 2) return "bg-primary-300"; // 밝은 보라색
  if (count >= 1) return "bg-primary-200"; // 가장 밝은 보라색
  return "bg-neutral-700";
};

const MyWorkoutDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const myFeeds = useFeedStore((state) => state.myFeeds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const streak = useFeedStore((state) => state.streak);

  const feedCountByMonth = Array(12).fill(0);

  streak.forEach((item) => {
    const d = new Date(item.date);
    if (d.getFullYear() === currentYear) {
      feedCountByMonth[d.getMonth()] += item.count;
    }
  });

  const monthAchievementRate = feedCountByMonth.map((count, i) => {
    const daysInMonth = new Date(currentYear, i + 1, 0).getDate();
    return Math.round((count / daysInMonth) * 100);
  });

  const contributionsByDate: Record<string, number> = {};
  streak.forEach((item) => {
    contributionsByDate[item.date] = item.count;
  });

  const handleCreateFeed = () => {
    // TODO: 인증 생성 로직 구현
    setIsModalOpen(true);
  };

  const handleEditFeed = (feed: Feed) => {
    // TODO: 인증 수정 로직 구현
    console.log("Edit feed:", feed);
  };

  const handleDetailFeed = (feed: Feed) => {
    setSelectedFeed(feed);
    setIsDetailModalOpen(true);
  };

  const queryClient = useQueryClient();

  const invalidateFeeds = () => {
    queryClient.invalidateQueries({
      queryKey: ["myFeeds"],
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <FeedCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={invalidateFeeds}
      />
      <FeedUpdateModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={myFeeds[0]}
        onUpdate={invalidateFeeds}
      />
      <BannerSlider />
      <FeedDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        feed={selectedFeed}
      />
      <CommunityFeed onFeedClick={handleDetailFeed} />
      <div className="flex w-full max-w-[1200px] justify-between gap-8">
        {/* 오늘의 인증 섹션 */}
        <div className="w-1/3 rounded-lg bg-[#1A1A1E] p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">오늘의 인증</h2>
          <MyFeedCard
            feed={myFeeds[0]}
            onCreate={handleCreateFeed}
            onEdit={() => setIsEditModalOpen(true)}
            onDetail={handleDetailFeed}
          />
        </div>
        <div className="flex w-2/3 flex-col rounded-lg bg-[#1A1A1E] p-6">
          <div>
            <h2 className="mb-6 text-xl font-semibold text-white">월간 통계</h2>
            <p className="mb-4 text-gray-400">
              한 해 동안 오늘의 인증 달성률을 확인해보세요!
            </p>
          </div>
          <MonthlyStats monthAchievementRate={monthAchievementRate} />
        </div>
      </div>

      <WorkoutModal
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="w-full max-w-[1200px] rounded-lg bg-[#1A1A1E] p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">스트릭 캘린더</h2>
        <StreakCalendar
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          contributionsByDate={contributionsByDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default MyWorkoutDashboard;
