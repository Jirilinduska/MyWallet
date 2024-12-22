import { Link } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import SectionTitle from "../UI/SectionTitle/SectionTitle"


interface NavigatorCategoriesProps {
    pageStage: number
    catName?: string
}

// TODO - Doladit > šipky + linky

const NavigatorCategories = ({ pageStage, catName } : NavigatorCategoriesProps ) => {

    const { userLangID } = useUserContext()

  return (
    <div className="flex items-center gap-4">

        { pageStage === 0 
            ?   <SectionTitle value={formatLang(userLangID, "Kategorie", "Categories")} />
            :   <Link className="underline" to="/dashboard/categories"> <SectionTitle value={formatLang(userLangID, "Kategorie", "Categories")} /> </Link>
        }

        { pageStage === 1 
            ?  catName && <SectionTitle value={catName} />
            : pageStage > 1
                ? catName && <Link to="/dashboard/categories"> <SectionTitle value={catName} /> </Link>
                : ""
        }

        { pageStage === 2
            ?  catName && <SectionTitle value={formatLang(userLangID, "Seznam transakcí", "List of transactions")} />
            : pageStage > 1
                ?  <Link to="/dashboard/categories"> <SectionTitle value={formatLang(userLangID, "Seznam transakcí", "List of transactions")} /> </Link>
                : ""
        }

    </div>
  )
}

export default NavigatorCategories