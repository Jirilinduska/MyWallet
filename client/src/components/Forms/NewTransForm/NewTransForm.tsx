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
import SelectCategory from "../../UI/SelectCategory/SelectCategory"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import ErrMsg from "../../Notifications/ErrMsg/ErrMsg"

const NewTransForm: React.FC<INewTransForm> = ({ handleHide, pageID, fetchIncomeData, fetchTransData }) => {

    // const { categoriesIncome, categoriesTransactions, refreshCategories } = useCategoriesContext()
    const { refreshUserData, userCurrency, userLangID } = useUserContext()

    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [transData, setTransData] = useState({ 
        title: "", 
        amount: "", 
        category: "", 
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
        day: new Date().getDate().toString().padStart(2, "0"),
        transCategory: pageID === PAGE_ID_TRANSACTIONS ? CATEGORY_ID_TRANSACTION : 
                       pageID === PAGE_ID_INCOME ? CATEGORY_ID_INCOME : null
    })

    // useEffect(() => {
    //     refreshCategories()
    // }, [] )

    useEffect(() => {
        if(!userCurrency) refreshUserData()
    }, [] )

    // const handleSetErrMsg = (msg: string) => setErrMsg(msg)

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

            if (pageID === PAGE_ID_TRANSACTIONS) {
                fetchTransData()
            } else if (pageID === PAGE_ID_INCOME) {
                fetchIncomeData()
            }
            
            handleHide()
        } catch (error) {
            console.log(error)
            handleErrMsg("Something went wrong", "Něco se pokazilo", setErrMsg, userLangID)
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
                    placeholder={`2000 ${userCurrency}`}
                    inputName="amount"
                    value={transData.amount}
                    onChange={handleChange}
                />
            </div>

            <SelectCategory
                handleChange={handleChange}
                value={transData.category}
                categoryType={`${pageID === PAGE_ID_TRANSACTIONS ? CATEGORY_ID_TRANSACTION : CATEGORY_ID_INCOME}`}
            />

        </div>

        <DatePickerElement
          dateValues={{ day: transData.day, month: transData.month, year: transData.year }}
          handleSetDate={handleSetDate}  
        />

        {/* <p className="text-red-500 font-bold text-sm">{errMsg}</p> */}
        <ErrMsg value={errMsg}/>

        { loading 
            ? <ButtonLoading/> 
            : <input type="submit" className="button-green w-full mt-6" value="Submit" />

        }


    </form>
  )
}

export default NewTransForm