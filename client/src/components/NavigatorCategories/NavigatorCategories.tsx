import { Link } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import SectionTitle from "../UI/SectionTitle/SectionTitle"
import { IconNext } from "../../utils/icons/icons"


interface NavigatorCategoriesProps {
    pageStage: number
    catName?: string
    catID?: string
}

const NavigatorCategories = ({ pageStage, catName, catID } : NavigatorCategoriesProps ) => {

    const { userLangID } = useUserContext()

  return (
    <div className="flex items-center gap-4 mb-10">

        { pageStage === 0 
            ?   <p className="font-semibold">{formatLang(userLangID, "Kategorie", "Categories")}</p>
            :   <Link className="underline" to="/dashboard/categories"> 
                    <p className="font-semibold">{formatLang(userLangID, "Kategorie", "Categories")}</p> 
                </Link>
        }

        { pageStage > 0 && <IconNext/> }

        { pageStage === 1 
            ?  catName && <p className="font-semibold text-gray-500">{catName}</p>
            : pageStage > 1
                ? catName && <Link to={`/dashboard/categories/preview-category/${catID}`} className="underline">
                                <p className="font-semibold">{catName}</p>
                            </Link>
                : ""
        }

        { pageStage > 1 && <IconNext/> }

        { pageStage === 2
            ?  catName && <p className="font-semibold text-gray-500">{formatLang(userLangID, "Seznam transakcí", "List of transactions")}</p>
            : pageStage > 1
                ?   <Link to="/dashboard/categories">
                        <p className="font-semibold text-gray-500">{formatLang(userLangID, "Seznam transakcí", "List of transactions")}</p>
                    </Link>
                : ""
        }

    </div>
  )
}

export default NavigatorCategories