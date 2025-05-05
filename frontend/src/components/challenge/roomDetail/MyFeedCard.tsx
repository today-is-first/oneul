import { CheckInLog } from "./ChallengeFeed";

interface MyFeedCardProps {
  log: CheckInLog | null;
  onCreate?: () => void;
  onEdit?: (log: CheckInLog) => void;
  onDetail?: (log: CheckInLog) => void;
}

function MyFeedCard({ log, onCreate, onEdit, onDetail }: MyFeedCardProps) {
  if (!log) {
    return (
      <>
        <p className="mb-4 text-gray-400">
          아직 오늘의 인증을 진행하지 않으셨어요.
        </p>
        <button
          onClick={onCreate}
          className="flex aspect-square w-full cursor-pointer select-none items-center justify-center rounded-md border border-[#2d2d2d] bg-[#24242c] text-9xl font-extralight text-gray-600"
        >
          +
        </button>
      </>
    );
  }

  return (
    <div
      className="flex max-w-md cursor-pointer flex-col"
      onClick={() => onDetail?.(log)}
    >
      <div className="mb-3 flex items-start justify-between">
        <p className="font-medium text-gray-400">오늘의 인증 완료 💪🔥</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(log);
          }}
          className="cursor-pointer p-1 text-gray-500 hover:text-gray-200"
          aria-label="인증 수정"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-5.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l6.586-6.586z"
            />
          </svg>
        </button>
      </div>

      <div className="mb-3 aspect-square w-full overflow-hidden rounded-lg bg-[#24242c]">
        <img
          src={log.imageUrl}
          alt="내 오늘 인증 사진"
          className="h-full w-full object-cover"
        />
      </div>

      <p className="line-clamp-2 text-gray-500">{log.content}</p>
      <span className="text-right text-sm text-gray-600">{log.date}</span>
    </div>
  );
}

export default MyFeedCard;
