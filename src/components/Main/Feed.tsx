import BorderStar from "@/assets/svgs/borderStar.svg?react";
import FilledStar from "@/assets/svgs/filledStar.svg?react";

function Feed() {
  return (
    <div className="flex gap-2 px-2">
      <div className="border-border flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full border">
        <img
          src="/src/assets/imgs/image.png"
          alt="userImage"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-bold">userName</h2>
            <p className="text-textGray text-[16px]">date</p>
          </div>
          <p className="text-[16px]">콘텐츠 </p>
        </div>
        <div>
          <BorderStar />
          <FilledStar />
        </div>
      </div>
    </div>
  );
}

export default Feed;
