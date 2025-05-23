import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDateInput({
  label,
  selectedDate,
  setSelectedDate,
  error,
}: {
  label: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold">{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="연도-월-일"
        className="focus:ring-point w-full appearance-none rounded-lg border border-[#333] bg-[#1B1B1E] px-4 py-3 text-white focus:outline-none focus:ring-2"
        calendarClassName="!border-[#333] !rounded-xl !shadow-lg"
        popperPlacement="bottom-start"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default CustomDateInput;
