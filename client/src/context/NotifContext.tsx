import { createContext, useContext, useEffect, useState } from "react"
import { handleError } from "../Errors/handleError"
import { useUserContext } from "./UserContext"
import { handleArchiveNotification, handleDeleteNotification, handleGetNotifications, handleMarkNotifAsRead } from "../API/Notifs"
import { ICategorySummary } from "../utils/interfaces/interfaces"

interface NotifContextProps {
    notifications: INotification[]
    findUnreadNotifs: () => number
    deleteNotification: (id: string) => void
    markNotifAsRead: (id: string) => void
    archiveNotif: (notifID: string) => void
    unArchiveNotif: (notifID: string) => void
}

export interface INotification {
    _id: string
    userID: string
    type: string
    titleCS: string
    titleEN: string,
    messageCS: string[]
    messageEN: string[]
    isRead: boolean,
    createdAt: Date,
    totalSpent?: number
    totalPlanned?: number
    year?: number
    month?: number
    isArchived: boolean
    categorySummary: ICategorySummary[]
    unplannedCategories: ICategorySummary[]
}

export const NotifContext = createContext<NotifContextProps | undefined>(undefined)


export const NotifProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { userLangID } = useUserContext()

    const [notifications, setNotifications] = useState<INotification[]>([])

    // GET - get all notifications
    const refreshNotifications = async() => {
        try {
            const response = await handleGetNotifications()
            const sortedNotifs = response.data.sort( (a: any, b: any) => {
                return Number(b.isArchived) - Number(a.isArchived)
            })

            setNotifications(sortedNotifs)
        } catch (error) {
            handleError(error, userLangID)
        }
    }

    // POST - Mark as read
    const markNotifAsRead = async(id: string) => {
        try {
            await handleMarkNotifAsRead(id)
            await refreshNotifications()
        } catch (error) {
            handleError(error, userLangID)
        }
    }

    // DELETE 
    const deleteNotification = async(id: string) => {
        try {
            const updatedNotifications = notifications.filter(notification => notification._id !== id)
            setNotifications(updatedNotifications)
            await handleDeleteNotification(id)
        } catch (error) {
            handleError(error, userLangID)
        }
    }

    // Vrací počet nepřečtených notifikací
    const findUnreadNotifs = () => {
        return notifications.filter( x => !x.isRead ).length
    }


    // id = 1 archive
    const archiveNotif = async(notifID: string) => {
        try {
            await handleArchiveNotification(notifID, "1")
            await refreshNotifications()
        } catch (error) {
            handleError(error, userLangID)
        }
    }

    // id = 0 unArchive
    const unArchiveNotif = async(notifID: string) => {
        try {
            await handleArchiveNotification(notifID, "0")
            await refreshNotifications()
        } catch (error) {
            handleError(error, userLangID)
        }
    }

    useEffect(() => {
        refreshNotifications()
    }, [] )

    return (
        <NotifContext.Provider
            value={{
                notifications,
                findUnreadNotifs,
                deleteNotification,
                markNotifAsRead,
                archiveNotif,
                unArchiveNotif
            }}
        >
            { children }
        </NotifContext.Provider>
    )
}

export const useNotifContext = () => {
    const context = useContext(NotifContext)
    if (!context) {
        throw new Error("NotifContext must be used within an NotifProvider")
    }
    return context
}