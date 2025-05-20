interface CategoryTabProps {
  cat: string;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
}

function CategoryTab({
  cat,
  activeCategory,
  setActiveCategory,
}: CategoryTabProps) {
  return (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat)}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${activeCategory === cat ? "bg-[#8B5CF6] text-white" : "bg-[#2A2A2E] text-white hover:bg-[#3A3A3E]"}`}
    >
      {cat}
    </button>
  );
}

export default CategoryTab;
