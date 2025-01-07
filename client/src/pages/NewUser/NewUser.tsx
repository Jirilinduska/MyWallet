import { CURR_CZECH, CURR_DOLLAR, CURR_EURO, LANG_CZECH, LANG_ENGLISH } from "../../config/globals"
import { useState } from "react"
import { CzechFlag, USFlag } from "../../utils/icons/flags"
import ProgressBar from "../../components/CompleteProfile/ProgressBar/ProgressBar"
import { CurrencyIconCzech, CurrencyIconDollar, CurrencyIconEuro } from "../../utils/icons/currency"
import { userAvatars } from "../../utils/icons/avatars"
import ProgressBarFixed from "../../components/CompleteProfile/ProgressBarFixed/ProgressBarFixed"
import { ICompleteProfileData } from "../../utils/interfaces/interfaces"
import { handleCompleteProfile } from "../../API/User"
import { useUserContext } from "../../context/UserContext"
import { Navigate } from "react-router-dom"
import { formatLang } from "../../utils/functions/formatLang"


// TODO - Rozdělit "stages" do samostatných komponent


// TODO - Opravit, aby kdyýž není vyplněná current stage => zabránít odeslání na FE (inc stage)!!!

const NewUser = () => {

    const { userData } = useUserContext()

    const [stage, setStage] = useState(0)
    const [data, setData] = useState<ICompleteProfileData>({ lang: "", curr: "", avatarID: 0 })

    const handleChangeLang = (value: string) => setData( (prev) => ({ ...prev, lang: value }) )
    const handleChangeCurrency = (value: string) => setData( (prev) => ({ ...prev, curr: value }) )
    const handleChangeAvatar = (value: number) => setData( (prev) => ({...prev, avatarID: value}) )
    const handleIncStage = () => setStage( (prev) => prev + 1)
    const handleDecStage = () => setStage( (prev) => prev - 1)

    if(userData) {
        if(userData.settings.profileCompleted) {
            return <Navigate to="/"/>
        }
    }

  return (
    <section className="h-screen flex items-center justify-center">

        <div className="w-full md:w-[60%] md:h-[60%]">

            {/* Stage title */}
            <h3 className="font-semibold text-center my-6">
                { stage === 0 && formatLang(data.lang, "Vyberte jazyk", "Select your language") }
                { stage === 1 && formatLang(data.lang, "Zvolte preferovanou měnu", "Select prefered currency") }
                { stage === 2 && formatLang(data.lang, "Vyberte si avatar", "Select your avatar") }
                { stage === 3 && formatLang(data.lang, "Potvrďte svůj email", "Confirm your email adress") }
            </h3>

            {/* STAGE 0 - Select language */}
            { stage === 0 && (
                <div className="flex items-center justify-center gap-10 text-white h-[40%] flex-col xs:flex-row">

                    <span 
                        className={`${ data.lang === LANG_CZECH && "bg-colorGreen" } py-4 px-6 rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`} 
                        onClick={ () => handleChangeLang(LANG_CZECH) }
                    >
                        <CzechFlag/>
                        <p className="text-black mt-1">Čeština</p>
                    </span>

                    <span 
                        className={`${ data.lang === LANG_ENGLISH && "bg-colorGreen" } py-4 px-6 rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`} 
                        onClick={ () => handleChangeLang(LANG_ENGLISH) }
                    >
                        <USFlag/>
                        <p className="text-black mt-1">English</p>
                    </span>

                </div>
            )}

            {/* STAGE 1 - Select currency */}
            { stage === 1 && (
                <div className="flex items-center justify-center gap-10 text-white h-[40%] flex-col xs:flex-row">

                    <span 
                        className={`${ data.curr === CURR_CZECH && "bg-colorGreen" } py-4 px-6 flex flex-col items-center justify-center rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`}
                        onClick={ () => handleChangeCurrency(CURR_CZECH) }
                    >
                        <CurrencyIconCzech/>
                        <p className="text-black mt-1">CZK</p>
                    </span>

                    <span 
                        className={`${ data.curr === CURR_DOLLAR && "bg-colorGreen" } py-4 px-6 flex flex-col items-center justify-center rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`}
                        onClick={ () => handleChangeCurrency(CURR_DOLLAR) }
                    >
                        <CurrencyIconDollar/>
                        <p className="text-black mt-1">USD</p>
                    </span>

                    <span 
                        className={`${ data.curr === CURR_EURO && "bg-colorGreen" } py-4 px-6 flex flex-col items-center justify-center rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`}
                        onClick={ () => handleChangeCurrency(CURR_EURO) }
                    >
                        <CurrencyIconEuro/>
                        <p className="text-black mt-1">EUR</p>
                    </span>
                </div>
            )}

            {/* STAGE 2 - Select avatar */}
            { stage === 2 && (
                <div className="flex items-center justify-center flex-wrap gap-10 text-white h-[40%] w-[90%] mx-auto">

                    { userAvatars && userAvatars.map( (x) => {
                        return (
                            <div 
                                className={`${ data.avatarID === x.id && "ring-4 ring-green-500 rounded-full" } cursor-pointer w-[80px]`} 
                                key={x.id} 
                                onClick={ () => handleChangeAvatar(x.id) }
                            >
                                <img src={x.imageSrc} alt={x.title} className="" />
                            </div>
                        )
                    })}

                </div>
            )}
            {/* // TODO - STAGE 3 - Confirm email? */}
            {/* // TODO - Upravit UI - Tlačítko send email předělat :) */}
            { stage === 3 && (
                 <div className="flex items-center justify-center gap-10 h-[40%] w-[90%] mx-auto">
                    <p className="">Please check your email adress.</p>
                 </div>
            )}

            {/* Buttons */}
            <div className="my-10 flex items-center justify-center gap-10">
                
                <button className={`${ (stage === 0 || stage === 3)&& "hidden" } button-blue`} onClick={handleDecStage}>{formatLang(data.lang, "Zpět", "Back")}</button>

                <button 
                    className={`${ stage >= 3 && "hidden" } button-green`} 
                    onClick={ () => {
                        if(stage !== 2) handleIncStage()
                        if(stage === 2) {
                            handleCompleteProfile(data)
                            handleIncStage()
                        }
                    }}
                >
                    { stage === 2 && formatLang(data.lang, "Uložit", "Save") }
                    { stage !== 2 && formatLang(data.lang, "Další", "Next") }
                </button>
                
            </div>

            {/* Progress Bar */}
            <ProgressBar stage={stage} />


            {/* Fixed Progress Bar */}
            <ProgressBarFixed data={data} />

        </div>

    </section>
  )
}

export default NewUser