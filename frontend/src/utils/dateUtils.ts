import { eachDayOfInterval, startOfYear, endOfYear } from "date-fns";

export const getYearDays = (year: number) => {
  return eachDayOfInterval({
    start: startOfYear(new Date(year, 0, 1)),
    end: endOfYear(new Date(year, 0, 1)),
  });
};
