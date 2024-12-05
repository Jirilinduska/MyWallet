import { ChangeEvent, useState } from "react"
import Input from "../../UI/Input/Input"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { handleNewTransaction } from "../../../API/Transactions"
import { handleErrMsg } from "../../../utils/functions/handleErrMsg"

const NewTransForm = () => {

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const [transData, setTransData] = useState({ 
        title: "", 
        amount: "", 
        category: "", 
        year: "", 
        month: "", 
        day: "" 
    })

    // TODO - U všech formulářů zjednodušit funkci - refactoring, vícekrát používana.
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTransData( (prev) => ({...prev, [name]: value}) )
    }

    const handleSetErrMsg = (msg: string) => setErrMsg(msg)

    const handleSetDate = (newDate: Date | null) => {
        if (newDate) {
            setTransData((prev) => ({
                ...prev,
                year: newDate.getFullYear().toString(),
                month: (newDate.getMonth() + 1).toString().padStart(2, "0"),
                day: newDate.getDate().toString().padStart(2, "0")
            }))
        }
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setErrMsg("")
        setLoading(true)

        try {
            if(!transData.amount) {
                setErrMsg("Please fill amount")
                setLoading(false)
                return
            }
            if(!transData.category) {
                setErrMsg("Please select category")
                setLoading(false)
                return
            }
            await handleNewTransaction(transData)
        } catch (error) {
            handleErrMsg(error, handleSetErrMsg)
        } finally {
            setLoading(false)
        }

    }

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-6 pt-6 md:px-5 md:pb:20">

        <div className="mb-4">
            <Input
                inputType="text"
                labelFor="transTitle"
                labelValue="Title"
                placeholder="Food"
                inputName="title"
                value={transData.title}
                onChange={handleChange}
            />
        </div>

        <div className="flex items-center justify-between gap-4">

            <div className="w-1/2">
                <Input
                    inputType="number"
                    labelFor="price"
                    labelValue="Price"
                    placeholder="$2999"
                    inputName="amount"
                    value={transData.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="w-1/2">
                
                <label htmlFor="category" className="block text-sm mb-2 font-medium text-gray-900 dark:text-white">Category</label>

                <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled selected>Select category</option>

                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>

                  </select>

            </div>

        </div>

        <div className="my-4">

            <label
                htmlFor="calendar"
                className="block text-sm mb-2 font-medium text-gray-900 dark:text-white"
            >
                Date
            </label>

            <DatePicker
                selected={transData.year && transData.month && transData.day 
                    ? new Date(parseInt(transData.year), parseInt(transData.month) - 1, parseInt(transData.day)) 
                    : new Date() }
                onChange={handleSetDate}
                dateFormat="dd-MM-yyyy"
                maxDate={today}
            />

            { transData.day && (
                <p className="text-sm mt-2">Selected Date:{" "}
                    <span className="font-semibold">
                        {transData.day}.{transData.month}.{transData.year}
                    </span>
                </p>
            )}

        </div>

        <p className="text-red-500 font-bold text-sm">{errMsg}</p>

        <input type="submit" className="button-green w-full mt-6" value="Submit" />

    </form>
  )
}

export default NewTransForm