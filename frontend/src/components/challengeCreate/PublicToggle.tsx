function PublicToggle({ isPublic }: { isPublic: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold">공개방 설정</label>
      <div
        className={`relative flex h-10 w-28 translate-x-4 translate-y-1 items-center rounded-full p-1 transition-all duration-500 ${
          isPublic ? "bg-point" : "bg-gray-500"
        } shadow-inner`}
      >
        <span
          className={`font-lg text-sm transition-all duration-500 ${
            isPublic
              ? "translate-x-0 pl-4 text-white"
              : "translate-x-14 text-gray-300"
          }`}
        >
          {isPublic ? "공개" : "비공개"}
        </span>
        <div
          className={`absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-700 shadow-md transition-all duration-500 ${
            isPublic ? "translate-x-18" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default PublicToggle;
