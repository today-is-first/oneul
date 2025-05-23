function InputBlock({
  label,
  type = "text",
  placeholder = "",
  value,
  disabled = false,
  onChange,
  error,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 ${
          disabled
            ? "cursor-not-allowed border-gray-700 bg-gray-800/50 text-gray-400"
            : "focus:ring-point border-[#333] bg-[#1B1B1E]"
        }`}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default InputBlock;
