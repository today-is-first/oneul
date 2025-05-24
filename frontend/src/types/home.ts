export interface StreakCalendarProps {
  currentYear: number;
  setCurrentYear: (year: number) => void;
  setSelectedDate: (date: string | null) => void;
}

export interface MonthlyStatsProps {
  monthAchievementRate: number[];
}

export interface WorkoutModalProps {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

export interface FeedData {
  [key: string]: string[];
}
