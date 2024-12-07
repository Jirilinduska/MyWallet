import { useEffect } from "react"
import { useCategoriesContext } from "../../../../context/CategoriesContext"
import { ICategory, IInputSelect } from "../../../../utils/interfaces/interfaces"
import { useUserContext } from "../../../../context/UserContext"
import { LANG_CZECH } from "../../../../config/globals"

const SelectCategory: React.FC<IInputSelect> = ({ value, handleChange }) => {

    const { categories, refreshCategories } = useCategoriesContext()
    const { refreshUserData, userLangID } = useUserContext()

    useEffect( () => {
        refreshCategories()
    }, [])

    useEffect( () => {
        if(!userLangID) refreshUserData()
    }, [])

  return (
    <div className="w-1/2">
                
        <label htmlFor="category" className="block text-sm mb-2 font-medium text-gray-900 dark:text-white">
            { userLangID === LANG_CZECH ? "Kategorie*" : "Category*" }
        </label>

        <select
            id="category"
            name="category"
            value={value}
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

    </div>
  )
}

export default SelectCategory