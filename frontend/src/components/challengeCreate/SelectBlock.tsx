function SelectBlock({
  label,
  options,
  error,
  onChange,
}: {
  label: string;
  options: string[];
  error: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold">{label}</label>
      <select
        className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:outline-none focus:ring-2"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default SelectBlock;
