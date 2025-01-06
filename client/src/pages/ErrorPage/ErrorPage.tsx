import Sidebar from "../../better_components/Layout/Sidebar/Sidebar"
import TopBar from "../../better_components/Layout/TopBar/TopBar"
import { LANG_CZECH, LANG_ENGLISH } from "../../config/globals"
import { useUserContext } from "../../context/UserContext"

// TODO - Dodelat UI error page

interface ErrorPageProps {
  valueEN: string
  valueCS: string
}

const ErrorPage = ({ valueCS, valueEN } : ErrorPageProps ) => {

    const token = localStorage.getItem("token")
    const { userLangID } = useUserContext()

  return (
    <section className={`${token && "section-padding"} flex items-center justify-center h-screen`}>

        { token && (
            <>
                <TopBar showMonthNavigator={false} showYearNavigator={false} />
                <Sidebar/>
            </>
        )}

        { ((!userLangID) || (userLangID === LANG_ENGLISH)) && <p className="">{`The ${valueEN} you are looking for does not exist.`}</p> }
        { userLangID === LANG_CZECH && <p className="">{`${valueCS} kterou hledáte neexistuje.`}</p> }

    </section>
  )
}

export default ErrorPage