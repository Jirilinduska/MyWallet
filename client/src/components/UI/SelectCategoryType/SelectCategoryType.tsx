import { ChangeEvent, useEffect } from "react"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, LANG_CZECH } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"

export interface ISelectCatType {
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const SelectCategoryType: React.FC<ISelectCatType> = ({ onChange, value }) => {

    const { refreshUserData, userLangID } = useUserContext()

    useEffect(() => {
        if(!userLangID) refreshUserData()
    }, [])

  return (
    <div className="my-4">

        <label htmlFor="categoryType" className="block text-sm mb-2 font-medium dark:text-white">
            { userLangID === LANG_CZECH ? "Kategorie pro*" : "Category for*" }
        </label>

        <select
            id="categoryType"
            name="categoryType"
            value={value}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
        
        <option value="" disabled>Select category</option>

            <option value={CATEGORY_ID_INCOME} className="">{ userLangID === LANG_CZECH ? "Příjmy" : "Income" }</option>
            <option value={CATEGORY_ID_TRANSACTION} className="">{ userLangID === LANG_CZECH ? "Výdaje" : "Expense" }</option>

        </select>
    </div>
  )
}

export default SelectCategoryType