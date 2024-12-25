import { Link, useParams } from "react-router-dom"
import { useCategoriesContext } from "../../context/CategoriesContext"
import { useUserContext } from "../../context/UserContext"
import { useEffect } from "react"
import { IconChart, IconGoBack, IconMoneyInHand, IconSettings } from "../../utils/icons/icons"
import { categoryIcons } from "../../utils/icons/category-icons"
import { formatCurrency } from "../../utils/functions/formatNumber"
import { formatLang } from "../../utils/functions/formatLang"
import { CATEGORY_ID_INCOME,  COLOR_BLUE,  COLOR_GREEN,  COLOR_RED,  COLOR_WHITE,  SIZE_MEDIUM, SIZE_ROW } from "../../config/globals"
import SectionTitle from "../UI/SectionTitle/SectionTitle"
import InfoItem from "../UI/InfoItem/InfoItem"
import BarChart from "../Graphs/BarChart/BarChart"
import CategoryStatsWithChart from "../CategoryStatsWithChart/CategoryStatsWithChart"
import TopBar from "../UI/TopBar/TopBar"
import NavigatorCategories from "../NavigatorCategories/NavigatorCategories"

// TODO - Vybvrat všechny hodnoty
// export interface ICategoryPreview {
//     monthlySummary: { [key: string]: number }
//     monthlyCounts: { [key: string]: number }
//     largestTransactionsByMonth: ITransaction[]
//     yearlySummary: { [key: string]: number }
// }

// TODO - Přidat tlačítko na /transactions pro zobrazení všech transakcí pro tuto categori :)

const CategoryPreview = () => {

    const { categoryID } = useParams()
    console.log(categoryID)

    const { getCategoryInfo, catInfo } = useCategoriesContext()
    const { userLangID, userCurrency } = useUserContext()

    useEffect(() => {
        if(categoryID) getCategoryInfo(categoryID, userLangID)
    }, [] )

    // TODO 
    if(!catInfo) return <div className="flex items-center justify-center">Loading</div>

    // console.log(catInfo)

  return (
    <div className="section-padding">

        <TopBar showMonthNavigator={false} showYearNavigator={false}/>

        <NavigatorCategories pageStage={1} catName={catInfo.categoryName}/>

        {/* // TODO - Dokončit nastavení - modalEditCategory! */}
        <div className="flex items-center justify-between mb-4">

            <div className="flex items-center gap-2">
                <span className="text-colorBlue text-lg">{ categoryIcons.find(x => x.id === catInfo.iconID)?.iconJSX || null }</span>
                <h3 className="font-semibold text-2xl">{catInfo.categoryName}</h3>
            </div>

            <IconSettings className="icon text-colorBlue text-3xl" />
        </div>

        <p className="mb-4">
            {formatLang(
                userLangID, 
                catInfo.categoryType === CATEGORY_ID_INCOME ? "Kategorie příjmů" : "Kategorie výdajů",
                catInfo.categoryType === CATEGORY_ID_INCOME ? "Income category" : "Expense category",
            )}
        </p>

        <div className="flex items-center justify-between">
            
            <h3 className="font-semibold mb-2">
                {`${formatLang(
                        userLangID, 
                        catInfo.categoryType === CATEGORY_ID_INCOME ? "Příjmy pro tuto kategorii" : "Výdaje pro tuto kategorii", 
                        catInfo.categoryType === CATEGORY_ID_INCOME ? "Income for this category" : "Expenses for this category"
                    )}:
                `}
            </h3>

            <Link 
                className="button-blue" 
                to={`/dashboard/categories/preview-category/${catInfo.categoryID}/transactions`}
            >
                Zobrazit transakce
            </Link>

        </div>

        {/* <h3 className="font-semibold mb-2">
            {`${formatLang(
                    userLangID, 
                    catInfo.categoryType === CATEGORY_ID_INCOME ? "Příjmy pro tuto kategorii" : "Výdaje pro tuto kategorii", 
                    catInfo.categoryType === CATEGORY_ID_INCOME ? "Income for this category" : "Expenses for this category"
                )}:
            `}
        </h3> */}

        <CategoryStatsWithChart catInfo={catInfo}/>

        <h3 className="font-semibold mb-2">
            {formatLang(userLangID, "Statistiky pro tuto kategorii", "Statistics for this category")}:
        </h3>

        <div className="">

            <div className="w-1/3">
                <InfoItem formatToCurrency={false} amount={catInfo.transactionCount} color={COLOR_WHITE} desc={formatLang(userLangID, "Počet transakcí", "Number of transactions")} icon={null} plannedAmount={null} size={SIZE_ROW}/>
                <InfoItem formatToCurrency={true} amount={catInfo.largestTransaction.amount} color={COLOR_BLUE} desc={formatLang(userLangID, "Největší transakce", "Largest transaction")} icon={<IconMoneyInHand/>} size={SIZE_ROW} subtitle={`${catInfo.largestTransaction.day}.${catInfo.largestTransaction.month}.${catInfo.largestTransaction.year}`} plannedAmount={null}/>
            </div>

        </div>


    </div>
  )
}

export default CategoryPreview