import { ChangeEvent, useEffect, useState } from "react"
import { useUserContext } from "../../context/UserContext"
import { LANG_CZECH } from "../../config/globals"
import { IconEdit } from "../../utils/icons/icons"
import { Link } from "react-router-dom"
import { userAvatars } from "../../utils/icons/avatars"
import Input from "../../components/UI/Input/Input"
import SelectLanguage from "../../components/UI/Input/SelectLanguage/SelectLanguage"

const Profile = () => {

    const { refreshUserData, userData, userLangID } = useUserContext()


    const [userInfo, setUserInfo] = useState({
        userName: userData.userName,
        email: userData.email,
        currency: userData.utils.currency,
        language: userData.utils.language
    })

    const [edit, setEdit] = useState({
        userName: false,
        email: false
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target
        setUserInfo( (prev) => ({
            ...prev,
            [name]: value
        }))
    }

    console.log(userData)

    useEffect(() => {
        if(!userData) refreshUserData()
    }, [])

  return (
    <section className="h-screen flex items-center justify-center">

        {/* Profile header */}
        <div className="fixed top-0 left-0 w-full h-[80px] bg-black flex items-center justify-end gap-2 py-10">
            <Link to="/" className="button-blue block">Home</Link>
            <Link to="/dashboard/overview" className="button-blue block">Dashboard</Link>
        </div>


        {/* UserCard */}
        <div className="w-1/2 mx-auto shadow-xl rounded-lg bg-black">

            <div className="bg-white h-[100px] relative rounded-t-lg">

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[100px] mb-10">
                
                    <img 
                        src={ userAvatars.find( (x) => x.id === userData.utils.avatarID )?.imageSrc }
                        alt="user_avatar" 
                        className="" 
                    />

                </div>

            </div>

            <div className="pt-[100px] px-6 mb-4">
                <Input
                    inputName="userName"
                    inputType="userName"
                    labelFor="userName"
                    labelValue={`${userLangID === LANG_CZECH ? "Uživatelské jméno" : "Username"}`}
                    onChange={handleInputChange}
                    placeholder="Your username"
                    value={userInfo.userName}
                />
            </div>

            <div className={`${ userData.settings.emailConfirmed ? "text-green-500" : "text-red-500" } mb-2 px-6 text-xs`}>


                <p className="">{ userData.settings.emailConfirmed ? "Email confirmed" : "Please confirm your email" }</p>
            </div>

            <div className="px-6 mb-4">
                <Input
                    inputName="email"
                    inputType="email"
                    labelFor="email"
                    labelValue="Email"
                    onChange={handleInputChange}
                    placeholder="Your email adress"
                    value={userInfo.email}
                />
            </div>

            {/* Select elemets */}
            <div className="flex items-center justify-between px-6 mb-4">

                <SelectLanguage
                    value={userInfo.language}
                    handleChange={handleInputChange}  
                />

            </div>


        </div>

    </section>
  )
}

export default Profile