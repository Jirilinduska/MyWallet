import { CURR_CZECH, CURR_DOLLAR, CURR_EURO, LANG_CZECH, LANG_ENGLISH } from "../../config/globals"
import { useState } from "react"
import { CzechFlag, USFlag } from "../../utils/icons/flags"
import ProgressBar from "../../components/CompleteProfile/ProgressBar/ProgressBar"
import { CurrencyIconCzech, CurrencyIconDollar, CurrencyIconEuro } from "../../utils/icons/currency"
import { userAvatars } from "../../utils/icons/avatars"
import ProgressBarFixed from "../../components/CompleteProfile/ProgressBarFixed/ProgressBarFixed"


// TODO - Upravit celkový UI komponenty, + přidat mobile settings
// TODO - Rozdělit "stages" do samostatných komponent

const NewUser = () => {

    const [stage, setStage] = useState(0)
    const [data, setData] = useState({ lang: "", curr: "", avatarID: 0 })

    const handleChangeLang = (value: string) => setData( (prev) => ({ ...prev, lang: value }) )
    const handleChangeCurrency = (value: string) => setData( (prev) => ({ ...prev, curr: value }) )
    const handleChangeAvatar = (value: number) => setData( (prev) => ({...prev, avatarID: value}) )
    const handleIncStage = () => setStage( (prev) => prev + 1)
    const handleDecStage = () => setStage( (prev) => prev - 1)

  return (
    <section className="h-screen flex items-center justify-center">

        <div className="bg-black w-[60%] h-[60%]">

            {/* Stage title */}
            <h3 className="text-white font-bold text-center my-6">
                { stage === 0 && "Select your language" }
                { stage === 1 && "Select your prefered currency" }
                { stage === 2 && "Select your avatar" }
                { stage === 3 && "Confirm your email adress" }
            </h3>

            {/* STAGE 0 - Select language */}
            { stage === 0 && (
                <div className="flex items-center justify-center gap-10 text-white h-[40%]">

                    <span 
                        className={`${ data.lang === LANG_CZECH && "bg-colorGreen" } py-4 px-6 rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`} 
                        onClick={ () => handleChangeLang(LANG_CZECH) }
                    >
                        <CzechFlag/>
                        <p className={`${ data.lang === LANG_CZECH ? "text-black" : "text-white" } mt-1`}>Czech</p>
                    </span>

                    <span 
                        className={`${ data.lang === LANG_ENGLISH && "bg-colorGreen" } py-4 px-6 rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`} 
                        onClick={ () => handleChangeLang(LANG_ENGLISH) }
                    >
                        <USFlag/>
                        <p className={`${ data.lang === LANG_ENGLISH ? "text-black" : "text-white" } mt-1`}>English</p>
                    </span>

                </div>
            )}

            {/* STAGE 1 - Select currency */}
            { stage === 1 && (
                <div className="flex items-center justify-center gap-10 text-white h-[40%]">

                    <span 
                        className={`${ data.curr === CURR_CZECH && "bg-colorGreen" } py-4 px-6 flex flex-col items-center justify-center rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`}
                        onClick={ () => handleChangeCurrency(CURR_CZECH) }
                    >
                        <CurrencyIconCzech/>
                        <p className={`${ data.curr === CURR_CZECH ? "text-black" : "text-white" } mt-1`}>CZK</p>
                    </span>

                    <span 
                        className={`${ data.curr === CURR_DOLLAR && "bg-colorGreen" } py-4 px-6 flex flex-col items-center justify-center rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`}
                        onClick={ () => handleChangeCurrency(CURR_DOLLAR) }
                    >
                        <CurrencyIconDollar/>
                        <p className={`${ data.curr === CURR_DOLLAR ? "text-black" : "text-white" } mt-1`}>USD</p>
                    </span>

                    <span 
                        className={`${ data.curr === CURR_EURO && "bg-colorGreen" } py-4 px-6 flex flex-col items-center justify-center rounded-full cursor-pointer border-2 border-colorGreen transition-all duration-300 ease-out`}
                        onClick={ () => handleChangeCurrency(CURR_EURO) }
                    >
                        <CurrencyIconEuro/>
                        <p className={`${ data.curr === CURR_EURO ? "text-black" : "text-white" } mt-1`}>EUR</p>
                    </span>
                </div>
            )}

            {/* STAGE 2 - Select avatar */}
            // TODO - Přidat rámečky pro avatary, selected - podobne jako u lang, currency....
            // TODO - Přidat flex-wrap
            { stage === 2 && (
                <div className="flex items-center justify-center gap-10 text-white h-[40%] w-[90%] mx-auto">

                    { userAvatars && userAvatars.map( (x) => {
                        return (
                            <div className="cursor-pointer" key={x.id} onClick={ () => handleChangeAvatar(x.id) }>
                                <img src={x.imageSrc} alt={x.title} className="" />
                            </div>
                        )
                    })}

                </div>
            )}
            // TODO - STAGE 3 - Confirm email?
            // TODO - Upravit UI - Tlačítko send email předělat :)
            { stage === 3 && (
                 <div className="flex items-center justify-center gap-10 text-white h-[40%] w-[90%] mx-auto"></div>
            )}

            {/* Buttons */}
            <div className="my-10 flex items-center justify-center gap-10">
                <button className={`${ stage === 0 && "hidden" } button-blue`} onClick={handleDecStage}>Back</button>
                <button className={`${ stage >= 3 && "hidden" } button-green`} onClick={handleIncStage}>Next</button>
                <button className={`${ stage !== 3 && "hidden" } button-green`}>Send me an email</button>
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