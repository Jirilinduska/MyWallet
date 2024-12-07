import { useEffect } from "react"
import { useUserContext } from "../../../../context/UserContext"
import { IInputSelect } from "../../../../utils/interfaces/interfaces"
import { CURR_CZECH, CURR_DOLLAR, CURR_EURO, LANG_CZECH } from "../../../../config/globals"

const SelectCurrency: React.FC<IInputSelect> = ({ value, handleChange }) => {

    const { refreshUserData, userLangID } = useUserContext()

    useEffect( () => {
        if(!userLangID) refreshUserData()
    }, [])

  return (
    <div className="w-1/2">
        
        <label htmlFor="currency" className="block text-sm mb-2 font-medium text-gray-900 dark:text-white">
            { userLangID === LANG_CZECH ? "Měna*" : "Currency*" }
        </label>

        <select
            id="currency"
            name="currency"
            value={value}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
    
        <option value="" disabled>{ userLangID === LANG_CZECH ? "Vyberte měnu" : "Select currency" }</option>

            <option value={CURR_CZECH} className="">CZK</option>
            <option value={CURR_DOLLAR} className="">DOLLAR</option>
            <option value={CURR_EURO} className="">EUR</option>

        </select>
    </div>
  )
}

export default SelectCurrency