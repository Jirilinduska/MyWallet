import { IconChart, IconPiggyBank, IconWallet } from "../../../utils/icons/icons"
import AuthForm from "../../Forms/AuthForm/AuthForm"


// TODO - Upravit UI!

const HeroNotLogged = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between lg:flex-row">

        <div className="flex items-start flex-col gap-10 justify-start h-[40%] w-full text-2xl px-20">

            <h1 className="font-merriweather font-bold text-5xl">My Wallet</h1>

            <ul className="text-base">
              
              <li className="flex items-center gap-2 mb-4">
                <IconWallet className="text-2xl text-colorBlue" /> Organize your expenses
              </li>

              <li className="flex items-center gap-2 mb-4">
                <IconChart className="text-2xl text-colorBlue" /> Plan your budgets with ease
              </li>

              <li className="flex items-center gap-2">
                <IconPiggyBank className="text-2xl text-colorBlue" /> Take control of your finances every day
              </li>
            </ul>

        </div>

        <div className="bg-black w-full h-[60%] lg:w-[40%] lg:h-full flex items-center">
            <AuthForm/>
        </div>


    </div>
  )
}

export default HeroNotLogged