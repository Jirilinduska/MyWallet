import { useState } from "react"
import { CURR_CZECH, CURR_DOLLAR, CURR_EURO, LANG_CZECH, LANG_ENGLISH } from "../../config/globals"

const NewUser = () => {

    const [stage, setStage] = useState(0)
    const [data, setData] = useState({ lang: "", curr: "" })

    const handleChangeLang = (value: string) => setData( {...data, lang: value} )
    const handleChangeCurrency = (value: string) => setData( {...data, curr: value} ) 
    const handleIncStage = () => setStage( (prev) => prev + 1)
    const handleDecStage = () => setStage( (prev) => prev - 1)

  return (
    <section className="h-screen flex items-center justify-center">

        <div className="bg-black w-[60%] h-[60%]">

            {/* Stage title */}
            <h3 className="text-white font-bold text-center my-6">
                { stage === 0 && "Select your language" }
                { stage === 1 && "Select your prefered currency" }
            </h3>

            {/* STAGE 0 - Select language */}
            { stage === 0 && (
                <div className="flex items-center justify-center gap-10 text-white">
                    <span className="" onClick={ () => handleChangeLang(LANG_CZECH)}>cz</span>
                    <span className="" onClick={ () => handleChangeLang(LANG_ENGLISH) }>en</span>
                </div>
            )}

            {/* STAGE 1 - Select currency */}
            { stage === 1 && (
                <div className="flex items-center justify-center gap-10 text-white">
                    <span className="" onClick={ () => handleChangeCurrency(CURR_CZECH)}>Koruny</span>
                    <span className="" onClick={ () => handleChangeCurrency(CURR_DOLLAR) }>Dollary</span>
                    <span className="" onClick={ () => handleChangeCurrency(CURR_EURO) }>Eura</span>
                </div>
            )}

            // TODO - STAGE 2 - Select avatar?
            // TODO - STAGE 3 - Confirm email?

            {/* Buttons */}
            <div className="my-10 flex items-center justify-center gap-10">
                <button className="button-blue" onClick={handleDecStage}>Back</button>
                <button className="button-green" onClick={handleIncStage}>Next</button>
            </div>

            {/* ProgressBar */}
            <div className="bg-white h-[10px] w-[50%] mx-auto">
                <span className={`${ 
                    stage === 0 ? "w-0"     : 
                    stage === 1 ? "w-[33%]" :
                    stage === 2 ? "w-[66%]" :  
                    stage === 3 ? "w-full" : "" } 
                bg-pink-400 h-full block`}>
                </span>
            </div>

        </div>

    </section>
  )
}

export default NewUser