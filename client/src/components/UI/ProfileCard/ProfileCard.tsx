import { ChangeEvent, useState } from "react"
import Button from "../Button/Button"
import { CHANGE_PASSWORD, COLOR_BLUE, COLOR_RED, FORGOTTEN_PASSWORD, NOTIF_INFO } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { userAvatars } from "../../../utils/icons/avatars"
import { IUserDataUpdate } from "../../../utils/interfaces/interfaces"
import Input from "../Input/Input"
import HeadingSmall from "../HeadingSmall/HeadingSmall"
import ChangePassword from "../../Forms/ChangePassword/ChangePassword"
import { IconClose } from "../../../utils/icons/icons"
import DeleteAccount from "../DeleteAccount/DeleteAccount"
import { handleSendMeConfirmLink } from "../../../API/Auth"
import { handleNotification } from "../../../utils/functions/notificationsUtils"


interface ProfileCartProps {
    toggleAvatars: () => void
    userInfo: IUserDataUpdate
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    changeName: boolean
    toggleChangeName: () => void
}

const ProfileCard = ({ toggleAvatars, userInfo, handleInputChange, changeName, toggleChangeName } : ProfileCartProps ) => {

    const { userData, userLangID } = useUserContext()

    const [changePass, setChangPass] = useState(false)
    // const [changeName, setChangeName] = useState(false)
    const [deleteAcc, setDeleteAcc] = useState(false)
    const [newPass, setNewPass] = useState(false)

    // const toggleChangeName = () => setChangeName( prev => !prev )
    const toggleChangePass = () => setChangPass( prev => !prev)
    const toggleDeleteAcc  = () => setDeleteAcc(!deleteAcc)
    const toggleNewPass = () => setNewPass( prev => !prev)

    const token = localStorage.getItem("token")

    const handleSendMeLinkForEmail = async() => {
        if(token) {
            await handleSendMeConfirmLink(token)
            handleNotification(NOTIF_INFO, userLangID, "Email odeslán", "Email has been sent")
        } else {
            return
        }
    }

  return (
    <div className="p-4 w-full lg:w-1/2">

        { changePass && <ChangePassword toggleWindow={toggleChangePass} useCase={CHANGE_PASSWORD}/> }
        { newPass    && <ChangePassword toggleWindow={toggleNewPass} useCase={FORGOTTEN_PASSWORD} /> }
        { deleteAcc  && <DeleteAccount toggleWindow={toggleDeleteAcc}/> }

        <HeadingSmall value="Avatar" className="mb-4"/>

        {/* Avatar */}
        <div className="flex items-center gap-10 mb-10">
            <div className="w-[70px] ring-2 ring-black rounded-full">
                <img 
                    src={ userAvatars.find( (x) => x.id === userInfo.avatarID )?.imageSrc }
                    alt="user_avatar" 
                    className="w-full" 
                />
            </div>

            <div className="">
                <span onClick={toggleAvatars} className="text-xs cursor-pointer underline hover:text-colorBlue">{formatLang(userLangID, "Změnit avatar", "Change avatar")}</span>
            </div>
        </div>

        {/* UserName */}
        <div className="mb-10 border-b-2 border-b-gray-500 pb-2">

            <HeadingSmall value={formatLang(userLangID, "Uživatelské jméno", "Username")} className="mb-2"/>

            <div className="flex items-center justify-between">

                { changeName  
                    ?   <Input
                            inputName="userName"
                            inputType="text"
                            labelFor="userName"
                            labelValue=""
                            onChange={handleInputChange}
                            placeholder="Your username"
                            value={userInfo.userName}
                        />
                    :    <p className="">{userInfo.userName}</p>
                }

                <span 
                    onClick={toggleChangeName} 
                    className={`${ changeName ? "text-2xl" : "underline text-xs" } text-red-500 cursor-pointer`}
                > 
                    { changeName ? <IconClose/> : formatLang(userLangID, "Změnit jméno", "Change username") } 
                </span>

            </div>

        </div>

        {/* Email */}
        <div className="mb-12 border-b-2 border-b-gray-500 pb-2">
            <HeadingSmall value="Email" className="mb-2"/>

            <div className={`${ userData.settings.emailConfirmed ? "text-green-500" : "text-red-500" } mb-1 text-xs flex items-center gap-1`}>
                <p className="">{ userData.settings.emailConfirmed ? "Email confirmed" : "Please confirm your email - " }</p>
                { !userData.settings.emailConfirmed && <span onClick={handleSendMeLinkForEmail} className="cursor-pointer underline">send email</span> }
            </div>

            <p className="">{userInfo.email}</p>
        </div>

        {/* Password + Delete acc*/}
        <div className="flex items-center gap-4 flex-col sm:flex-row">

            {/* Změnit heslo */}
            <Button 
                color={COLOR_BLUE} 
                loading={false}
                value={formatLang(userLangID, "Změnit heslo", "Change password")}
                buttonType="button"
                handleClick={toggleChangePass}
            />

            {/* Zapomenuté heslo */}
            <Button 
                color={COLOR_BLUE} 
                loading={false}
                value={formatLang(userLangID, "Zapomenuté heslo", "Forgotten password")}
                buttonType="button"
                handleClick={toggleNewPass}
            />

            {/* Zrušit účet */}
            <Button 
                color={COLOR_RED} 
                loading={false}
                value={formatLang(userLangID, "Odstranit účet", "Delete account ")}
                buttonType="button"
                handleClick={toggleDeleteAcc}
            />

        </div>

    </div>
  )
}

export default ProfileCard