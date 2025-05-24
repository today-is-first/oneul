import Card from "@/components/common/Card";
import CardContent from "@/components/common/CardContent";
import { Line } from "react-chartjs-2";
import { monthLabels } from "@/constants/homeConstants";
import { useStreak } from "@/hooks/useStreak";

const MonthlyStats = () => {
  const streak = useStreak();
  const currentYear = new Date().getFullYear();

  const feedDateSetByMonth = Array.from(
    { length: 12 },
    () => new Set<string>(),
  );

  streak?.forEach((item) => {
    const d = new Date(item.date);
    if (d.getFullYear() === currentYear) {
      const month = d.getMonth();
      feedDateSetByMonth[month].add(item.date);
    }
  });

  const feedDayCountByMonth = feedDateSetByMonth.map((set) => set.size);

  const monthAchievementRate = feedDayCountByMonth.map((dayCount, i) => {
    const daysInMonth = new Date(currentYear, i + 1, 0).getDate();
    return Math.round((dayCount / daysInMonth) * 100);
  });

  return (
    <Card className="w-full rounded-2xl bg-neutral-900 p-6 text-white shadow-md">
      <CardContent>
        <div className="h-56">
          <Line
            width={600}
            height={300}
            data={{
              labels: monthLabels,
              datasets: [
                {
                  label: "달성률 %",
                  data: monthAchievementRate,
                  borderColor: "#8B5CF6",
                  backgroundColor: "rgba(139, 92, 246, 0.3)",
                  tension: 0.3,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyStats;
