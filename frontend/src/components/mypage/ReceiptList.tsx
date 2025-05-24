import { get } from "@/api/api";
import { useUserStore } from "@/stores/userStore";
import { useReceiptStore } from "@/stores/receiptStore";
import { ReceiptDto } from "@/types/Receipt";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function ReceiptList() {
  const { user } = useUserStore();
  const { setMyReceiptList } = useReceiptStore();
  const { data: myReceiptList } = useQuery<ReceiptDto[]>({
    queryKey: ["myReceiptList"],
    queryFn: () => get("payments/receipt"),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });

  useEffect(() => {
    if (myReceiptList) {
      setMyReceiptList(myReceiptList);
    }
  }, [myReceiptList]);

  return (
    <div className="flex justify-center bg-[#0E0E11] px-4 py-10 text-white">
      <div className="flex w-full max-w-6xl flex-col gap-8">
        <h1 className="text-2xl font-bold text-white">영수증 목록</h1>

        {myReceiptList && myReceiptList.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {myReceiptList.map((receipt) => (
              <div
                key={receipt.id}
                className="relative rounded-2xl bg-[#1A1A1E] p-5 shadow-sm transition hover:shadow-md"
              >
                {/* 오른쪽 상단 더보기 버튼 */}
                <button className="absolute right-3 top-6 text-gray-400 transition hover:text-white">
                  <BsThreeDotsVertical size={20} />
                </button>

                <div className="mb-2 text-sm text-gray-400">
                  {new Date(receipt.updatedAt).toLocaleString()}
                </div>
                <div className="mb-1 text-lg font-semibold text-white">
                  {receipt.name}
                </div>
                <div className="mb-4 text-base text-gray-300">
                  결제 금액:{" "}
                  <span className="font-medium text-white">
                    {receipt.amount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={`rounded-xl px-3 py-1 text-sm font-semibold ${
                      receipt.status === "승인"
                        ? "bg-[#7c3aed]/20 text-[#7c3aed]"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {receipt.status}
                  </span>
                  <span className="text-gray-400">{receipt.method}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center text-base text-gray-500">
            아직 등록된 영수증이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default ReceiptList;
