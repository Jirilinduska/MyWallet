import { useEffect } from "react"
import { useUserContext } from "../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION, LANG_CZECH } from "../../../config/globals"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import GridCategories from "../../UI/GridCategories/GridCategories"

const Categories = () => {

    const { userLangID, refreshUserData } = useUserContext()
    const { categoriesIncome,categoriesTransactions, refreshCategories } = useCategoriesContext()

    useEffect(() => {
        if(!userLangID) refreshUserData()
    }, [])

    useEffect(() => {
        if(!categoriesIncome || !categoriesTransactions) refreshCategories()
    }, [])

  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        <h3 className="font-bold text-lg mb-10">{ userLangID === LANG_CZECH ? "Kategorie" : "Categories" }</h3>

        <GridCategories
            categories={categoriesIncome}
            langID={userLangID}
            titleCS="Kategorie příjmů"
            titleEN="Income categories"
            categoryType={CATEGORY_ID_INCOME}
        />

        <GridCategories
            categories={categoriesTransactions}
            langID={userLangID}
            titleCS="Kategorie výdajů"
            titleEN="Expense categories"
            categoryType={CATEGORY_ID_TRANSACTION}
        />

    </div>
  )
}

export default Categories