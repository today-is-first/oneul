import { get } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useChallengeStore } from "@/stores/challengeStore";
import { Challenge } from "@/types/Challenge";

function ChallengeList() {
  const { data, isLoading, error } = useQuery<Challenge[]>({
    queryKey: ["challengeList"],
    queryFn: () => get("/challenges"), // 직접 호출
  });

  useChallengeStore.getState().setChallenges(data ?? []);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생</p>;

  return (
    <>
      {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.challengeId} className="text-white">
              <a href={`/challenge/${item.challengeId}`}>{item.name}</a>
            </li>
          ))}
        </ul>
      ) : (
        "존재하는 챌린지 리스트가 없습니다."
      )}
    </>
  );
}

export default ChallengeList;
