import { ChangeEvent, useEffect } from "react"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { ICategory, IInputSelectCategory } from "../../../utils/interfaces/interfaces"
import { useUserContext } from "../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, LANG_CZECH } from "../../../config/globals"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { formatLang } from "../../../utils/functions/formatLang"


interface SelectCategoryProps {
    value: string,
    categoryType: string
    handleChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleChangeCategory?: (value: string) => void
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ value, handleChange, categoryType, handleChangeCategory }) => {

    const { categoriesIncome, categoriesTransactions, refreshCategories } = useCategoriesContext()
    const { refreshUserData, userLangID } = useUserContext()

    useEffect( () => {
        refreshCategories()
    }, [])

    useEffect( () => {
        if(!userLangID) refreshUserData()
    }, [])



  return (
    <FormControl sx={{ width: "50%" }}>

        <InputLabel id="categoryID">{formatLang(userLangID, "Kategorie*", "Category*" )}</InputLabel>
        <Select
            labelId="categoryID"
            id="categoryID"
            value={value}
            onChange={(e) => handleChangeCategory?.(e.target.value)}
        >
            { categoryType === CATEGORY_ID_TRANSACTION && categoriesTransactions.map( (cat: ICategory) => (
                <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
            ))}

            { categoryType === CATEGORY_ID_INCOME && categoriesIncome.map( (cat: ICategory) => (
                <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
            ))}
        </Select>
    </FormControl>
  )
}

export default SelectCategory