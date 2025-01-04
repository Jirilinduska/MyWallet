import { useState } from "react"
import Button from "../../better_components/Common/Button/Button"
import { COLOR_GREEN, COLOR_RED } from "../../config/globals"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import Input from "../UI/Input/Input"
import { handleDeleteAccount, handleLogoutUser } from "../../API/Auth"
import { handleError } from "../../Errors/handleError"


interface DeleteAccountProps {
    toggleWindow: () => void
}

const DeleteAccount = ({ toggleWindow } : DeleteAccountProps ) => {


    const { userLangID } = useUserContext()

    const [password, setPassword] = useState("")
    const [areYouSure, setAreYouSure] = useState(false)

    // DELETE ACCOUNT
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            await handleDeleteAccount(password)
            handleLogoutUser()
        } catch (error) {  
            handleError(error, userLangID)
        }
    }

  return (
    <div className="fixed top-0 left-0 h-screen flex items-center justify-center w-full z-[50] bg-white p-4">

        <div className="w-full sm:w-[350px]">

            <h3 className="font-semibold text-lg mb-10">{formatLang(userLangID, "Odstranit účet", "Delete account")}</h3>

            <form onSubmit={handleSubmit} className="">

                <Input
                    inputName="password"
                    inputType="password"
                    labelFor="password"
                    labelValue={formatLang(userLangID, "Zadejte vaše heslo", "Enter your password")}
                    onChange={ (e) => setPassword(e.target.value) }
                    placeholder=""
                    value={password}
                    isPassword={true}
                    wantDarkText={true}
                />

                { areYouSure &&  
                    <>
                        <h3 className="font-semibold text-sm mb-4">{formatLang(userLangID, "Opravdu chcete odstranit svůj účet?", "Do you really want to delete your account?")}</h3>
                        <p className="text-red-500 text-xs font-semibold">{formatLang(userLangID, "Po odstranění účtu již nebude možné obnovit vaše data", "Once your account is deleted, your data cannot be restored")}</p>
                    </>
                }

                <div className="flex items-center gap-4 mt-6">
                    { !areYouSure && <Button color={COLOR_GREEN} loading={false} value={formatLang(userLangID, "Odstranit účet", "Delete account ")} buttonType="button" handleClick={ () => setAreYouSure(true) } /> }
                    { !areYouSure && <Button color={COLOR_RED} loading={false} value={formatLang(userLangID, "Zavřít", "Close")} buttonType="button" handleClick={toggleWindow} /> }

                    { areYouSure && <Button color={COLOR_GREEN} loading={false} value={formatLang(userLangID, "Ano, odstranit", "Yes, delete")} buttonType="submit" /> }
                    { areYouSure && <Button color={COLOR_RED} loading={false} value={formatLang(userLangID, "Zavřít", "Close")} buttonType="button" handleClick={toggleWindow} /> }
                </div>
            </form>
        </div>

    </div>
  )
}

export default DeleteAccount