import { ChangeEvent, useEffect, useState } from "react"
import { IconClose } from "../../../../utils/icons/icons"
import { IEditTransModal } from "../../../../utils/interfaces/interfaces"
import Input from "../../Input/Input"
import DatePickerElement from "../../DateStuff/DatePicker/DatePickerElement"
import SelectCategory from "../../SelectCategory/SelectCategory"
import { handleDeleteTransaction, handleUpdateTransaction } from "../../../../API/Transactions"
import { handleErrMsg } from "../../../../utils/functions/handleErrMsg"
import { handleSuccMsg } from "../../../../utils/functions/handleSuccMsg"
import { useUserContext } from "../../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, LANG_CZECH, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../../config/globals"

const EditTransModal: React.FC<IEditTransModal> = ({ toggleEditModal, transaction, fetchTransData, pageID }) => {

    const { refreshUserData, userLangID } = useUserContext()

    const [errMsg, setErrMsg] = useState("")
    const [succMsg, setSuccMsg] = useState("")
    const [isEdited, setIsEdited] = useState(false)

    const [transData, setTransData] = useState({ 
      id: transaction._id,
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      day: transaction.day,
      month: transaction.month,
      year: transaction.year
    })

    useEffect(() => {
      refreshUserData()
    }, [] )

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

    const handleDeleteTrans = async() => {
      try {
        await handleDeleteTransaction(transaction._id)
        fetchTransData()
        toggleEditModal()
      } catch (error) {
        console.log(error)
        handleErrMsg("Something went wrong", "Něco se pokazilo", setErrMsg, userLangID)
      }
    }

    const handleUpdateTrans = async() => {
      try {
        await handleUpdateTransaction(transData)
        fetchTransData()
        handleSuccMsg("Updated successfully", "Úspěšně aktualizováno", setSuccMsg, userLangID)
      } catch (error) {
        console.log(error)
        handleErrMsg("Something went wrong", "Něco se pokazilo", setErrMsg, userLangID)
      }
    }


  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-60">

      <div className="relative p-4 w-full max-w-md max-h-full">
        
        <div className="relative rounded-lg shadow bg-gray-700">

          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">

            { pageID === PAGE_ID_TRANSACTIONS && <h3 className="text-lg font-semibold text-white">{ userLangID === LANG_CZECH ? "Upravit výdaj" : "Edit transaction" }</h3> }
            { pageID === PAGE_ID_INCOME && <h3 className="text-lg font-semibold text-white">{ userLangID === LANG_CZECH ? "Upravit příjem" : "Edit income" }</h3> }

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

          { errMsg && <p className="text-red-500 px-4 md:px-5 font-bold">{errMsg}</p> }
          { succMsg && <p className="text-green-500 px-4 md:px-5 font-bold">{succMsg}</p> }

          <div className="py-10 flex items-center justify-between">
            
            {/* // TODO - Při delete - přidat are you sure? left:0 absolute :) */}
            {/* // Delete transaction */}
            <button 
              className="button-red w-1/3 mx-auto block"
              onClick={handleDeleteTrans}
            >
              { userLangID === LANG_CZECH ? "Odstranit" : "Delete" }
            </button>

            {/* Save edited transaction */}
            <button 
              className={`${ isEdited ? "button-green" : "button-green bg-colorGrayHover hover:bg-colorGrayHover"} w-1/3 mx-auto block`}
              disabled={!isEdited}
              onClick={handleUpdateTrans}
            >
              { userLangID === LANG_CZECH ? "Uložit" : "Save" }
            </button>

          </div>
          

        </div>

      </div>

    </div>
  )
}

export default EditTransModal