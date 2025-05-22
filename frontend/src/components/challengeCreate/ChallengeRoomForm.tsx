import { useState } from "react";
import { Link } from "react-router-dom";
import InputBlock from "@components/common/InputBlock";
import TextAreaBlock from "@components/challengeCreate/TextAreaBlock";
import SelectBlock from "@components/challengeCreate/SelectBlock";
import PublicToggle from "@components/challengeCreate/PublicToggle";
import CustomDateInput from "@components/challengeCreate/CustomDateInput";
import { categories } from "@/constants/challengeSearchContants";

function ChallengeRoomForm() {
  const [isPublic, setIsPublic] = useState(true);
  const [entryFee, setEntryFee] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleEntryFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <section className="text-logo-white bg-background mt-10 flex w-full max-w-[500px] flex-col items-center justify-center rounded-2xl p-8 shadow-lg">
      <form className="flex w-full flex-col gap-6">
        {/* 방 기본 정보 */}
        <InputBlock label="챌린지 제목" placeholder="예: 30일 플랭크 챌린지" />
        <TextAreaBlock
          label="챌린지 설명"
          placeholder="챌린지 설명을 입력하세요"
        />

        <div className="grid grid-cols-2 gap-4">
          <SelectBlock label="카테고리" options={categories} />
          {/* 공개방 설정 */}
          <PublicToggle isPublic={isPublic} setIsPublic={setIsPublic} />
        </div>

        {/* 시작일 종료일 커스텀 달력 */}
        <div className="grid grid-cols-2 gap-4">
          <CustomDateInput
            label="시작일"
            selectedDate={startDate}
            setSelectedDate={setStartDate}
          />
          <CustomDateInput
            label="종료일"
            selectedDate={endDate}
            setSelectedDate={setEndDate}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputBlock label="목표 기간 (일)" type="number" placeholder="30" />
          <InputBlock label="목표 인증 일수" type="number" placeholder="25" />
        </div>

        <InputBlock label="참가비 (원)" type="number" placeholder="10,000" />

        <InputBlock
          label="방 비밀번호 (선택)"
          type="password"
          placeholder="비밀번호를 입력하세요 (필요시)"
        />

        {/* 제출 */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            type="submit"
            className="bg-point h-[50px] w-full rounded-lg font-bold hover:opacity-90"
          >
            방 만들기
          </button>
          <Link to="/challenge-list">
            <span className="text-sm text-gray-400">
              챌린지 방 목록으로 이동
            </span>
          </Link>
        </div>
      </form>
    </section>
  );
}

export default ChallengeRoomForm;
