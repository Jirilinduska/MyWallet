import { ChangeEvent, useEffect, useState } from "react"
import Input from "../../UI/Input/Input"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { handleNewTransaction } from "../../../API/Transactions"
import { handleErrMsg } from "../../../utils/functions/handleErrMsg"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { ICategory, INewTransForm } from "../../../utils/interfaces/interfaces"
import ButtonLoading from "../../UI/Loaders/ButtonLoading/ButtonLoading"
import DatePickerElement from "../../UI/DatePicker/DatePickerElement"
import SelectCategory from "../../UI/Input/SelectCategory/SelectCategory"

const NewTransForm: React.FC<INewTransForm> = ({ handleHide, refetchData }) => {

    // const today = new Date()
    // today.setHours(0, 0, 0, 0)

    const { categories, refreshCategories } = useCategoriesContext()

    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [transData, setTransData] = useState({ 
        title: "", 
        amount: "", 
        category: "", 
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
        day: new Date().getDate().toString().padStart(2, "0")
    })

    useEffect(() => {
        refreshCategories()
    }, [] )

    const handleSetErrMsg = (msg: string) => setErrMsg(msg)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setTransData( (prev) => ({...prev, [name]: value}) )
    }

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

    // Add new transaction
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
            const response = await handleNewTransaction(transData)
            refetchData()
            handleHide()
        } catch (error) {
            console.log(error)
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
                    labelValue="Price*"
                    placeholder="$2999"
                    inputName="amount"
                    value={transData.amount}
                    onChange={handleChange}
                />
            </div>

            <SelectCategory
                handleChange={handleChange}
                category={transData.category}
            />

            {/* <div className="w-1/2">
                
                <label htmlFor="category" className="block text-sm mb-2 font-medium text-gray-900 dark:text-white">Category*</label>

                <select
                    id="category"
                    name="category"
                    value={transData.category}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="" disabled>Select category</option>

                    { categories && categories.map( (cat: ICategory) => (
                        <>
                            <option key={cat._id} value={cat.name}>
                                {cat.name}
                            </option>
                        </>
                    ))}

                </select>

            </div> */}

        </div>

        <DatePickerElement
          dateValues={{ day: transData.day, month: transData.month, year: transData.year }}
          handleSetDate={handleSetDate}  
        />

        <p className="text-red-500 font-bold text-sm">{errMsg}</p>

        { loading 
            ? <ButtonLoading/> 
            : <input type="submit" className="button-green w-full mt-6" value="Submit" />

        }


    </form>
  )
}

export default NewTransForm