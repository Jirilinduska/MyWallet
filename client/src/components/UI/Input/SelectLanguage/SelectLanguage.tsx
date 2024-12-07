import { useEffect } from "react"
import { useUserContext } from "../../../../context/UserContext"
import { IInputSelect } from "../../../../utils/interfaces/interfaces"
import { LANG_CZECH, LANG_ENGLISH } from "../../../../config/globals"

const SelectLanguage: React.FC<IInputSelect> = ({ value, handleChange }) => {

    const { refreshUserData, userLangID } = useUserContext()

    useEffect( () => {
        if(!userLangID) refreshUserData()
    }, [])

  return (
    <div className="w-1/2">
        
        <label htmlFor="language" className="block text-sm mb-2 font-medium text-gray-900 dark:text-white">
            { userLangID === LANG_CZECH ? "Jazyk*" : "Language*" }
        </label>

        <select
            id="language"
            name="language"
            value={value}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
        
        <option value="" disabled>{ userLangID === LANG_CZECH ? "Vyberte jazyk" : "Select language" }</option>

            <option value={LANG_CZECH} className="">
                { userLangID === LANG_CZECH ? "Čeština" : "Czech" }
            </option>

            <option value={LANG_ENGLISH} className="">
                { userLangID === LANG_CZECH ? "Angličtina" : "English" }
            </option>

        </select>
    </div>
  )
}

export default SelectLanguage