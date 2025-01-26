import { useCategoriesContext } from "../../../context/CategoriesContext"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { IconExclMark } from "../../../utils/icons/icons"
import { ICategorySummary } from "../../../utils/interfaces/interfaces"

interface NotifCategoriesSummaryProps {
    summary: ICategorySummary[]
    isPlanned: boolean
}

const NotifCategoriesSummary = ({ summary, isPlanned }: NotifCategoriesSummaryProps) => {

    const { categoriesTransactions } = useCategoriesContext()
    const { userLangID, userCurrency } = useUserContext()

    const sortedData = summary.sort( (a, b) => b.spent - a.spent)

  return (
    <div>

        <h3 className="text-sm sm:text-lg font-semibold mb-6">
            {formatLang(
                userLangID, 
                isPlanned ? "Plánované útraty podle kategorií" : "Neplánované útraty", 
                isPlanned ? "Planned expenses by categories" : "Unplanned expenses"
            )}:
        </h3>

        { sortedData.map( x => {

            const catName = categoriesTransactions.find( cat => cat._id === x.categoryID )?.name
            const catIconID = categoriesTransactions.find( c => c._id === x.categoryID )?.iconID
            const percentage = x.spent > 0 ? (x.spent / x.planned) * 100 : 0
            const icon = categoryIcons.find( i => i.id === catIconID )?.iconJSX

            return(
                <div className="mb-6">

                    <div className={`${percentage > 100 ? "text-red-500 mb-1" : "text-green-500 mb-2"} flex items-center gap-2 font-semibold text-sm sm:text-base`}>
                        <span className="">{icon}</span>
                        <h3 className="">{catName}</h3>
                        { isPlanned && <span>({percentage.toFixed()}%)</span> }
                    </div>

                    { percentage > 100 && isPlanned && 
                        <div className="text-red-500 text-xs mb-2 flex items-center gap-1">
                            <IconExclMark/>
                            <p>{formatLang(userLangID, "Překročený rozpočet", "Exceeded budget")}</p>
                        </div>
                    }

                    { isPlanned &&
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                            <p className="">{formatLang(userLangID, "Naplánovaná útrata", "Planned spending")}:</p>
                            <span className="">{formatCurrency(x.planned, userCurrency)}</span>
                        </div>
                    }

                    <div className="flex items-center gap-2 text-sm sm:text-base">
                        <p className="">
                            {formatLang(
                                userLangID, 
                                isPlanned ? "Skutečná útrata" : "Útrata", 
                                isPlanned ? "Actual spending" : "Spending"
                            )}:
                        </p>
                        <span className="">{formatCurrency(x.spent, userCurrency)}</span>
                    </div>

                </div>
            )
        })}

    </div>
  )
}

export default NotifCategoriesSummary