import { useState } from "react"
import { IconEyeHide, IconEyeShow } from "../../../utils/icons/icons"
import { handleLoginUser, handleRegisterUser } from "../../../API/Auth"
import ButtonLoading from "../../UI/Loaders/ButtonLoading/ButtonLoading"
import { handleErrMsg } from "../../../utils/functions/handleErrMsg"

const AuthForm = () => {

    const [formData, setFormData] = useState({ userName: "", email: "", password: "" })
    const [showPass, setShowPass] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [errMsg, setErrMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSetErrMsg = (msg: string) => setErrMsg(msg)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData( (prev) => ({...prev, [name]: value}) )
    }

    const toggleLogin = () => {
        setIsLogin( (prev) => (!prev))
        setErrMsg("")
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setErrMsg("")
        setLoading(true)

        try {
            if(isLogin) {
                // Login user
                if(!formData.password) {
                    setErrMsg("Please fill your password")
                    setLoading(false)
                    return
                }
                await handleLoginUser(formData.email, formData.password)
            } else {
                // Register user
                if(!formData.userName) {
                    setErrMsg("Please fill your username")
                    setLoading(false)
                    return
                }
                if(!formData.password) {
                    setErrMsg("Please fill your password")
                    setLoading(false)
                    return
                }
                await handleRegisterUser(formData.userName, formData.email, formData.password)
            }
        } catch (err) {
            handleErrMsg(err, handleSetErrMsg)
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

        { errMsg && <p className="text-red-500 text-sm font-bold mb-6">{errMsg}</p> }

        { !isLogin && (
            <input 
                type="text" 
                className="input" 
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
            /> 
        )}

        <input 
            type="email" 
            required={true}
            className="input" 
            name="email"
            placeholder="Email adress"
            value={formData.email}
            onChange={handleChange}
        />


        <div className="relative">

            <input 
                type={ showPass ? "text" : "password"} 
                className="input" 
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <span className="absolute top-1/2 -translate-y-1/2 right-2 icon" onClick={() => setShowPass(!showPass)}>
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