import { useParams } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import { useEffect, useState } from "react"
import { categoryIcons } from "../../utils/icons/category-icons"
import { formatLang } from "../../utils/functions/formatLang"
import { CATEGORY_ID_INCOME} from "../../config/globals"
import CategoryStatsWithChart from "../../components/Charts/CategoryStatsWithChart/CategoryStatsWithChart"
import TopBar from "../../components/Layout/TopBar/TopBar"
import NavigatorCategories from "../../components/UI/NavigatorCategories/NavigatorCategories"
import { usePageTitle } from "../../hooks/usePageTitle"
import Loader from "../../components/UI/Loader/Loader"
import ErrorPage from "../ErrorPage/ErrorPage"
import { ICategoryPreview } from "../../utils/interfaces/interfaces"
import { handleGetCategoryInfo } from "../../API/Categories"
import { handleError } from "../../Errors/handleError"

const CategoryPreview = () => {

    const { categoryID } = useParams()

    const { userLangID } = useUserContext()
    const [catInfo, setCatInfo] = useState<ICategoryPreview | null>(null)
    const [loading, setLoading] = useState(false)

    usePageTitle(`${catInfo?.categoryName}`)

    useEffect(() => {
        const fetchData = async() => {
            if(!categoryID) return
            setLoading(true)
            try {
                const response = await handleGetCategoryInfo(categoryID)
                setCatInfo(response.data)
            } catch (error) {
                handleError(error, userLangID)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [categoryID])

    if(loading) return <Loader wantFullSize={true} />
    if(!catInfo) return <ErrorPage valueCS="Kategorie" valueEN="Category" />


  return (
    <div className="section-padding animate-fadeIn pb-40">

        <TopBar />

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
            
            <h3 className="font-semibold mb-4 order-2 text-sm sm:text-base">
                {`${formatLang(
                        userLangID, 
                        catInfo.categoryType === CATEGORY_ID_INCOME ? "Příjmy pro tuto kategorii" : "Výdaje pro tuto kategorii", 
                        catInfo.categoryType === CATEGORY_ID_INCOME ? "Income for this category" : "Expenses for this category"
                    )}:
                `}
            </h3>

        <CategoryStatsWithChart catInfo={catInfo}/>


    </div>
  )
}

export default CategoryPreview