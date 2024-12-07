import { ChangeEvent, useEffect, useState } from "react"
import { useUserContext } from "../../context/UserContext"
import { LANG_CZECH } from "../../config/globals"
import { Link } from "react-router-dom"
import { userAvatars } from "../../utils/icons/avatars"
import Input from "../../components/UI/Input/Input"
import SelectLanguage from "../../components/UI/Input/SelectLanguage/SelectLanguage"
import SelectCurrency from "../../components/UI/Input/SelectCurrency/SelectCurrency"
import { handleUpdateUserData } from "../../API/User"
import Avatars from "../../components/OffCanvas/Avatars/Avatars"
import { IUserDataUpdate } from "../../utils/interfaces/interfaces"
import NotifSuccess from "../../components/Notifications/NotifSuccess/NotifSuccess"

const Profile = () => {

    const { refreshUserData, userData, userLangID } = useUserContext()

    const [isEdited, setIsEdited] = useState(false)
    const [showAvatars, setShowAvatars] = useState(false)
    const [userInfo, setUserInfo] = useState<IUserDataUpdate>({
        userName: userData?.userName || "",
        email: userData?.email || "",
        currency: userData?.utils.currency || "",
        language: userData?.utils.language || "",
        avatarID: userData?.utils.avatarID || 0
    })

    useEffect(() => {
        refreshUserData()
    }, [] )

    useEffect(() => {
        if (userData) {
            setUserInfo({
                userName: userData.userName,
                email: userData.email,
                currency: userData.utils.currency,
                language: userData.utils.language,
                avatarID: userData.utils.avatarID
            });
        }
    }, [userData])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target
        setUserInfo( (prev) => ({
            ...prev,
            [name]: value
        }))
        setIsEdited(true)
    }

    const handleSubmit = async() => {
        
        try {
            const response = await handleUpdateUserData(userInfo)
            refreshUserData()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    // TODO - Přidal loader
    if(!userData) {
        return <p className="">Loading</p>
    }

  return (
    <section className="h-screen flex items-center justify-center">

        {/* Profile header */}
        <div className="fixed top-0 left-0 w-full h-[80px] bg-black flex items-center justify-end gap-2 py-10">
            <Link to="/" className="button-blue block">Home</Link>
            <Link to="/dashboard/overview" className="button-blue block">Dashboard</Link>
        </div>


        {/* UserCard */}
        <div className="w-1/2 mx-auto shadow-xl rounded-lg bg-black relative">
            
            <Avatars
                setIsEdited={setIsEdited}
                showAvatars={showAvatars}
                setUserInfo={setUserInfo}
                setShowAvatars={setShowAvatars}
            />

            <div className="bg-white h-[100px] relative rounded-t-lg">

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[100px] mb-10">
                
                    <img 
                        src={ userAvatars.find( (x) => x.id === userInfo.avatarID )?.imageSrc }
                        alt="user_avatar" 
                        className="cursor-pointer" 
                        onClick={ () => setShowAvatars( (prev) => !prev )}
                    />

                </div>


            </div>

            <div className="pt-[100px] px-6 mb-4">
                <Input
                    inputName="userName"
                    inputType="userName"
                    labelFor="userName"
                    labelValue={`${userLangID === LANG_CZECH ? "Uživatelské jméno" : "Username"}`}
                    onChange={handleInputChange}
                    placeholder="Your username"
                    value={userInfo.userName}
                />
            </div>

            <div className={`${ userData.settings.emailConfirmed ? "text-green-500" : "text-red-500" } mb-2 px-6 text-xs`}>
                <p className="">{ userData.settings.emailConfirmed ? "Email confirmed" : "Please confirm your email" }</p>
            </div>

            <div className="px-6 mb-4">
                <Input
                    inputName="email"
                    inputType="email"
                    labelFor="email"
                    labelValue="Email"
                    onChange={handleInputChange}
                    placeholder="Your email adress"
                    value={userInfo.email}
                />
            </div>

            {/* Select elemets */}
            <div className="flex items-center justify-between gap-10 px-6 mb-4">

                <SelectLanguage
                    value={userInfo.language}
                    handleChange={handleInputChange}  
                />

                <SelectCurrency
                    value={userInfo.currency}
                    handleChange={handleInputChange}
                />

            </div>

            <button 
                className={`${ isEdited ? "button-green" : "button-green bg-colorGrayHover hover:bg-colorGrayHover"} w-1/3 mx-auto block`}
                disabled={!isEdited}
                onClick={handleSubmit}
              >
                {userLangID === LANG_CZECH ? "Uložit" : "Save"}
            </button>

        </div>

        {/* // TODO - Dokončit notifikace */}
        {/* <NotifSuccess/> */}

    </section>
  )
}

export default Profile