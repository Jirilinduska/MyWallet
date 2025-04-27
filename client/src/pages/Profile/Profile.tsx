import { ChangeEvent, useState } from "react"
import { useUserContext } from "../../context/UserContext"
import { NOTIF_ERROR, NOTIF_SUCCESS } from "../../config/globals"
import Avatars from "../../components/UI/Avatars/Avatars"
import { IUserDataUpdate } from "../../utils/interfaces/interfaces"
import { handleNotification } from "../../utils/functions/notificationsUtils"
import { formatLang } from "../../utils/functions/formatLang"
import TopBar from "../../components/Layout/TopBar/TopBar"
import Sidebar from "../../components/Layout/Sidebar/Sidebar"
import Loader from "../../components/UI/Loader/Loader"
import ProfileCard from "../../components/UI/ProfileCard/ProfileCard"
import SettingsCard from "../../components/UI/SettingsCard/SettingsCard"
import { useCompleteProfile } from "../../hooks/useCompleteProfile"
import { usePageTitle } from "../../hooks/usePageTitle"
import { Box, Button } from "@mui/material"

const Profile = () => {

    const { userData, userLangID, updateUserData } = useUserContext()

    useCompleteProfile()
    usePageTitle(formatLang(userLangID, "Profil", "Profile"))

    const [isEdited, setIsEdited] = useState(false)
    const [showAvatars, setShowAvatars] = useState(false)
    const [changeName, setChangeName] = useState(false)
    const [userInfo, setUserInfo] = useState<IUserDataUpdate>({
        userName: userData?.userName || "",
        email: userData?.email || "",
        currency: userData?.utils.currency || "",
        language: userData?.utils.language || "",
        avatarID: userData?.utils.avatarID || 0
    })

    const toggleAvatars = () => setShowAvatars( prev => !prev )
    const toggleChangeName = () => setChangeName( prev => !prev )

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

        updateUserData(userInfo)
        handleNotification(NOTIF_SUCCESS, userInfo.language, "Uloženo", "Saved")
        setChangeName(false)
        setIsEdited(false)
    }

    if(!userData) {
        return <Loader wantFullSize={true} />
    }

  return (
    <section className="section-padding min-h-full pb-10">

        <TopBar />

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
                changeName={changeName}
                toggleChangeName={toggleChangeName}
            />

            <SettingsCard
                userInfo={userInfo}
                handleInputChange={handleInputChange}
            />

        </div>

        {/* Submit */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
                color="success"
                variant="contained"
                onClick={handleSubmit}
                disabled={!isEdited}
                sx={{ width: 200 }}
            >
                {formatLang(userLangID, "Uložit změny", "Save changes")}
            </Button>
        </Box>

    </section>
  )
}

export default Profile