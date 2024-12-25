import { ChangeEvent, useEffect, useState } from "react"
import { IconClose } from "../../../../utils/icons/icons"
import { ITransaction } from "../../../../utils/interfaces/interfaces"
import Input from "../../Input/Input"
import DatePickerElement from "../../DateStuff/DatePicker/DatePickerElement"
import SelectCategory from "../../SelectCategory/SelectCategory"
import { handleUpdateTransaction } from "../../../../API/Transactions"
import { handleErrMsg } from "../../../../utils/functions/handleErrMsg"
import { handleSuccMsg } from "../../../../utils/functions/handleSuccMsg"
import { useUserContext } from "../../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, COLOR_BLUE, COLOR_RED, LANG_CZECH, NOTIF_ERROR, NOTIF_SUCCESS, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../../config/globals"
import { useTransactionsContext } from "../../../../context/TransactionsContext"
import { useParams } from "react-router-dom"
import { handleNotification } from "../../../../utils/functions/notificationsUtils"
import { formatLang } from "../../../../utils/functions/formatLang"
import { useOverviewData } from "../../../../context/OverviewDataContext"
import Button from "../../../Button/Button"


interface EditTransModalProsp {
  toggleEditModal: () => void
  transaction: ITransaction
  pageID: string | null
}

const EditTransModal: React.FC<EditTransModalProsp> = ({ toggleEditModal, transaction, pageID }) => {

    const { userLangID } = useUserContext()
    const { fetchExpenseData, fetchIncomeData, date, deleteTransaction } = useTransactionsContext()
    const { refreshOverviewData, year, month } = useOverviewData()

    // const { pageID } = useParams()

    const [isEdited, setIsEdited] = useState(false)
    const [wantDelete, setWantDelete] = useState(false)

    const [transData, setTransData] = useState({ 
      id: transaction._id,
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      day: transaction.day,
      month: transaction.month,
      year: transaction.year
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setTransData( (prev) => ({
        ...prev,
        [name]: name === "amount" ? Number(value) : value
      }))
      setIsEdited(true)
    }

    const handleSetDate = (newDate: Date | null) => {
      if (newDate) {
          setTransData((prev) => ({
              ...prev,
              year: newDate.getFullYear(),
              month: newDate.getMonth() + 1,
              day: newDate.getDate()
          }))
          setIsEdited(true)
      }
    }

    // TODO - Přidat ke kontextu
    const handleUpdateTrans = async() => {
      try {
        await handleUpdateTransaction(transData)
        if(pageID === PAGE_ID_INCOME) {
          fetchIncomeData(date.month, date.year)
        }
        if(pageID === PAGE_ID_TRANSACTIONS) {
          fetchExpenseData(date.month, date.year)
        }
        refreshOverviewData(year, month)
        handleNotification(NOTIF_SUCCESS, userLangID, "Úspěšně aktualizováno", "Updated successfully")
      } catch (error) {
        console.log(error)
        handleNotification(NOTIF_ERROR, userLangID, "Něco se pokazilo", "Something went wrong")
      }
    }

    useEffect(() => {
      fetchIncomeData(date.month, date.year)
      fetchExpenseData(date.month, date.year)
    }, [] )


  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-60">

      <div className="relative p-4 w-full max-w-md max-h-full">
        
        <div className="relative rounded-lg shadow bg-gray-700">

          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">

            { pageID === PAGE_ID_TRANSACTIONS && <h3 className="text-lg font-semibold text-white">{formatLang(userLangID, "Upravit výdaj", "Edit transaction")}</h3> }
            { pageID === PAGE_ID_INCOME && <h3 className="text-lg font-semibold text-white">{formatLang(userLangID, "Upravit příjem", "Edit income")}</h3> }

            <IconClose onClick={toggleEditModal} className="icon"/>

          </div>

          <div className="px-4 pt-6 md:px-5">

            <div className="mb-4">
              <Input
                inputName="title"
                inputType="text"
                labelFor="title"
                labelValue={`${ userLangID === LANG_CZECH ? "Název" : "Title" }`}
                onChange={handleChange}
                placeholder="Food"
                value={transData.title}
                />
            </div>

            <div className="mb-4">
              <Input
                inputName="amount"
                inputType="number"
                labelFor="amount"
                labelValue={`${ userLangID === LANG_CZECH ? "Částka*" : "Amount*" }`}
                onChange={handleChange}
                placeholder="200"
                value={transData.amount.toString()}
              />
            </div>

            <SelectCategory
              handleChange={handleChange}
              value={transData.category}
              categoryType={`${pageID === PAGE_ID_TRANSACTIONS ? CATEGORY_ID_TRANSACTION : CATEGORY_ID_INCOME}`}
            />

          </div>


          <div className="px-4 pb-6 md:px-5 md:pb:20">
            <DatePickerElement
              dateValues={{ day: transData.day.toString(), month: transData.month.toString(), year: transData.year.toString() }}
              handleSetDate={handleSetDate}
            />
          </div>

          <div className="py-10 flex items-center justify-between">
            
            { !wantDelete && (
              <>
                <Button
                  color={COLOR_RED}
                  loading={false}
                  value={formatLang(userLangID, "Odstranit", "Delete")}
                  handleClick={ () => setWantDelete(true) }
                />

                <button 
                  className={`${ isEdited ? "button-green" : "button-green bg-colorGrayHover hover:bg-colorGrayHover"} w-1/3 mx-auto block`}
                  disabled={!isEdited}
                  onClick={ () => {
                    handleUpdateTrans()
                    toggleEditModal()
                  }}
                >
                  {formatLang(userLangID, "Uložit", "Save")}
                </button>

              </>
            )}

            { wantDelete && (
              <div className="mx-auto">

                <h3 className="font-semibold mb-6 text-white">{formatLang(userLangID, "Opravdu chcete odstranit tuto transakci?", "Do you really want to delete this transaction?")}</h3>

                <div className="flex items-center justify-between">

                  <Button
                    color={COLOR_RED}
                    loading={false}
                    value={formatLang(userLangID, "Ano", "Yes")} 
                    handleClick={ () => { pageID &&
                      deleteTransaction(transaction._id, userLangID, pageID)
                      toggleEditModal()
                      setWantDelete(false)
                    }}
                  />

                  <Button
                    color={COLOR_BLUE}
                    loading={false}
                    value={formatLang(userLangID, "Zrušit", "Close")}
                    handleClick={ () => setWantDelete(false) }
                  />

                </div>

              </div>
            )}

          </div>
          

        </div>

      </div>

    </div>
  )
}

export default EditTransModal