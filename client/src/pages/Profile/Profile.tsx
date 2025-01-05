import { ChangeEvent, useState } from "react"
import { useUserContext } from "../../context/UserContext"
import { NOTIF_ERROR, NOTIF_SUCCESS } from "../../config/globals"
import { handleUpdateUserData } from "../../API/User"
import Avatars from "../../components/OffCanvas/Avatars/Avatars"
import { IUserDataUpdate } from "../../utils/interfaces/interfaces"
import { handleNotification } from "../../utils/functions/notificationsUtils"
import { formatLang } from "../../utils/functions/formatLang"
import TopBar from "../../better_components/Layout/TopBar/TopBar"
import Sidebar from "../../better_components/Layout/Sidebar/Sidebar"
import Loader from "../../better_components/Loaders/Loader/Loader"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import SettingsCard from "../../components/SettingsCard/SettingsCard"
import { useCompleteProfile } from "../../hooks/useCompleteProfile"
import { usePageTitle } from "../../hooks/usePageTitle"

const Profile = () => {

    // TODO - Upravit kontext + přidat funkce na reset heslo, emailu
    const { refreshUserData, userData, userLangID } = useUserContext()

    useCompleteProfile()
    usePageTitle(formatLang(userLangID, "Profil", "Profile"))

    const [isEdited, setIsEdited] = useState(false)
    const [showAvatars, setShowAvatars] = useState(false)
    const [userInfo, setUserInfo] = useState<IUserDataUpdate>({
        userName: userData?.userName || "",
        email: userData?.email || "",
        currency: userData?.utils.currency || "",
        language: userData?.utils.language || "",
        avatarID: userData?.utils.avatarID || 0
    })

    const toggleAvatars = () => setShowAvatars( prev => !prev )

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target
        setUserInfo( (prev) => ({
            ...prev,
            [name]: value
        }))
        setIsEdited(true)
    }

    const handleSubmit = async() => {

        if(!userInfo.userName) {
            handleNotification(NOTIF_ERROR, userLangID, "Prosím vyplňte jméno", "Please enter username")
            return
        }

        if(!userInfo.email) {
            //TODO handleNotification(NOTIF_ERROR, userLangID, "Prosím zadejte email", "Please enter email")
            return
        }

        try {
            await handleUpdateUserData(userInfo)
            refreshUserData()
            handleNotification(NOTIF_SUCCESS, userInfo.language, "Uloženo", "Saved")
            setIsEdited(false)
        } catch (error) {
            handleNotification(NOTIF_ERROR, "", "Něco se pokazilo", "Something went wrong")
        } 
    }

    // TODO - Přidal loader
    if(!userData) {
        return <Loader wantFullSize={true} />
    }

  return (
    <section className="section-padding">

        <TopBar showMonthNavigator={false} showYearNavigator={false} />

        <Sidebar />

        <Avatars
            setIsEdited={setIsEdited}
            showAvatars={showAvatars}
            setUserInfo={setUserInfo}
            toggleAvatars={toggleAvatars}
        />

        <div className="flex flex-col lg:flex-row">

            <ProfileCard
                toggleAvatars={toggleAvatars}
                userInfo={userInfo}
                handleInputChange={handleInputChange}
            />

            <SettingsCard
                userInfo={userInfo}
                handleInputChange={handleInputChange}
            />

        </div>

        {/* Submit */}
        <button 
            className={`${ isEdited ? "button-green" : "button-green bg-colorGrayHover hover:bg-colorGrayHover"} w-[220px] mx-auto block mt-10`}
            disabled={!isEdited}
            onClick={handleSubmit}
        >
            {formatLang(userLangID, "Uložit změny", "Save changes")}
        </button>

    </section>
  )
}

export default Profile