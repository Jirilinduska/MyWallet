import { useState } from "react"
import { IconEyeHide, IconEyeShow } from "../../../utils/icons/icons"
import { handleLoginUser, handleRegisterUser } from "../../../API/Auth"
import Input from "../../../components/UI/Input/Input"
import { COLOR_GREEN, LANG_ENGLISH, NOTIF_ERROR } from "../../../config/globals"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import Button from "../../Common/Button/Button"
import { handleError } from "../../../Errors/handleError"

interface AuthFormProps {
    isLogin: boolean
    toggleIsLogin: () => void
}

const AuthForm = ({ isLogin, toggleIsLogin } : AuthFormProps ) => {

    const [formData, setFormData] = useState({ userName: "", email: "", password: "" })
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)

    // TODO - refactor?
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData( (prev) => ({...prev, [name]: value}) )
    }    

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            
            if(!formData.email) {
                handleNotification(NOTIF_ERROR, "", "Prosím vyplňte heslo", "Please enter your email")
                setLoading(false)
                return
            }

            if(!formData.password) {
                handleNotification(NOTIF_ERROR, "", "Prosím vyplňte heslo", "Please enter your password")
                setLoading(false)
                return
            }

            if(isLogin) {
                // Login user
                await handleLoginUser(formData.email, formData.password)
            } else {
                // Register user
                if(!formData.userName) {
                    handleNotification(NOTIF_ERROR, "", "Prosím vyplňte jméno", "Please enter your username")
                    setLoading(false)
                    return
                }
                await handleRegisterUser(formData.userName, formData.email, formData.password)
            }
        } catch (err) {
            handleError(err, LANG_ENGLISH)
        } finally {
            setLoading(false)
        }
    }


  return (
    <form 
        onSubmit={handleSubmit} 
        className="w-full p-6 h-full flex flex-col justify-center lg:block lg:h-auto"
    >

        <h3 className="font-bold text-white mb-10 text-xl">
            { isLogin ? "Login now" : "Register now" }
        </h3>


        { !isLogin && (
            <div className="mb-4">
                <Input
                    inputName="userName"
                    inputType="text"
                    labelFor="userName"
                    labelValue="Username*"
                    onChange={handleChange}
                    placeholder="Your username"
                    value={formData.userName}
                />
            </div>
        )}

        <div className="mb-4">
            <Input 
                inputName="email"
                inputType="email"
                labelFor="email"
                labelValue="Email adress*"
                onChange={handleChange}
                placeholder="Your email adress"
                value={formData.email}
            />
        </div>

        <Input
            inputName="password"
            inputType="password"
            labelFor="password"
            labelValue="Password*"
            onChange={handleChange}
            placeholder="Password"
            value={formData.password}
            isPassword={true}
        />

        <Button 
            color={COLOR_GREEN} 
            loading={loading} 
            value={ isLogin ? "Login" : "Register" }
            buttonType="submit"
        />

        <div className="hidden text-white text-sm lg:text-base items-center gap-4 mt-10 lg:flex">

            <p className="">{ isLogin ? "Not a member yet?" : "Already a member?" }</p>

            <span className="underline cursor-pointer" onClick={toggleIsLogin}>
                { isLogin ? "Register now" : "Login now" }
            </span>

        </div>

    </form>
  )
}

export default AuthForm