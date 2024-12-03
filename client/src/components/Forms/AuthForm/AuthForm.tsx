import { useState } from "react"
import { IconEyeHide, IconEyeShow } from "../../../utils/icons/icons"
import { handleLoginUser, handleRegisterUser } from "../../../API/Auth"

const AuthForm = () => {

    const [formData, setFormData] = useState({ userName: "", email: "", password: "" })
    const [showPass, setShowPass] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [errMsg, setErrMsg] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData( (prev) => ({...prev, [name]: value}) )
    }

    const toggleLogin = () => {
        setIsLogin( (prev) => (!prev))
        setErrMsg("")
    }

    // TODO HandleSubmit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrMsg("")

        // Login user
        if(isLogin) {
            if(!formData.password) setErrMsg("Please fill your password")
            const data = handleLoginUser(formData.email, formData.password)
            console.log("Login successful:", data)
            setFormData({ userName: "", email: "", password: "" })
        } else {
            // Register user
            if(!formData.userName) setErrMsg("Please fill your username")
            if(!formData.password) setErrMsg("Please fill your password")
            const data = handleRegisterUser(formData.userName, formData.email, formData.password)
            console.log("Register successful:", data)
            setFormData({ userName: "", email: "", password: "" })
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

        <button type="submit" className="button-green w-full mb-10">
            { isLogin ? "Login" : "Register" }
        </button>

        <div className="text-white text-sm lg:text-base flex items-center gap-4">

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