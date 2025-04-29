function TextAreaBlock({
  label,
  placeholder = "",
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold">{label}</label>
      <textarea
        placeholder={placeholder}
        className="focus:ring-point w-full resize-none rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 focus:outline-none focus:ring-2"
        rows={4}
      />
    </div>
  );
}

export default TextAreaBlock;
