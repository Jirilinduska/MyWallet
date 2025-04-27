import Sidebar from "../../components/Layout/Sidebar/Sidebar"
import TopBar from "../../components/Layout/TopBar/TopBar"
import SectionTitle from "../../components/UI/SectionTitle/SectionTitle"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import { useNotifContext } from "../../context/NotifContext"
import NotificationCard from "../../components/Notifications/NotificationCard/NotificationCard"
import { usePageTitle } from "../../hooks/usePageTitle"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Tab, Tabs, Typography } from "@mui/material"

const Notifications = () => {

    const { userLangID } = useUserContext()
    const { notifications } = useNotifContext()
    const navigate = useNavigate()
    const location = useLocation()
    
    const isArchivedView = location.pathname.includes("/archived")
    const currentTab = location.pathname.includes("/archived") ? 1 : 0

    const filteredNotifications = notifications.filter(x => 
      isArchivedView ? x.isArchived : !x.isArchived
    )

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
      if (newValue === 0) navigate("/notifications")
      if (newValue === 1) navigate("/notifications/archived")
    }

    usePageTitle(formatLang(userLangID, "Notifikace", "Notifications"))
    
  return (
    <div className="section-padding">

        <Sidebar/>

        <TopBar />

        <SectionTitle value={formatLang(userLangID, "Notifikace", "Notifications")} wantInfo={false} />

        <Box mb={3}>
          <Tabs
            value={currentTab}
            onChange={handleChange}
            aria-label="Notifications Tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label={formatLang(userLangID, "Aktivní", "Active")} />
            <Tab label={formatLang(userLangID, "Archivované", "Archived")} />
          </Tabs>
      </Box>

        {filteredNotifications.length === 0
          ? <Typography>{formatLang(userLangID, `Žádné ${isArchivedView ? "archivované" : "nové"} notifikace `, `No ${isArchivedView ? "archived" : "new"} notifications`)}</Typography>
          : filteredNotifications.map(x => <NotificationCard key={x._id} notif={x}/>)
        }

    </div>
  )
}

export default Notifications