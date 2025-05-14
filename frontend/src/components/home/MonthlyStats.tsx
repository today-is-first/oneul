import Card from "@/components/common/Card";
import CardContent from "@/components/common/CardContent";
import { Line } from "react-chartjs-2";
import { monthLabels } from "@/constants/homeConstants";
import { MonthlyStatsProps } from "@/types/home";

const MonthlyStats = ({ monthAchievementRate }: MonthlyStatsProps) => {
  return (
    <Card className="w-full rounded-2xl bg-neutral-900 p-6 text-white shadow-md">
      <CardContent>
        <div className="h-56">
          <Line
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
