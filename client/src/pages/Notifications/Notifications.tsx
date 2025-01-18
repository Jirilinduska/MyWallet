import { useState } from "react"
import Sidebar from "../../components/Layout/Sidebar/Sidebar"
import TopBar from "../../components/Layout/TopBar/TopBar"
import NotificationsTable from "../../components/Notifications/NotificationsTable/NotificationsTable"
import SectionTitle from "../../components/UI/SectionTitle/SectionTitle"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import NofitDetails from "../../components/Notifications/NofitDetails/NofitDetails"
import { INotification, useNotifContext } from "../../context/NotifContext"
import AreYouSureModal from "../../components/Modals/AreYouSureModal/AreYouSureModal"

const Notifications = () => {

    const { userLangID } = useUserContext()
    const { markNotifAsRead, deleteNotification } = useNotifContext()

    const [showDetails, setShowDetails] = useState(false)
    const [wantDelete, setWantDelete] = useState(false)
    const [notifModalData, setNotifModalData] = useState<INotification | null>(null)
    const [wantDeleteID, setWantDeleteID] = useState("")

    const toggleDetails = () => setShowDetails(!showDetails)
    const toggleDelete  = () => setWantDelete(!wantDelete)

    const openDeleteNotif = (id: string) => {
      setWantDeleteID(id)
      toggleDelete()
    }

    const handleDeleteNotif = () => {
      deleteNotification(wantDeleteID)
      toggleDelete()
  }

    const openModal = (data: INotification) => {
        markNotifAsRead(data._id)
        toggleDetails()
        setNotifModalData(data)
    }
    
  return (
    <div className="section-padding">

        { showDetails && notifModalData && <NofitDetails data={notifModalData} toggleDetails={toggleDetails} />}


        { wantDelete && 
            <AreYouSureModal 
                buttonNoValue={formatLang(userLangID, "Zrušit", "Cancel")} 
                buttonYesValue={formatLang(userLangID, "Smazat", "Delete")} 
                handleNo={toggleDelete} 
                handleYes={handleDeleteNotif} 
                titleValue={formatLang(userLangID, "Smazat tuto notifikaci?", "Delete this notification?")}
            /> 
        }

        <Sidebar/>

        <TopBar showMonthNavigator={false} showYearNavigator={false}/>

        <SectionTitle value={formatLang(userLangID, "Notifikace", "Notifications")} wantInfo={false} />

        <NotificationsTable
            openModal={openModal}
            openDeleteNotif={openDeleteNotif}
        />

    </div>
  )
}

export default Notifications