import Sidebar from "../../better_components/Layout/Sidebar/Sidebar"
import TopBar from "../../better_components/Layout/TopBar/TopBar"

// TODO - Dodelat UI error page

const ErrorPage = () => {

    const token = localStorage.getItem("token")

  return (
    <section className={`${token && "section-padding"} flex items-center justify-center h-screen`}>

        { token && (
            <>
                <TopBar showMonthNavigator={false} showYearNavigator={false} />
                <Sidebar/>
            </>
        )}

        <p className="">The page you are looking for does not exist! :(</p>

    </section>
  )
}

export default ErrorPage