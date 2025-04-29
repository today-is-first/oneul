function InputBlock({
  label,
  type = "text",
  placeholder = "",
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="focus:ring-point w-full rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:outline-none focus:ring-2"
      />
    </div>
  );
}

export default InputBlock;
