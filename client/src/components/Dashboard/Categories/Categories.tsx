import { useEffect } from "react"
import { useUserContext } from "../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION } from "../../../config/globals"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import GridCategories from "../../UI/GridCategories/GridCategories"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"

const Categories = () => {

    const { userLangID, refreshUserData } = useUserContext()
    const { categoriesIncome,categoriesTransactions, refreshCategories } = useCategoriesContext()

    useEffect(() => {
        // if(!categoriesIncome || !categoriesTransactions) refreshCategories()
        
        if(!userLangID) refreshUserData()
        refreshCategories()
    }, [categoriesIncome, categoriesTransactions] )

  return (
    <div className="md:ml-[250px] p-6 min-h-screen">

        <SectionTitle value={formatLang(userLangID, "Kategorie", "Categories")}/>

        <GridCategories
            categories={categoriesIncome}
            title={formatLang(userLangID, "Kategorie příjmů", "Income categories")}
            categoryType={CATEGORY_ID_INCOME}
        />

        <GridCategories
            categories={categoriesTransactions}
            title={formatLang(userLangID, "Kategorie výdajů", "Expense categories")}
            categoryType={CATEGORY_ID_TRANSACTION}
        />

    </div>
  )
}

export default Categories