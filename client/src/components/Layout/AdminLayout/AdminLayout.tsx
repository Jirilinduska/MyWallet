import { Outlet, useNavigate } from "react-router-dom"
import TopBar from "../TopBar/TopBar"
import Sidebar from "../Sidebar/Sidebar"
import { useUserContext } from "../../../context/UserContext"
import { useEffect, useState } from "react"
import { handleGetAdminData } from "../../../API/Settings"
import { IAdminData } from "../../../utils/interfaces/interfaces"
import { usePageTitle } from "../../../hooks/usePageTitle"
import Loader from "../../UI/Loader/Loader"
import AdminTabs from "../../Admin/AdminTabs/AdminTabs"

const AdminLayout = () => {

  const { isAdmin } = useUserContext()
  const navigate = useNavigate()

  const [data, setData] = useState<IAdminData | null>(null)

  usePageTitle("Admin dashboard")

  useEffect(() => {
    const fetchData = async() => {
      const response = await handleGetAdminData()
      setData(response.data)
    }

    if(isAdmin) {
      fetchData()
    } else {
      navigate("/dashboard/overview")
    }
  }, [isAdmin])

  if(!data) return <Loader wantFullSize={true} />


  return (
    <div className="section-padding">

      <TopBar/>
      <Sidebar />

      <main>
        <AdminTabs />
        <Outlet context={data} />
      </main>
    </div>
  )
}

export default AdminLayout