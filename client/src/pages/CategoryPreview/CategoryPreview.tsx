import { Link, useParams } from "react-router-dom"
import { useCategoriesContext } from "../../context/CategoriesContext"
import { useUserContext } from "../../context/UserContext"
import { useEffect } from "react"
import { IconMoneyInHand } from "../../utils/icons/icons"
import { categoryIcons } from "../../utils/icons/category-icons"
import { formatLang } from "../../utils/functions/formatLang"
import { CATEGORY_ID_INCOME,  COLOR_BLUE, COLOR_WHITE, SIZE_ROW } from "../../config/globals"
import InfoItem from "../../components/UI/InfoItem/InfoItem"
import CategoryStatsWithChart from "../../components/Charts/CategoryStatsWithChart/CategoryStatsWithChart"
import TopBar from "../../components/Layout/TopBar/TopBar"
import NavigatorCategories from "../../components/UI/NavigatorCategories/NavigatorCategories"
import { usePageTitle } from "../../hooks/usePageTitle"
import Loader from "../../components/UI/Loader/Loader"
import ErrorPage from "../ErrorPage/ErrorPage"

const CategoryPreview = () => {

    const { categoryID } = useParams()

    const { getCategoryInfo, catInfo, loading } = useCategoriesContext()
    const { userLangID } = useUserContext()

    usePageTitle(`${catInfo?.categoryName}`)

    useEffect(() => {
        if (categoryID) getCategoryInfo(categoryID, userLangID);
    }, [] )

    if(loading) return <Loader wantFullSize={true} />

    if(!catInfo) return <ErrorPage valueCS="Kategorie" valueEN="category" />


  return (
    <div className="section-padding animate-fadeIn pb-40">

        <TopBar showMonthNavigator={false} showYearNavigator={false}/>

        <NavigatorCategories pageStage={1} catName={catInfo.categoryName}/>

        <div className="flex items-center gap-2 mb-4">
            <span className="text-colorBlue text-base sm:text-lg">{ categoryIcons.find(x => x.id === catInfo.iconID)?.iconJSX || null }</span>
            <h3 className="font-semibold text-lg sm:text-2xl">{catInfo.categoryName}</h3>
        </div>
        

        <p className="text-sm sm:text-base mb-10">
            {formatLang(
                userLangID, 
                catInfo.categoryType === CATEGORY_ID_INCOME ? "Kategorie příjmů" : "Kategorie výdajů",
                catInfo.categoryType === CATEGORY_ID_INCOME ? "Income category" : "Expense category",
            )}
        </p>

        <div className="w-full lg:w-1/2 mb-10">
                <InfoItem formatToCurrency={false} amount={catInfo.transactionCount} color={COLOR_WHITE} desc={formatLang(userLangID, "Počet transakcí", "Number of transactions")} icon={null} plannedAmount={null} size={SIZE_ROW}/>
                <InfoItem formatToCurrency={true} amount={catInfo.largestTransaction.amount} color={COLOR_BLUE} desc={formatLang(userLangID, "Největší transakce", "Largest transaction")} icon={<IconMoneyInHand/>} size={SIZE_ROW} subtitle={`${catInfo.largestTransaction.day}.${catInfo.largestTransaction.month}.${catInfo.largestTransaction.year}`} plannedAmount={null}/>
            </div>

        <div className="flex items-center justify-between flex-col gap-6 sm:flex-row-reverse mb-10">
            
            <h3 className="font-semibold mb-2 order-2 text-sm sm:text-base">
                {`${formatLang(
                        userLangID, 
                        catInfo.categoryType === CATEGORY_ID_INCOME ? "Příjmy pro tuto kategorii" : "Výdaje pro tuto kategorii", 
                        catInfo.categoryType === CATEGORY_ID_INCOME ? "Income for this category" : "Expenses for this category"
                    )}:
                `}
            </h3>

            <Link 
                className="button-blue order-1 text-xs sm:text-sm" 
                to={`/dashboard/categories/preview-category/${catInfo.categoryID}/transactions`}
            >
                {formatLang(userLangID, "Zobrazit transakce", "Show transactions")}
            </Link>

        </div>

        <CategoryStatsWithChart catInfo={catInfo}/>


    </div>
  )
}

export default CategoryPreview