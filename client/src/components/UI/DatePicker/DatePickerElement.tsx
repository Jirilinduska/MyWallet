import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"


export interface IDatePicker {
    dateValues: {
        day: string
        month: string
        year: string
    }
    handleSetDate: (newDate: Date | null) => void
}

const DatePickerElement: React.FC<IDatePicker> = ({ dateValues, handleSetDate }) => {

    const { userLangID } = useUserContext()

    const today = new Date()
    today.setHours(0, 0, 0, 0)    

  return (
    <div className="my-4">

        <label
            htmlFor="calendar"
            className="block text-sm mb-2 font-medium text-gray-900"
        >
            {formatLang(userLangID, "Datum", "Date")}
        </label>

        <DatePicker
            selected={new Date(parseInt(dateValues.year), parseInt(dateValues.month) - 1, parseInt(dateValues.day))}
            onChange={(date: Date | null) => { handleSetDate(date) }}
            dateFormat="dd-MM-yyyy"
            maxDate={today}
            className="w-full p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-colorMain"
            calendarClassName="rounded-lg shadow-lg bg-white border border-gray-200"
        />

        { dateValues.day && (
            <p className="text-sm mt-2">{formatLang(userLangID, "Zvolené datum", "Selected Date")}:{" "}
                <span className="font-semibold">
                    {dateValues.day}.{dateValues.month}.{dateValues.year}
                </span>
            </p>
        )}

    </div>
  )
}

export default DatePickerElement