import { useNavigate } from "react-router";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="mt-[-60px] flex h-screen w-full flex-col items-center justify-center gap-6 p-[200px]">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 600"
        preserveAspectRatio="xMidYMid meet"
        width={200}
        height={200}
      >
        <g
          transform="translate(0,512) scale(0.1,-0.1)"
          className="fill-primary-purple-100"
          stroke="none"
        >
          <path
            d="M2445 5106 c-28 -7 -72 -22 -98 -35 -95 -46 -135 -95 -312 -383 -210
-341 -686 -1103 -1001 -1603 -387 -613 -413 -660 -422 -770 -18 -229 134 -436
356 -484 75 -16 3108 -16 3184 0 221 47 374 256 355 486 -7 90 -63 199 -270
528 -540 859 -833 1327 -1057 1690 -148 241 -271 429 -298 457 -101 105 -282
152 -437 114z m265 -1486 l0 -600 -150 0 -150 0 0 600 0 600 150 0 150 0 0
-600z m0 -1050 l0 -150 -150 0 -150 0 0 150 0 150 150 0 150 0 0 -150z"
          />
        </g>
        <g
          transform="translate(0,580) scale(0.1,-0.1)"
          className="fill-primary-purple-100"
          stroke="none"
        >
          <path
            d="M610 1070 l0 -450 300 0 300 0 0 -310 0 -310 150 0 150 0 0 310 0
            310 150 0 150 0 0 150 0 150 -150 0 -150 0 0 300 0 300 -150 0 -150 0 0 -300
0 -300 -150 0 -150 0 0 300 0 300 -150 0 -150 0 0 -450z"
          />
          <path
            d="M2110 760 l0 -760 450 0 450 0 0 760 0 760 -450 0 -450 0 0 -760z
            m600 0 l0 -460 -150 0 -150 0 0 460 0 460 150 0 150 0 0 -460z"
          />
          <path
            d="M3310 1070 l0 -450 300 0 300 0 0 -310 0 -310 150 0 150 0 0 310 0
            310 150 0 150 0 0 150 0 150 -150 0 -150 0 0 300 0 300 -150 0 -150 0 0 -300
0 -300 -150 0 -150 0 0 300 0 300 -150 0 -150 0 0 -450z"
          />
        </g>
      </svg>
      <div className="flex flex-col gap-4">
        <h2 className="text-primary-purple-100 text-2xl font-semibold">
          페이지를 찾을 수 없습니다.
        </h2>
        <p className="text-center text-gray-300">
          올바른 URL 경로가 아닙니다. <br /> 페이지 경로를 다시 한 번
          확인해주세요.
        </p>
      </div>
      <button
        className="bg-primary-purple-200 hover:bg-primary-purple-200/80 mt-2 rounded-lg px-6 py-3 text-white transition"
        onClick={() => navigate("/", { replace: true })}
      >
        홈페이지로 돌아가기
      </button>
    </div>
  );
}

export default NotFoundPage;
