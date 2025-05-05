import FeedCheckItem from "./FeedCheckItem";

const mockData = {
  id: 1,
  userId: 201,
  imageUrl: "https://picsum.photos/seed/1/200/200",
  challengeId: 5,
  content: "오운완입니다~^^ 오늘도 화이팅!",
  likeCount: 3,
  date: "2025-05-01",
};

function FeedCheckList() {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
      <FeedCheckItem log={mockData} status="PENDING" />
      <FeedCheckItem log={mockData} status="APPROVED" />
      <FeedCheckItem log={mockData} status="REJECTED" />
    </div>
  );
}

export default FeedCheckList;
