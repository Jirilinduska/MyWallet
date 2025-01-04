import { ChangeEvent, useState } from "react"
import Button from "../../better_components/Common/Button/Button"
import { CHANGE_PASSWORD, COLOR_GREEN, COLOR_RED, FORGOTTEN_PASSWORD, NOTIF_ERROR, NOTIF_SUCCESS } from "../../config/globals"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import Input from "../UI/Input/Input"
import HeadingSmall from "../HeadingSmall/HeadingSmall"
import { handleNotification } from "../../utils/functions/notificationsUtils"
import { handleChangePassword, handleForgottenPassword } from "../../API/Auth"
import { handleError } from "../../Errors/handleError"

interface ChangePasswordProps {
    toggleWindow: () => void
    useCase: string
}

const ChangePassword = ({ toggleWindow, useCase } : ChangePasswordProps ) => {

    const { userLangID, userData } = useUserContext()

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        newPasswordAgain: ""
    })

    const [email, setEmail] = useState(userData.email)
    const [codeSent, setCodeSent] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setPassword({
            ...password,
            [name]: value
        })
    }

    const handleSubmit = async(e: React.FormEvent) => {

        e.preventDefault()

        setLoading(true)

        if(useCase === CHANGE_PASSWORD) {
            if(password.newPassword !== password.newPasswordAgain) {
                handleNotification(NOTIF_ERROR, userLangID, "Nová hesla se musí shodovat", "New passwords must match")
                return
            }
        }

        try {

            if(useCase === CHANGE_PASSWORD) {
                await handleChangePassword(password.currentPassword, password.newPassword, password.newPasswordAgain)
                handleNotification(NOTIF_SUCCESS, userLangID, "Vaše heslo bylo úspěšně změněno", "Your password has been successfully changed")
                toggleWindow()
            }

            if(useCase === FORGOTTEN_PASSWORD) {
                await handleForgottenPassword(email)
                setCodeSent(true)
                handleNotification(NOTIF_SUCCESS, userLangID, "Email byl odeslán", "Email has been sent")
            }

        } catch (error) {
            handleError(error, userLangID)
            console.log(error)
        } finally {
            setLoading(false)
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
                    
                    <Input
                        inputName="currentPassword"
                        inputType="password"
                        labelFor="currentPassword"
                        labelValue={formatLang(userLangID, "Aktuální heslo", "Current password")}
                        onChange={handleInputChange}
                        placeholder=""
                        value={password.currentPassword}
                        isPassword={true}
                        wantDarkText={true}
                    />

                    <Input
                        inputName="newPassword"
                        inputType="password"
                        labelFor="newPassword"
                        labelValue={formatLang(userLangID, "Nové heslo", "New password")}
                        onChange={handleInputChange}
                        placeholder=""
                        value={password.newPassword}
                        isPassword={true}
                        wantDarkText={true}
                    />

                    <Input
                        inputName="newPasswordAgain"
                        inputType="password"
                        labelFor="newPasswordAgain"
                        labelValue={formatLang(userLangID, "Nové heslo znovu", "New password again")}
                        onChange={handleInputChange}
                        placeholder=""
                        value={password.newPasswordAgain}
                        isPassword={true}
                        wantDarkText={true}
                    />
                </>
            )}

            { useCase === FORGOTTEN_PASSWORD && (
                <>
                    { !codeSent && <HeadingSmall value={formatLang(userLangID, "Zadejte váš email", "Enter email adress")} className="mb-2" /> }

                    { !codeSent && 
                        <Input
                            inputName="email"
                            inputType="email"
                            labelFor=""
                            labelValue=""
                            onChange={( (e) => setEmail(e.target.value) )}
                            placeholder=""
                            value={email}
                        />
                    }

                    { codeSent && <p className="">{formatLang(userLangID, "Email byl odeslán", "Email has been sent")}</p> }
                </>
            )}

            <div className="flex items-center gap-4 mt-6 w-full">

                { !codeSent &&  
                    <Button 
                        color={COLOR_GREEN} 
                        loading={loading} 
                        value={
                            useCase === CHANGE_PASSWORD 
                                ? formatLang(userLangID, "Změnit", "Change") 
                                : useCase === FORGOTTEN_PASSWORD 
                                ? formatLang(userLangID, "Odeslat", "Send") 
                                : ""
                        }
                        buttonType="submit" 
                    />
                }

                <Button 
                    color={COLOR_RED}   
                    loading={loading} 
                    value={
                        codeSent
                            ? formatLang(userLangID, "Zavřít", "Close")
                            : formatLang(userLangID, "Zrušit", "Cancel")
                    } 
                    handleClick={toggleWindow} 
                    buttonType="button" 
                />

            </div>

        </form>

    </div>
  )
}

export default ChangePassword