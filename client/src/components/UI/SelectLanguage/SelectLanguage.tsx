import { useEffect } from "react"
import { useUserContext } from "../../../context/UserContext"
import { IInputSelect } from "../../../utils/interfaces/interfaces"
import { LANG_CZECH, LANG_ENGLISH } from "../../../config/globals"
import HeadingSmall from "../HeadingSmall/HeadingSmall"
import { formatLang } from "../../../utils/functions/formatLang"

const SelectLanguage: React.FC<IInputSelect> = ({ value, handleChange }) => {

    const { userLangID } = useUserContext()

  return (
    <div className="w-full sm:w-1/2">
        
        <HeadingSmall value={formatLang(userLangID, "Jazyk", "Language")} className="mb-2"/>

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