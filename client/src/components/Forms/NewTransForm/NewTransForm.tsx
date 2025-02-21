import { ChangeEvent, useEffect, useState } from "react"
import Input from "../../UI/Input/Input"
import "react-datepicker/dist/react-datepicker.css"
import { handleNewTransaction } from "../../../API/Transactions"
import DatePickerElement from "../../UI/DatePicker/DatePickerElement"
import SelectCategory from "../../UI/SelectCategory/SelectCategory"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, COLOR_GREEN, COLOR_RED, NOTIF_ERROR, NOTIF_SUCCESS, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { formatLang } from "../../../utils/functions/formatLang"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { useOverviewData } from "../../../context/OverviewDataContext"
import Button from "../../UI/Button/Button"
import { handleError } from "../../../Errors/handleError"


interface NewTransFormProps {
    handleHide: () => void,
    pageID: string | undefined
}


const NewTransForm: React.FC<NewTransFormProps> = ({ handleHide, pageID }) => {

    const { userCurrency, userLangID } = useUserContext()
    const { fetchExpenseData, fetchIncomeData, date } = useTransactionsContext()
    const { refreshOverviewData, year, month } = useOverviewData()

    const [loading, setLoading] = useState(false)
    const [transData, setTransData] = useState({ 
        title: "", 
        amount: "", 
        categoryID: "", 
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
        day: new Date().getDate().toString().padStart(2, "0"),
        transCategory: pageID === PAGE_ID_TRANSACTIONS ? CATEGORY_ID_TRANSACTION : 
                       pageID === PAGE_ID_INCOME ? CATEGORY_ID_INCOME : null
    })

    useEffect(() => {
        handleSetDate(new Date(date.year, date.month - 1))
    }, [date] )

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setTransData( (prev) => ({...prev, [name]: value}) )
    }

    const handleSetDate = (newDate: Date | null) => {
        if (newDate) {
            // Pokud je měsíc stejný jako aktuální, nastavíme skutečně vybrané datum
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
        setLoading(true)

        try {
            if(!transData.amount) {
                handleNotification(NOTIF_ERROR, userLangID, "Prosím vyplňte částku", "Please enter an amount")
                setLoading(false)
                return
            }
            if(!transData.categoryID) {
                handleNotification(NOTIF_ERROR, userLangID, "Prosím vyberte kategorii", "Please select a category")
                setLoading(false)
                return
            }
            
            await handleNewTransaction(transData)

            if (pageID === PAGE_ID_TRANSACTIONS) {
                fetchExpenseData(date.month, date.year)
                handleNotification(NOTIF_SUCCESS, userLangID, "Transakce přidána", "Transaction added")
            } else if (pageID === PAGE_ID_INCOME) {
                fetchIncomeData(date.month, date.year)
                handleNotification(NOTIF_SUCCESS, userLangID, "Příjem přidán", "Income added")
            }

            // Tohle je potřeba, aby se aktualizovala data v TopBaru!
            refreshOverviewData(year, month)
            handleHide()
            
        } catch (error) {
            handleError(error, userLangID)
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
                labelValue={`${formatLang(userLangID, "Popis", "Description")}`}
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
                    labelValue={`${formatLang(userLangID, "Cena*", "Price*")}`}
                    placeholder={`2000 ${userCurrency}`}
                    inputName="amount"
                    value={transData.amount}
                    onChange={handleChange}
                />
            </div>

            <SelectCategory
                handleChange={handleChange}
                value={transData.categoryID}
                categoryType={`${pageID === PAGE_ID_TRANSACTIONS ? CATEGORY_ID_TRANSACTION : CATEGORY_ID_INCOME}`}
            />

        </div>

        <DatePickerElement
          dateValues={{ day: transData.day, month: transData.month, year: transData.year }}
          handleSetDate={handleSetDate}  
        />

        <div className="flex items-center justify-between">
            <Button color={COLOR_GREEN} loading={loading} value={formatLang(userLangID, "Uložit", "Save")} buttonType="submit" />
            <Button color={COLOR_RED}   loading={loading} value={formatLang(userLangID, "Zavřít", "Close")} buttonType="button" handleClick={handleHide} />
        </div>


    </form>
  )
}

export default NewTransForm