import { Link } from "react-router-dom"
import Sidebar from "../../components/Layout/Sidebar/Sidebar"
import TopBar from "../../components/Layout/TopBar/TopBar"
import { LANG_CZECH, LANG_ENGLISH } from "../../config/globals"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import { usePageTitle } from "../../hooks/usePageTitle"

interface ErrorPageProps {
  valueEN: string
  valueCS: string
}

const ErrorPage = ({ valueCS, valueEN } : ErrorPageProps ) => {

    const token = localStorage.getItem("token")
    const { userLangID } = useUserContext()

    usePageTitle("Error (404)")

  return (
    <section className={`${token && "section-padding"} flex flex-col gap-10 items-center justify-center h-screen`}>

        { token && (
            <>
                <TopBar showMonthNavigator={false} showYearNavigator={false} />
                <Sidebar/>
            </>
        )}

        <div className="flex items-center justify-center gap-4 animate-fadeIn">

          <span className="text-5xl lg:text-[150px] mr-2 font-mono">4</span>

          <div className="w-[50px] lg:w-[200px]">
            <img src="/images/utils/cloud.png" alt="image_404" className="" />
          </div>

          <span className="text-5xl lg:text-[150px] font-mono">4</span>
        </div>

        <p className="font-semibold animate-fadeIn">{ userLangID ? formatLang(userLangID, "Chyba", "Error") : "Error" }</p>

        { ((!userLangID) || (userLangID === LANG_ENGLISH)) && <p className="font-semibold text-xs xs:text-base animate-fadeIn">{`The ${valueEN} you are looking for does not exist.`}</p> }
        { userLangID === LANG_CZECH && <p className="font-semibold text-xs xs:text-base animate-fadeIn">{`${valueCS} kterou hledáte neexistuje.`}</p> }

        <Link to="/" className="button-blue animate-fadeIn">
          { userLangID 
            ? formatLang(userLangID, "Domů", "Home") 
            : "Home"
          }
          
        </Link>

    </section>
  )
}

export default ErrorPage