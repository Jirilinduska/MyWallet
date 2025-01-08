import { useUserContext } from "../../../context/UserContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION } from "../../../config/globals"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import GridCategories from "../../UI/GridCategories/GridCategories"
import { formatLang } from "../../../utils/functions/formatLang"
import TopBar from "../../Layout/TopBar/TopBar"
import NavigatorCategories from "../../UI/NavigatorCategories/NavigatorCategories"
import { usePageTitle } from "../../../hooks/usePageTitle"
import SectionTitle from "../../UI/SectionTitle/SectionTitle"
import { hints } from "../../../utils/data/hints"

const Categories = () => {

    const { userLangID } = useUserContext()
    const { categoriesIncome,categoriesTransactions } = useCategoriesContext()

    usePageTitle(formatLang(userLangID, "Kategorie", "Categories"))


  return (
    <div className="section-padding">

        <TopBar showYearNavigator={false} showMonthNavigator={false} />

        <SectionTitle 
          value={formatLang(userLangID, "Kategorie", "Categories")} 
          wantInfo={true} 
          infoValue={formatLang(userLangID, hints.hintCategoriesCS, hints.hintCategoriesEN)}
        />

        <NavigatorCategories pageStage={0} />

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