function SelectBlock({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold">{label}</label>
      <select className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:outline-none focus:ring-2">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectBlock;
