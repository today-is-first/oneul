function ChallegeCreateBtn() {
  return (
    <button
      onClick={() => {
        window.location.href = "/challenge/create";
      }}
      className="group h-full rounded-xl bg-[#2D2D33] px-6 py-5 text-center transition hover:bg-[#3B3B42]"
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F25] text-2xl text-white transition group-hover:bg-[#8B5CF6]">
          ＋
        </div>
      </div>
    </button>
  );
}

export default ChallegeCreateBtn;
