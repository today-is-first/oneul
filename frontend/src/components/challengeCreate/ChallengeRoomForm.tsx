import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputBlock from "@components/common/InputBlock";
import TextAreaBlock from "@components/challengeCreate/TextAreaBlock";
import SelectBlock from "@components/challengeCreate/SelectBlock";
import PublicToggle from "@components/challengeCreate/PublicToggle";
import CustomDateInput from "@components/challengeCreate/CustomDateInput";
import { categories } from "@/constants/challengeSearchContants";
import { post } from "@/api/api";
import { useNavigate } from "react-router-dom";
import { Challenge } from "@/types/Challenge";

interface ChallengeRoomFormData {
  name: string;
  categoryId: number;
  description: string;
  totalDay: number;
  goalDay: number;
  isChallenge: boolean;
  isPublic: boolean;
  roomPassword?: string;
  startDate: Date | null;
  endDate: Date | null;
  entryFee: number;
}

function ChallengeRoomForm() {
  const [formData, setFormData] = useState<ChallengeRoomFormData>({
    name: "",
    categoryId: 0,
    description: "",
    totalDay: 0,
    goalDay: 0,
    isChallenge: false,
    isPublic: true,
    roomPassword: "",
    startDate: null,
    endDate: null,
    entryFee: 0,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // 입력 필드 변경 핸들러
  const handleInputChange = (
    field: keyof ChallengeRoomFormData,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 시작일/종료일 변경 시 목표 기간 계산
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const diffTime = Math.abs(
        formData.endDate.getTime() - formData.startDate.getTime(),
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      handleInputChange("totalDay", diffDays);
    }
  }, [formData.startDate, formData.endDate]);

  // 인증 일수 제한
  useEffect(() => {
    if (formData.goalDay > formData.totalDay) {
      handleInputChange("goalDay", formData.totalDay);
    }
  }, [formData.totalDay, formData.goalDay]);

  // 방 비밀번호에 따른 공개/비공개 설정
  useEffect(() => {
    if (formData.roomPassword) {
      handleInputChange("isPublic", false);
    } else {
      handleInputChange("isPublic", true);
    }
  }, [formData.roomPassword]);

  useEffect(() => {
    if (formData.entryFee > 0) {
      handleInputChange("isChallenge", true);
    } else {
      handleInputChange("isChallenge", false);
    }
  }, [formData.entryFee]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // 유효성 검사
    if (!formData.name) errors.name = "제목을 입력해주세요";
    if (!formData.description) errors.description = "설명을 입력해주세요";
    if (!formData.startDate) errors.startDate = "시작일을 선택해주세요";
    if (!formData.endDate) errors.endDate = "종료일을 선택해주세요";
    if (formData.categoryId === 0)
      errors.categoryId = "카테고리를 선택해주세요";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (formData.startDate && formData.startDate < today) {
      errors.startDate = "시작일은 오늘 이후여야 합니다";
    }
    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      errors.dateRange = "종료일은 시작일보다 이후여야 합니다";
    }

    if (formData.goalDay <= 0) errors.goalDay = "인증 일수를 입력해주세요";
    if (formData.goalDay > formData.totalDay) {
      errors.goalDay = "인증 일수는 목표 기간을 초과할 수 없습니다";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      // API 요청 데이터 준비
      const requestData = {
        ...formData,
        public: formData.isPublic,
        challenge: formData.isChallenge,
        startDate: formData.startDate?.toISOString(),
        endDate: formData.endDate?.toISOString(),
        roomPassword: formData.roomPassword || undefined,
      };
      // API 호출
      const createdChallenge: Challenge = await post(
        "/challenges",
        requestData,
      );

      navigate(`/challenge/${createdChallenge.challengeId}`);
    } catch (error) {
      console.error("Error creating challenge room:", error);
      setFormErrors({ submit: "챌린지 룸 생성에 실패했습니다" });
    }
  };

  return (
    <section className="text-logo-white bg-background mt-10 flex w-full max-w-[500px] flex-col items-center justify-center rounded-2xl p-8 shadow-lg">
      <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
        <InputBlock
          label="챌린지 제목"
          placeholder="예: 30일 플랭크 챌린지"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={formErrors.name}
        />

        <TextAreaBlock
          label="챌린지 설명"
          placeholder="챌린지 설명을 입력하세요"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          error={formErrors.description}
        />

        <div className="grid grid-cols-2 gap-4">
          <SelectBlock
            label="카테고리"
            options={categories}
            error={formErrors.categoryId}
            onChange={(value) => handleInputChange("categoryId", value)}
          />
          <PublicToggle isPublic={formData.isPublic} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomDateInput
            label="시작일"
            selectedDate={formData.startDate}
            setSelectedDate={(date) => handleInputChange("startDate", date)}
            error={formErrors.startDate}
          />
          <CustomDateInput
            label="종료일"
            selectedDate={formData.endDate}
            setSelectedDate={(date) => handleInputChange("endDate", date)}
            error={formErrors.endDate}
          />
        </div>
        {formErrors.dateRange && (
          <p className="text-sm text-red-500">{formErrors.dateRange}</p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <InputBlock
            label="목표 기간 (일)"
            type="number"
            value={formData.totalDay.toString()}
            disabled={true}
          />
          <InputBlock
            label="목표 인증 일수"
            type="number"
            value={formData.goalDay.toString()}
            onChange={(e) =>
              handleInputChange("goalDay", parseInt(e.target.value))
            }
            error={formErrors.goalDay}
          />
        </div>

        <InputBlock
          label="참가비 (원)"
          type="number"
          placeholder="10,000"
          value={formData.entryFee.toString()}
          onChange={(e) =>
            handleInputChange("entryFee", parseInt(e.target.value))
          }
        />

        <InputBlock
          label="방 비밀번호 (선택)"
          type="password"
          placeholder="비밀번호를 입력하세요 (필요시)"
          value={formData.roomPassword}
          onChange={(e) => handleInputChange("roomPassword", e.target.value)}
        />

        {formErrors.submit && (
          <p className="text-center text-sm text-red-500">
            {formErrors.submit}
          </p>
        )}

        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            type="submit"
            className="bg-point h-[50px] w-full rounded-lg font-bold hover:opacity-90"
            onClick={handleSubmit}
          >
            방 만들기
          </button>
          <Link to="/challenge/search">
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
