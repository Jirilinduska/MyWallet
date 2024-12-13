import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { cs, enGB } from "date-fns/locale";
import { LANG_CZECH } from "../../../../config/globals";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { formatLang } from "../../../../utils/functions/formatLang"
import { MonthYearPickerProps } from "../../../../utils/interfaces/interfaces"

const MonthYearPicker = ({ userLangID, setNewBudget }: MonthYearPickerProps) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const selectedLocale = userLangID === LANG_CZECH ? cs : enGB;

    const handleDateChange = (date: Date | null) => {
        if (date) {
            const selectedMonth = date.getMonth() + 1
            const selectedYear = date.getFullYear();
            setStartDate(date);
            setNewBudget( (prevBudget) => ({
                ...prevBudget,
                month: selectedMonth,
                year: selectedYear,
            }));
        }
    };

    return (
        <div className="w-full h-[50vh] p-2 overflow-y-auto flex flex-col justify-center items-center">

            <SectionTitle value={formatLang(userLangID, "Vyberte měsíc", "Select month")}/>

            <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                minDate={new Date()}
                locale={selectedLocale}
                className="w-full max-w-xs text-center bg-white border-none shadow-lg rounded-lg p-4"
            />
        </div>
    );
};

export default MonthYearPicker
