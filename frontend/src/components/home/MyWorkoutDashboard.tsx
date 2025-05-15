import MyFeedCard from "@/components/feed/MyFeedCard";
import CommunityFeed from "@/components/home/CommunityFeed";
import { feedData } from "@/constants/homeConstants";
import { eachDayOfInterval, endOfYear, startOfYear } from "date-fns";
import { useState } from "react";
import MonthlyStats from "./MonthlyStats";
import StreakCalendar from "./StreakCalendar";
import WorkoutModal from "./WorkoutModal";
import { Feed } from "@/types/Feed";

export const getContributionColor = (count: number) => {
  if (count >= 4) return "bg-[#8B5CF6]"; // 진한 보라색
  if (count >= 3) return "bg-[#A78BFA]"; // 중간 보라색
  if (count >= 2) return "bg-[#C4B5FD]"; // 밝은 보라색
  if (count >= 1) return "bg-[#DDD6FE]"; // 가장 밝은 보라색
  return "bg-neutral-700";
};

const getYearDays = (year: number) => {
  return eachDayOfInterval({
    start: startOfYear(new Date(year, 0, 1)),
    end: endOfYear(new Date(year, 0, 1)),
  });
};

const MyWorkoutDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [todayFeed, setTodayFeed] = useState<Feed | null>(null);

  const feedCountByMonth = Array(12).fill(0);
  Object.keys(feedData).forEach((date) => {
    const d = new Date(date);
    if (d.getFullYear() === currentYear) {
      feedCountByMonth[d.getMonth()]++;
    }
  });

  const monthAchievementRate = feedCountByMonth.map((count, i) => {
    const daysInMonth = new Date(currentYear, i + 1, 0).getDate();
    return Math.round((count / daysInMonth) * 100);
  });

  const contributionsByDate: Record<string, number> = {};
  Object.entries(feedData).forEach(([date, feeds]) => {
    contributionsByDate[date] = feeds.length;
  });

  const handleCreateFeed = () => {
    // TODO: 인증 생성 로직 구현
    window.location.href = "/challenge/create";
  };

  const handleEditFeed = (feed: Feed) => {
    // TODO: 인증 수정 로직 구현
    console.log("Edit feed:", feed);
  };

  const handleDetailFeed = (feed: Feed) => {
    // TODO: 인증 상세 보기 로직 구현
    console.log("View feed details:", feed);
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <CommunityFeed />
      <div className="flex justify-between gap-8">
        {/* 오늘의 인증 섹션 */}
        <div className="w-1/3 rounded-lg bg-[#1A1A1E] p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">오늘의 인증</h2>
          <MyFeedCard
            feed={todayFeed}
            onCreate={handleCreateFeed}
            onEdit={handleEditFeed}
            onDetail={handleDetailFeed}
          />
        </div>
        <div className="w-2/3 rounded-lg bg-[#1A1A1E] p-6">
          <h2 className="mb-6 text-xl font-semibold text-white">월간 통계</h2>
          <MonthlyStats monthAchievementRate={monthAchievementRate} />
        </div>
      </div>

      <WorkoutModal
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="rounded-lg bg-[#1A1A1E] p-6">
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
