import { useState } from "react"
import Input from "../../../components/UI/Input/Input"
import { COLOR_GREEN } from "../../../config/globals"
import Button from "../../Common/Button/Button"
import { useAuthContext } from "../../../context/AuthContext"
import { handleInputChange } from "../../../utils/functions/inputUtils"

interface AuthFormProps {
    isLogin: boolean
    toggleIsLogin: () => void
}

const AuthForm = ({ isLogin, toggleIsLogin } : AuthFormProps ) => {

    const { loading, loginUser, registerUser } = useAuthContext()

    const [formData, setFormData] = useState({ userName: "", email: "", password: "" })

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        if(isLogin) {
            loginUser(formData.email, formData.password)
        } else {
            registerUser(formData.userName, formData.email, formData.password)
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
                    onChange={ (e) => handleInputChange(e, setFormData) }
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
                onChange={ (e) => handleInputChange(e, setFormData) }
                placeholder="Your email adress"
                value={formData.email}
            />
        </div>

        <Input
            inputName="password"
            inputType="password"
            labelFor="password"
            labelValue="Password*"
            onChange={ (e) => handleInputChange(e, setFormData) }
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

        <div className="hidden text-white text-sm lg:text-base items-center gap-4 my-10 lg:flex">

            <p className="">{ isLogin ? "Not a member yet?" : "Already a member?" }</p>

            <span className="underline cursor-pointer hover:text-colorGreen" onClick={toggleIsLogin}>
                { isLogin ? "Register now" : "Login now" }
            </span>
        </div>

    </form>
  )
}

export default AuthForm