import { useEffect, ChangeEvent } from "react"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useUserContext } from "../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, LANG_CZECH } from "../../../config/globals"

export interface ISelectCatType {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const SelectCategoryType: React.FC<ISelectCatType> = ({ onChange, value }) => {
  const { refreshUserData, userLangID } = useUserContext()

  useEffect(() => {
    if (!userLangID) refreshUserData()
  }, [])

  return (
    <FormControl fullWidth sx={{ my: 2 }} size="small">
      <InputLabel id="category-type-label">
        {userLangID === LANG_CZECH ? "Kategorie pro*" : "Category for*"}
      </InputLabel>

      <Select
        labelId="category-type-label"
        id="categoryType"
        name="categoryType"
        value={value}
        onChange={onChange as unknown as (event: SelectChangeEvent<string>) => void}
        label={userLangID === LANG_CZECH ? "Kategorie pro*" : "Category for*"}
      >
        <MenuItem value="" disabled>
          {userLangID === LANG_CZECH ? "Vyber kategorii" : "Select category"}
        </MenuItem>
        <MenuItem value={CATEGORY_ID_INCOME}>
          {userLangID === LANG_CZECH ? "Příjmy" : "Income"}
        </MenuItem>
        <MenuItem value={CATEGORY_ID_TRANSACTION}>
          {userLangID === LANG_CZECH ? "Výdaje" : "Expense"}
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectCategoryType
