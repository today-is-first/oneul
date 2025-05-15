// components/home/HeroSlider.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    title: "오늘의 인증으로 목표를 완성하세요!",
    subtitle: "작은 습관이 큰 변화를 만듭니다.",
    color: "text-purple-400",
    bg: "from-[#2C1A4D] to-[#1A1A1E]",
    image: "/imgs/banner/banner1.png",
  },
  {
    title: "챌린지에 참여하고 리워드를 획득하세요",
    subtitle: "함께라서 더 즐겁고 꾸준해지는 운동 습관",
    color: "text-green-400",
    bg: "from-[#1A3D2F] to-[#1A1A1E]",
    image: "/imgs/banner/banner2.png",
  },
  {
    title: "스트릭을 채우고 나만의 피드를 기록하세요",
    subtitle: "운동의 모든 순간을 시각적으로 저장해보세요",
    color: "text-pink-400",
    bg: "from-[#4B1D36] to-[#1A1A1E]",
    image: "/imgs/banner/banner3.png",
  },
];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <motion.div
      key={currentIndex + "-bg"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-r ${currentSlide.bg} animate-gradient-flow h-[96px] bg-[length:300%_300%] px-8 py-6 shadow-md transition-colors`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 px-2"
        >
          <div className="flex h-full w-full items-center justify-between px-8">
            <div className="flex flex-col justify-center">
              <h2
                className={`mb-1 text-xl font-semibold ${currentSlide.color}`}
              >
                {currentSlide.title}
              </h2>
              <p className="text-sm text-gray-300">{currentSlide.subtitle}</p>
            </div>
            <div className="h-16 w-16">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default BannerSlider;
