import { useState } from "react"
import "react-datepicker/dist/react-datepicker.css"
import { handleNewTransaction } from "../../../API/Transactions"
import DatePickerElement from "../../UI/DatePicker/DatePickerElement"
import SelectCategory from "../../UI/SelectCategory/SelectCategory"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, NOTIF_ERROR, NOTIF_SUCCESS, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { formatLang } from "../../../utils/functions/formatLang"
import { useTransactionsContext } from "../../../context/TransactionsContext"
import { handleError } from "../../../Errors/handleError"
import { Button, TextField, Typography } from "@mui/material"
import { useRefetchContext } from "../../../context/RefetchContext"


interface NewTransFormProps {
    handleHide: () => void,
    pageID: string | undefined
}


const NewTransForm: React.FC<NewTransFormProps> = ({ handleHide, pageID }) => {

    const { userCurrency, userLangID } = useUserContext()
    const { triggerOverviewDataRefetch } = useRefetchContext()
    const [loading, setLoading] = useState(false)

    const now = new Date()
    const thisMonth = now.getMonth() + 1

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

    const handleChangeCategory = (value: string) => {
        setTransData((prev) => ({...prev, categoryID: value}))
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
                handleNotification(NOTIF_SUCCESS, userLangID, "Transakce přidána", "Transaction added")
            } else if (pageID === PAGE_ID_INCOME) {
                handleNotification(NOTIF_SUCCESS, userLangID, "Příjem přidán", "Income added")
            }

            triggerOverviewDataRefetch()
            handleHide()
            
        } catch (error) {
            handleError(error, userLangID)
        } finally {
            setLoading(false)
        }

    }

  return (
    <form onSubmit={handleSubmit} className="px-4 pt-6 md:px-5 md:pb:20">

        <TextField
            value={transData.title}
            onChange={(e) => setTransData((prev) => ({...prev, title: e.target.value}))}
            label={`${formatLang(userLangID, "Popis", "Description")}`}
            name="title"
            fullWidth
            placeholder="Food"
            type="text"
            sx={{ mb: 4 }}
            focused={true}
        />

        <div className="flex items-center justify-between gap-4">

            <div className="w-1/2">
                <TextField
                    value={transData.amount}
                    onChange={(e) => setTransData(prev => ({...prev, amount: e.target.value}))}
                    placeholder={`2000 ${userCurrency}`}
                    label={`${formatLang(userLangID, "Cena*", "Price*")}`}
                    name="amount"
                />
            </div>

            <SelectCategory
                handleChangeCategory={handleChangeCategory}
                value={transData.categoryID}
                categoryType={`${pageID === PAGE_ID_TRANSACTIONS ? CATEGORY_ID_TRANSACTION : CATEGORY_ID_INCOME}`}
            />

        </div>

        <DatePickerElement
          dateValues={{ day: transData.day, month: transData.month, year: transData.year }}
          handleSetDate={handleSetDate}  
        />

        {Number(transData.month) !== thisMonth && (
            <Typography color="info" fontWeight={600} fontSize={12}>
                {formatLang(
                    userLangID,
                    "Pozor! Přidáváte transakci do jiného měsíce než je aktuální. Transakce v minulých měsících již nelze upravovat ani mazat.",
                    "Warning: You are adding a transaction to a different month than the current one. Transactions in past months can no longer be edited or deleted."
                )}
            </Typography>
        )}

        <div className="flex items-center justify-between gap-2 mt-4">

            <Button
                loading={loading}
                color="success"
                type="submit"
                variant="contained"
                sx={{ width: "50%" }}
            >
                {formatLang(userLangID, "Uložit", "Save")}
            </Button>

            <Button
                loading={loading}
                color="error"
                onClick={handleHide}
                variant="contained"
                sx={{ width: "50%" }}
            >
                {formatLang(userLangID, "Zavřít", "Close")}
            </Button>

        </div>


    </form>
  )
}

export default NewTransForm