import { useUserContext } from "../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION } from "../../../config/globals"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import GridCategories from "../../UI/GridCategories/GridCategories"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { formatLang } from "../../../utils/functions/formatLang"
import TopBar from "../../UI/TopBar/TopBar"

const Categories = () => {

    const { userLangID } = useUserContext()
    const { categoriesIncome,categoriesTransactions } = useCategoriesContext()


  return (
    <div className="section-padding">

        <TopBar showYearNavigator={false}/>

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