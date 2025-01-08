import { useState } from "react"
import { COLOR_BLUE, COLOR_GREEN } from "../../../config/globals"
import { IconCard, IconChart, IconClose, IconWallet } from "../../../utils/icons/icons"
import Button from "../../UI/Button/Button"
import AuthForm from "../../Forms/AuthForm/AuthForm"
import { usePageTitle } from "../../../hooks/usePageTitle"


// TODO - Přidat forgotten password!

const HeroNotLogged = () => {

  const [isLogin, setIsLogin] = useState(true)
  const [showForm, setShowForm] = useState(false)

  usePageTitle("Log In")

  const toggleIsLogin = () => setIsLogin(!isLogin)
  const toggleForm = () => setShowForm(!showForm)

  return (
    <div className="w-full h-full flex flex-col items-center justify-center lg:justify-between lg:flex-row">

      { showForm && <IconClose onClick={toggleForm} className="icon fixed top-2 right-2 text-red-500 z-50 !text-4xl lg:hidden" /> }

      <div className="animate-fadeIn mx-auto p-4 flex flex-col items-center lg:block w-full text-2xl xs:px-10 sm:px-14 lg:px-20 lg:h-[40%]">

        <h1 className="font-merriweather mb-10 font-bold text-4xl xs:text-5xl lg:text-6xl">My Wallet</h1>

        <ul className="text-base space-y-6">

          <li className="flex items-center gap-4 text-base lg:text-xl">
            <IconWallet className="text-2xl text-colorBlue" />
            Organize your expenses
          </li>

          <li className="flex items-center gap-4 text-base lg:text-xl">
            <IconChart className="text-2xl text-colorBlue" />
            Plan your budgets with ease
          </li>

          <li className="flex items-center gap-4 text-base lg:text-xl">
            <IconCard className="text-2xl text-colorBlue" />
            Take control of your finances
          </li>

        </ul>

        <div className="mt-20 space-y-6 w-[230px] xs:space-y-4 lg:hidden">
          <Button
            color={COLOR_BLUE}
            loading={false}
            value="Register"
            handleClick={() => {
              setIsLogin(false)
              toggleForm()
            }}
          />
          <Button
            color={COLOR_GREEN}
            loading={false}
            value="Login"
            handleClick={() => {
              setIsLogin(true)
              toggleForm()
            }}
          />
        </div>
      </div>

      {showForm && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black lg:hidden animate-slideInRight">
          <AuthForm isLogin={isLogin} toggleIsLogin={toggleIsLogin} />
        </div>
      )}

      <div className="bg-black hidden lg:flex xl:w-[40%] lg:w-[50%] h-full items-center animate-slideInRight">
        <AuthForm isLogin={isLogin} toggleIsLogin={toggleIsLogin} />
      </div>

    </div>
  )
}

export default HeroNotLogged
