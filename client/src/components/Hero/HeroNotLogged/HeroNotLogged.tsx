import AuthForm from "../../Forms/AuthForm/AuthForm"


// TODO - Upravit UI!

const HeroNotLogged = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between lg:flex-row">


        <div className="flex items-center flex-col gap-10 justify-center h-[40%] w-full text-2xl">

            <h1 className="font-bold">My Wallet</h1>

            <ul className="text-base">
                <li className="">Track your spendings</li>
                <li className="">Build budget</li>
                <li className="">Finance manager</li>
            </ul>
        </div>

        <div className="bg-black w-full h-[60%] lg:w-[40%] lg:h-full flex items-center">
            <AuthForm/>
        </div>


    </div>
  )
}

export default HeroNotLogged