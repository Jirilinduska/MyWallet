import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { handleIsTokenValid, handleResetPassword } from "../../API/Auth"
import Loader from "../../components/UI/Loader/Loader"
import Input from "../../components/UI/Input/Input"
import HeadingSmall from "../../components/UI/HeadingSmall/HeadingSmall"
import Button from "../../components/UI/Button/Button"
import { COLOR_GREEN, NOTIF_ERROR, NOTIF_SUCCESS } from "../../config/globals"
import { handleNotification } from "../../utils/functions/notificationsUtils"

const ResetPassword = () => {

    const { token } = useParams()
    const navigate = useNavigate()

    const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordAgain, setNewPasswordAgain] = useState("")

    const handleReset = async(e: React.FormEvent) => {

        e.preventDefault()

        if(!newPassword || !newPasswordAgain) {
            handleNotification(NOTIF_ERROR, "", "", "Please enter all fields")
        }

        if(newPassword !== newPasswordAgain) {
            handleNotification(NOTIF_ERROR, "", "", "Passwords must match")
        }

        if(token) {
            try {
                await handleResetPassword(token, newPassword)
                handleNotification(NOTIF_SUCCESS, "", "", "Password has been reset")
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    useEffect(() => {

        const checkTokenValidity = async () => {

            if (!token) {
                setIsTokenValid(false)
                return
            }

            try {
                const response = await handleIsTokenValid(token)
                if (response.status !== 200) {
                    setIsTokenValid(false)
                }
            } catch (error) {
                setIsTokenValid(false)
            }
        }

        checkTokenValidity()
    }, [token])

    // if (!token) return <Navigate to="/" />
    
    if (isTokenValid === false) return <Navigate to="/" />
    if (isTokenValid === null) return <Loader wantFullSize={false} />
    // if (isTokenValid === null) return <Loader wantFullSize={false} />

    if(isTokenValid) return (
        <div className="">
            <p className="">Invalid token</p>
        </div>
    )

  return (
    <section className="h-screen flex items-center justify-center">

        <form onSubmit={handleReset} className="">

            <HeadingSmall value="New password" className="mb-2"/>

            <Input
                inputName="newPassword"
                inputType="text"
                labelFor=""
                labelValue=""
                onChange={ (e) => setNewPassword(e.target.value) }
                placeholder=""
                value={newPassword}
            />

            <HeadingSmall value="New password again" className="mb-2 mt-4" />

            <Input
                inputName="newPasswordAgain"
                inputType="text"
                labelFor=""
                labelValue=""
                onChange={ (e) => setNewPasswordAgain(e.target.value) }
                placeholder=""
                value={newPasswordAgain}
            />

            <div className="mt-6">
            
                <Button
                    color={COLOR_GREEN}
                    loading={false}
                    value="Save"
                    buttonType="submit"
                />

            </div>

        </form>

    </section>
  )
}

export default ResetPassword