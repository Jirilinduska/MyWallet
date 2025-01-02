import { ChangeEvent, useState } from "react"
import Button from "../../better_components/Common/Button/Button"
import { CHANGE_PASSWORD, COLOR_BLUE, COLOR_RED, FORGOTTEN_PASSWORD } from "../../config/globals"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import { userAvatars } from "../../utils/icons/avatars"
import { IUserDataUpdate } from "../../utils/interfaces/interfaces"
import Input from "../UI/Input/Input"
import HeadingSmall from "../HeadingSmall/HeadingSmall"
import ChangePassword from "../ChangePassword/ChangePassword"


interface ProfileCartProps {
    toggleAvatars: () => void
    userInfo: IUserDataUpdate
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const ProfileCart = ({ toggleAvatars, userInfo, handleInputChange } : ProfileCartProps ) => {

    const { userData, userLangID } = useUserContext()

    const [changeEmail, setChangeEmail] = useState(false)
    const [changePass, setChangPass] = useState(false)
    const [changeName, setChangeName] = useState(false)
    const [newPass, setNewPass] = useState(false)

    const toggleChangeEmail = () => setChangeEmail( prev => !prev )
    const toggleChangeName = () => setChangeName( prev => !prev )
    const toggleChangePass = () => setChangPass( prev => !prev)
    const toggleNewPass = () => setNewPass( prev => !prev)

  return (
    <div className="p-4 w-full lg:w-1/2">

        { changePass && <ChangePassword toggleWindow={toggleChangePass} useCase={CHANGE_PASSWORD}/> }

        { newPass    && <ChangePassword toggleWindow={toggleNewPass} useCase={FORGOTTEN_PASSWORD} /> }

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
                <span onClick={toggleAvatars} className="text-xs cursor-pointer">{formatLang(userLangID, "Změnit avatar", "Change avatar")}</span>
            </div>
        </div>

        {/* UserName */}
        <div className="mb-10">
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


                <button 
                    onClick={toggleChangeName} 
                    className="underline text-red-500 text-xs cursor-pointer"
                >
                    {formatLang(userLangID, "Změnit jméno", "Change username")}
                </button>
            </div>

        </div>

        {/* Email */}
        <div className="mb-12">
            <HeadingSmall value="Email" className="mb-2"/>

            <div className={`${ userData.settings.emailConfirmed ? "text-green-500" : "text-red-500" } mb-1 text-xs flex items-center gap-1`}>
                <p className="">{ userData.settings.emailConfirmed ? "Email confirmed" : "Please confirm your email - " }</p>
                {/* // TODO  - přidat confirm email */}
                { !userData.settings.emailConfirmed && <span className="cursor-pointer underline">send email</span> }
            </div>

            <div className="flex items-center justify-between">
                <p className="">{userInfo.email}</p>
                {/* // TODO - přidat change email :) - modal, be */}
                <button 
                    onClick={toggleChangeEmail} 
                    className="underline text-red-500 text-xs cursor-pointer"
                >
                    {formatLang(userLangID, "Změnit email", "Change email")}
                </button>
            </div>
        </div>

        {/* Password */}
        <div className="flex items-center gap-10">

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
                color={COLOR_RED} 
                loading={false}
                value={formatLang(userLangID, "Zapomenuté heslo", "Forgotten password")}
                buttonType="button"
                handleClick={toggleNewPass}
            />
        </div>

    </div>
  )
}

export default ProfileCart