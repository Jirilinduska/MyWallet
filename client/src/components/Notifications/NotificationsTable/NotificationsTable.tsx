import { useEffect, useState } from "react"
import { INotification, useNotifContext } from "../../../context/NotifContext"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import Notification from "../Notification/Notification"

interface NotificationsTableProps {
    openModal: (data: INotification) => void
    openDeleteNotif: (id: string) => void
}

const NotificationsTable = ({ openModal, openDeleteNotif } : NotificationsTableProps ) => {

    const { userLangID } = useUserContext()
    const { notifications } = useNotifContext()

    const [activeSettingsId, setActiveSettingsId] = useState<string | null>(null)
    const toggleSettings = (id: string | null) => setActiveSettingsId(id)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!target.closest(".relative")) {
          setActiveSettingsId(null)
        }
      }
  
      document.addEventListener("click", handleClickOutside)
      return () => {
        document.removeEventListener("click", handleClickOutside)
      }
    }, [])

  return (
    <div className="">

      <div className="flex flex-col text-sm overflow-x-auto sm:rounded-lg my-10 animate-fadeIn">

        <div className="flex font-semibold text-gray-400 bg-gray-700 px-2 py-1">

          <div className="hidden sm:block flex-1 p-2 pl-8 items-center cursor-pointer text-left">
            {formatLang(userLangID, "Od", "From")}
          </div>

          <div className="flex-1 p-2 pl-8 sm:pl-0 text-left">
            {formatLang(userLangID, "Zpráva", "Message")}
          </div>

          <div className="hidden sm:block flex-1 p-2 text-left">
            {formatLang(userLangID, "Datum", "Date")}
          </div>

          <div className="sm:w-20 p-2 text-center"></div>
        </div>

        { notifications.length === 0 && <p className="text-center p-2">{formatLang(userLangID, "Nemáte žádné notifikace", "You dont have any notifications")}</p> }

        { notifications.length > 0 &&
          <div className="pb-40">
            { notifications.map((x) => (
                <Notification
                  key={x._id}
                  data={x}
                  openModal={openModal}
                  toggleSettings={toggleSettings}
                  activeSettingsId={activeSettingsId}
                  openDeleteNotif={openDeleteNotif}
                />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default NotificationsTable
