import {
  categories,
  challengeStatusTranslate,
} from "@/constants/challengeSearchContants";
import { Challenge } from "@/types/Challenge";

export const filteredList = (
  array: Challenge[],
  activeTab: string,
  activeCategory: string,
  activeStatus: string,
  keyword: string,
) =>
  array.filter((c) => {
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
