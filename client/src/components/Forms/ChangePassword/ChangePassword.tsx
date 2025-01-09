import { useEffect, useState } from "react"
import Button from "../../UI/Button/Button"
import { CHANGE_PASSWORD, COLOR_GREEN, COLOR_RED, FORGOTTEN_PASSWORD, NOTIF_ERROR } from "../../../config/globals"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import Input from "../../UI/Input/Input"
import HeadingSmall from "../../UI/HeadingSmall/HeadingSmall"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { useAuthContext } from "../../../context/AuthContext"
import { handleInputChange } from "../../../utils/functions/inputUtils"

// TODO - Opravit + otestovat RESET FORGOTTEN PASSWORD

interface ChangePasswordProps {
    toggleWindow: () => void
    useCase: string
}

const ChangePassword = ({ toggleWindow, useCase } : ChangePasswordProps ) => {

    const { userLangID, userData } = useUserContext()
    const { changePassword, forgottenPassword, loading } = useAuthContext()

    const [email, setEmail] = useState("")
    const [codeSent, setCodeSent] = useState(false)
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        newPasswordAgain: ""
    })

    useEffect(() => {
        if(userData) {
            setEmail(userData.email)
        } else {
            setEmail("")
        }
    }, [] )

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        // Změna hesla - pokud uživatel zná své aktuální heslo
        if(useCase === CHANGE_PASSWORD) {
            if(password.newPassword !== password.newPasswordAgain) {
                handleNotification(NOTIF_ERROR, userLangID, "Nová hesla se musí shodovat", "New passwords must match")
                return
            }
            changePassword(password.currentPassword, password.newPassword)
        } 

        // Změna hesla - pokud uživatel nezná své aktuální heslo
        if(useCase === FORGOTTEN_PASSWORD) {
            forgottenPassword(email)
            setCodeSent(true)
        }

    }

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[70] bg-white flex flex-col gap-4 items-center justify-center border-gray-500 border-l-2">

        <h3 className="font-semibold text-lg animate-fadeIn">
            { useCase === CHANGE_PASSWORD
                ? formatLang(userLangID, "Změnit heslo", "Change password") 
                : formatLang(userLangID, "Zapomenuté heslo", "Forgotten passoword")
            }
        </h3>

        <form onSubmit={handleSubmit} className="w-full px-2 xs:w-3/4 sm:w-1/2 lg:max-w-[300px] animate-fadeIn">

            { useCase === CHANGE_PASSWORD && (

                <>
                    
                    <Input
                        inputName="currentPassword"
                        inputType="password"
                        labelFor="currentPassword"
                        labelValue={formatLang(userLangID, "Aktuální heslo", "Current password")}
                        onChange={ (e) => handleInputChange(e, setPassword) }
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
                        onChange={ (e) => handleInputChange(e, setPassword) }
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
                        onChange={ (e) => handleInputChange(e, setPassword) }
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

                    { codeSent && !loading && <p className="">{formatLang(userLangID, "Email byl odeslán", "Email has been sent")}</p> }
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