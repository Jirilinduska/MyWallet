import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


export interface IDatePicker {
    dateValues: {
        day: string
        month: string
        year: string
    }
    handleSetDate: (newDate: Date | null) => void
}

const DatePickerElement: React.FC<IDatePicker> = ({ dateValues, handleSetDate }) => {

    const today = new Date()
    today.setHours(0, 0, 0, 0)

  return (
    <div className="my-4">

        <label
            htmlFor="calendar"
            className="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
        >
            Date
        </label>

        {/* // TODO - Upravit styl kalendáře */}
        <DatePicker
            selected={dateValues.year && dateValues.month && dateValues.day 
                ? new Date(parseInt(dateValues.year), parseInt(dateValues.month) - 1, parseInt(dateValues.day)) 
                : new Date() }
            onChange={handleSetDate}
            dateFormat="dd-MM-yyyy"
            maxDate={today}
        />

        { dateValues.day && (
            <p className="text-sm mt-2">Selected Date:{" "}
                <span className="font-semibold">
                    {dateValues.day}.{dateValues.month}.{dateValues.year}
                </span>
            </p>
        )}

    </div>
  )
}

export default DatePickerElement