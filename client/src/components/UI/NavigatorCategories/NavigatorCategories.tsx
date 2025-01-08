import { Link } from "react-router-dom"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { IconNext } from "../../../utils/icons/icons"


interface NavigatorCategoriesProps {
    pageStage: number
    catName?: string
    catID?: string
}

const NavigatorCategories = ({ pageStage, catName, catID } : NavigatorCategoriesProps ) => {

    const { userLangID } = useUserContext()

  return (
    <div className="flex items-center gap-1 sm:gap-4 mb-10">

        { pageStage !== 0 &&
            <Link className="underline text-sm" to="/dashboard/categories"> 
                <p className="font-semibold">{formatLang(userLangID, "Kategorie", "Categories")}</p> 
            </Link>
        }

        { pageStage > 0 && <IconNext/> }

        { pageStage === 1 
            ?  catName && <p className="font-semibold text-gray-500 text-sm">{catName}</p>
            : pageStage > 1
                ? catName && <Link to={`/dashboard/categories/preview-category/${catID}`} className="underline text-sm">
                                <p className="font-semibold">{catName}</p>
                            </Link>
                : ""
        }

        { pageStage > 1 && <IconNext className="hidden xs:block" /> }

        { pageStage === 2
            ?  catName && <p className="font-semibold text-gray-500 text-sm hidden xs:block">{formatLang(userLangID, "Seznam transakcí", "List of transactions")}</p>
            : pageStage > 1
                ?   <Link to="/dashboard/categories">
                        <p className="font-semibold text-gray-500 text-sm">{formatLang(userLangID, "Seznam transakcí", "List of transactions")}</p>
                    </Link>
                : ""
        }

    </div>
  )
}

export default NavigatorCategories