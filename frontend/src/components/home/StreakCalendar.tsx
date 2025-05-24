import { getDay, format } from "date-fns";
import Card from "@/components/common/Card";
import CardContent from "@/components/common/CardContent";
import { StreakCalendarProps } from "@/types/home";
import { monthLabels } from "@/constants/homeConstants";
import { getYearDays } from "@/utils/dateUtils";
import { useStreak } from "@/hooks/useStreak";

const weekdayLabels = ["일", "", "화", "", "목", "", "토"];

const getContributionColor = (count: number) => {
  if (count >= 4) return "bg-[#6D28D9]"; // 더 진한 보라색
  if (count >= 3) return "bg-[#7C3AED]"; // 진한 보라색
  if (count >= 2) return "bg-[#8B5CF6]"; // 중간 보라색
  if (count >= 1) return "bg-[#A78BFA]"; // 밝은 보라색
  return "bg-neutral-700";
};

function StreakCalendar({
  currentYear,
  setCurrentYear,
  setSelectedDate,
}: StreakCalendarProps) {
  const streak = useStreak();

  const contributionsByDate: Record<string, number> = {};
  streak?.forEach((item) => {
    contributionsByDate[item.date] = item.count;
  });
  const firstDate = new Date(currentYear, 0, 1);
  const firstDay = getDay(firstDate);
  const yearDays = getYearDays(currentYear);
  const weeks = [];
  for (let i = 0; i < 53; i++) {
    weeks.push(
      yearDays.filter((d, idx) => Math.floor((idx + firstDay) / 7) === i),
    );
  }

  // 월 레이블 위치 계산: 각 월의 첫 번째 날짜가 속한 week index에만 표시
  const monthPositions: { [weekIdx: number]: string } = {};
  for (let m = 0; m < 12; m++) {
    const firstDayOfMonth = new Date(currentYear, m, 1);
    const weekIdx = Math.floor(
      ((firstDayOfMonth.getTime() - firstDate.getTime()) /
        (1000 * 60 * 60 * 24) +
        firstDay) /
        7,
    );
    if (monthPositions[weekIdx] === undefined) {
      monthPositions[weekIdx] = monthLabels[m];
    }
  }

  return (
    <Card className="w-full rounded-2xl bg-neutral-900 p-6 text-white shadow-md">
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{currentYear} 오운완 스트릭</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentYear(currentYear - 1)}
              className="rounded bg-neutral-800 px-2 py-1 text-sm hover:bg-neutral-700"
            >
              ◀
            </button>
            <button
              onClick={() => setCurrentYear(currentYear + 1)}
              className="rounded bg-neutral-800 px-2 py-1 text-sm hover:bg-neutral-700"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="relative">
          {/* 월 레이블 */}
          <div className="mb-1 ml-8 flex text-xs text-gray-400">
            {weeks.map((_, weekIdx) => (
              <div
                key={weekIdx}
                className={`text-center ${monthPositions[weekIdx] ? "w-[28px]" : "w-[16px]"}`}
              >
                {monthPositions[weekIdx] || ""}
              </div>
            ))}
          </div>

          <div className="flex">
            {/* 요일 라벨 */}
            <div className="mr-1 flex flex-col justify-between text-xs text-gray-400">
              {weekdayLabels.map((d, i) => (
                <div key={i} className="h-[16px] text-center leading-[16px]">
                  {d}
                </div>
              ))}
            </div>

            {/* 박스 */}
            <div className="flex gap-[3px]">
              {weeks.map((days, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }).map((_, dayIdx) => {
                    const date = days[dayIdx];
                    if (date) {
                      const key = format(date, "yyyy-MM-dd");
                      const count = contributionsByDate[key] || 0;
                      return (
                        <div
                          key={key}
                          onClick={() => count > 0 && setSelectedDate(key)}
                          className={`h-[16px] w-[16px] cursor-pointer rounded-sm ${getContributionColor(count)} hover:opacity-80`}
                          title={`${key} - ${count > 0 ? count + "개 피드 있음" : "피드 없음"}`}
                        />
                      );
                    } else {
                      return <div key={dayIdx} className="h-[16px] w-[16px]" />;
                    }
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StreakCalendar;
