import { ChangeEvent, useState } from "react"
import Button from "../../better_components/Common/Button/Button"
import { CHANGE_PASSWORD, COLOR_GREEN, COLOR_RED, NOTIF_ERROR, NOTIF_SUCCESS } from "../../config/globals"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import Input from "../UI/Input/Input"
import HeadingSmall from "../HeadingSmall/HeadingSmall"
import { handleNotification } from "../../utils/functions/notificationsUtils"
import { handleChangePassword } from "../../API/Auth"
import { handleError } from "../../Errors/handleError"

interface ChangePasswordProps {
    toggleWindow: () => void
    useCase: string
}

const ChangePassword = ({ toggleWindow, useCase } : ChangePasswordProps ) => {

    const { userLangID } = useUserContext()

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        newPasswordAgain: ""
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setPassword({
            ...password,
            [name]: value
        })
    }

    const handleSubmit = async(e: React.FormEvent) => {

        e.preventDefault()

        if(password.newPassword !== password.newPasswordAgain) {
            handleNotification(NOTIF_ERROR, userLangID, "Nová hesla se musí shodovat", "New passwords must match")
            return
        }

        try {
            await handleChangePassword(password.currentPassword, password.newPassword, password.newPasswordAgain)
            handleNotification(NOTIF_SUCCESS, userLangID, "Vaše heslo bylo úspěšně změněno", "Your password has been successfully changed")
            toggleWindow()
        } catch (error) {
            handleError(error, userLangID)
        }
    }

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[70] bg-white flex flex-col gap-4 items-center justify-center">

        <h3 className="font-semibold text-lg">
            { useCase === CHANGE_PASSWORD
                ? formatLang(userLangID, "Změnit heslo", "Change password") 
                : formatLang(userLangID, "Zapomenuté heslo", "Forgotten passoword")
            }
        </h3>

        <form onSubmit={handleSubmit} className="w-full px-2 xs:w-3/4 sm:w-1/2 lg:max-w-[300px]">

            { useCase === CHANGE_PASSWORD && (

                <>
                    <HeadingSmall value={formatLang(userLangID, "Aktuální heslo", "Current password")} className="mb-2" />
                    
                    <Input
                        inputName="currentPassword"
                        inputType="text"
                        labelFor=""
                        labelValue=""
                        onChange={handleInputChange}
                        placeholder=""
                        value={password.currentPassword}
                    />

                    <HeadingSmall value={formatLang(userLangID, "Nové heslo", "New password")} className="mb-2 mt-4" />

                    <Input
                        inputName="newPassword"
                        inputType="text"
                        labelFor=""
                        labelValue=""
                        onChange={handleInputChange}
                        placeholder=""
                        value={password.newPassword}
                    />

                    <HeadingSmall value={formatLang(userLangID, "Nové heslo znovu", "New password again")} className="mb-2 mt-4" />

                    <Input
                        inputName="newPasswordAgain"
                        inputType="text"
                        labelFor=""
                        labelValue=""
                        onChange={handleInputChange}
                        placeholder=""
                        value={password.newPasswordAgain}
                    />
                </>
            )}

            <div className="flex items-center gap-4 mt-6 w-full">
                <Button color={COLOR_GREEN} loading={false} value={formatLang(userLangID, "Změnit", "Change")} buttonType="submit" />
                <Button color={COLOR_RED}   loading={false} value={formatLang(userLangID, "Zrušit", "Cancel")} handleClick={toggleWindow} buttonType="button" />
            </div>

        </form>

    </div>
  )
}

export default ChangePassword