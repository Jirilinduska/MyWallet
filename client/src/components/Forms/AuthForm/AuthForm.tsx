import { useState } from "react"
import { IconEyeHide, IconEyeShow } from "../../../utils/icons/icons"
import { handleLoginUser, handleRegisterUser } from "../../../API/Auth"
import ButtonLoading from "../../UI/Loaders/ButtonLoading/ButtonLoading"
import Input from "../../UI/Input/Input"
import { NOTIF_ERROR } from "../../../config/globals"
import { handleNotification } from "../../../utils/functions/notificationsUtils"

const AuthForm = () => {

    const [formData, setFormData] = useState({ userName: "", email: "", password: "" })
    const [showPass, setShowPass] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)

    // TODO - refactor?
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData( (prev) => ({...prev, [name]: value}) )
    }

    const toggleLogin = () => setIsLogin( (prev) => (!prev))
    

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
                    // setErrMsg("Please fill your username")
                    handleNotification(NOTIF_ERROR, "", "Prosím vyplňte jméno", "Please enter your username")
                    setLoading(false)
                    return
                }
                await handleRegisterUser(formData.userName, formData.email, formData.password)
            }
        } catch (err) {
            handleNotification(NOTIF_ERROR, "", "Něco se pokazilo", "Something went wrong")
        } finally {
            setLoading(false)
        }
    }


  return (
    <form 
        onSubmit={handleSubmit} 
        className="w-full p-6"
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


        <div className="relative mb-10">

            <label 
                htmlFor="password"
                className="block mb-2 text-sm font-medium dark:text-white"
            >
                Password*
            </label>

            <input 
                type={ showPass ? "text" : "password"} 
                id="password"
                className="bg-gray-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-white focus:border-blue-500" 
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <span className="absolute top-1/2 -translate-y-1/2 right-2 icon text-white" onClick={() => setShowPass(!showPass)}>
                { showPass ? <IconEyeHide/> : <IconEyeShow/> }
            </span>

        </div>

        { loading 
            ? <ButtonLoading/>
            : (
                <button type="submit" className="button-green w-full flex items-center justify-center">
                    { isLogin ? "Login" : "Register" }
                </button>
            )
        }

        <div className="text-white text-sm lg:text-base flex items-center gap-4 mt-10">

            <p className="">{ isLogin ? "Not a member yet?" : "Already a member?" }</p>

            <span 
                className="underline cursor-pointer"
                onClick={toggleLogin}
            >
                { isLogin ? "Register now" : "Login now" }
            </span>

        </div>

    </form>
  )
}

export default AuthForm