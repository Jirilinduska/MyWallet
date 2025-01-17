import { IconDelete, IconDots, IconEdit, IconNotification, IconStar } from "../../../utils/icons/icons"
import { formatLang } from "../../../utils/functions/formatLang"
import { useUserContext } from "../../../context/UserContext"
import { INotification, useNotifContext } from "../../../context/NotifContext"
import { formatDistanceToNow } from "date-fns"
import { LANG_CZECH } from "../../../config/globals"
import { cs } from "date-fns/locale"

interface NotificationProps {
  data: INotification
  openModal: (data: INotification) => void
  toggleSettings: (id: string | null) => void
  activeSettingsId: string | null
  openDeleteNotif: (id: string) => void
}

const Notification = ({ data, openModal, activeSettingsId, toggleSettings, openDeleteNotif }: NotificationProps) => {

    const { userLangID } = useUserContext()
    const { archiveNotif, unArchiveNotif } = useNotifContext()

    const isActive = activeSettingsId === data._id

  return (
    <div
        onClick={ () => openModal(data) } 
        className={`
            ${ data.isRead ? "bg-white text-gray-500 hover:bg-gray-200" : "bg-gray-600 text-white hover:bg-gray-500" } 
            flex border-b text-xs sm:text-sm py-2 relative cursor-pointer`
        }
    >

        { !data.isRead && !data.isArchived && <IconNotification className="absolute top-1/2 left-2 -translate-y-1/2 text-2xl text-red-500"/> }
        { data.isArchived && <IconStar className="absolute top-1/2 left-2 -translate-y-1/2 text-2xl text-yellow-500"/> }

        <div className="hidden sm:block flex-1 p-2 text-left pl-10">
            <span className="font-semibold">My Wallet App</span>
        </div>

        <div className="flex-1 p-2 pl-8 sm:pl-0 text-left truncate w-48">{formatLang(userLangID, data.titleCS, data.titleEN)}</div>

        <div className="hidden sm:block flex-1 p-2 text-left">{formatDistanceToNow(data.createdAt, { addSuffix: true, locale: userLangID === LANG_CZECH ? cs : undefined })}</div>


        <div 
            className="sm:w-20 p-2 flex justify-end relative"
            onClick={ (e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleSettings(isActive ? null : data._id)
            }}
        >
            <IconDots className="icon" />

            {isActive && (
                <div className="absolute top-full right-0 w-32 bg-white z-10 p-2 shadow-md rounded-md">
                    
                    <button 
                        className="flex items-center gap-2 w-full text-left py-2 hover:bg-gray-100 !text-black"
                        onClick={ (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            openDeleteNotif(data._id)
                        }}
                    >
                        <IconDelete className="text-red-500" />
                        {formatLang(userLangID, "Smazat", "Delete")}
                    </button>
        
                    <button 
                        className="flex items-center gap-2 w-full text-left py-2 hover:bg-gray-100 !text-black"
                        onClick={ (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            if(data.isArchived) {
                                unArchiveNotif(data._id)
                            } else {
                                archiveNotif(data._id)
                            }
                            toggleSettings(null)
                        }}
                    >
                        <IconEdit />
                         { data.isArchived 
                            ? formatLang(userLangID, "Odarchivovat", "Unarchive") 
                            : formatLang(userLangID, "Archivovat", "Archive") 
                        }
                    </button>
                </div>
            )}

        </div>


    </div>
  )
}

export default Notification
