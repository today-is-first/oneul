import Feed from "@/components/Main/Feed";

function FeedContainer() {
  return (
    <section className="bg-gray border-border flex h-screen w-full max-w-[640px] flex-col rounded-2xl border p-4 text-white">
      <Feed />
    </section>
  );
}

export default FeedContainer;
