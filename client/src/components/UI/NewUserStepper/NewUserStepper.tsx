import { Box, Button, Container, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material"
import { useState } from "react"
import { formatLang } from "../../../utils/functions/formatLang"
import { CzechFlag, USFlag } from "../../../utils/icons/flags"
import { CURR_CZECH, CURR_DOLLAR, CURR_EURO, LANG_CZECH, LANG_ENGLISH, NOTIF_ERROR } from "../../../config/globals"
import { handleNotification } from "../../../utils/functions/notificationsUtils"
import { handleCompleteProfile } from "../../../API/User"
import { CurrencyIconCzech, CurrencyIconDollar, CurrencyIconEuro } from "../../../utils/icons/currency"
import { userAvatars } from "../../../utils/icons/avatars"


const steps = [
    { cs: "Jazyk", en: "Language"},
    { cs: "Měna", en: "Currency"},
    { cs: "Avatar", en: "Avatar"},
]

const NewUserStepper = () => {

    const [stage, setStage] = useState(0)
    const [data, setData] = useState({ lang: "", curr: "", avatarID: 0 })

    const handleDecStage = () => setStage( (prev) => prev - 1)
    const handleIncStage = () => {

        if(stage === 0 && data.lang === "") {
            handleNotification(NOTIF_ERROR, data.lang || LANG_ENGLISH, "Prosím vyberte jazyk", "Please select language")
            return
        }

        if(stage === 1 && data.curr === "") {
            handleNotification(NOTIF_ERROR, data.lang || LANG_ENGLISH, "Prosím vyberte měnu", "Please select currency")
            return
        }

        if(stage === 2 && data.avatarID === 0) {
            handleNotification(NOTIF_ERROR, data.lang || LANG_ENGLISH, "Prosím vyberte avatar", "Please select avatar")
            return
        }

        setStage( (prev) => prev + 1)
    }

  return (
    <Container sx={{ py: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>

      <Stack sx={{ width: "100%" }} spacing={4}>

        <Stepper
          alternativeLabel
          activeStep={stage}
        >
          {steps.map((label) => (
            <Step key={label.cs}>
              <StepLabel>
                {data.lang === LANG_CZECH ? label.cs : label.en}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

      </Stack>

      <Typography variant="h6" fontWeight={600} textAlign="center" my={6}>
        { stage === 0 && formatLang(data.lang, "Vyberte jazyk", "Select your language") }
        { stage === 1 && formatLang(data.lang, "Zvolte preferovanou měnu", "Select prefered currency") }
        { stage === 2 && formatLang(data.lang, "Vyberte si avatar", "Select your avatar") }
        { stage === 3 && formatLang(data.lang, "Potvrďte svůj email", "Confirm your email adress") }
      </Typography>

      { stage === 0 && (
        <div className="flex items-center justify-center gap-10 text-white h-[40%] flex-col xs:flex-row">

            <span 
                className={`${ data.lang === LANG_CZECH && "bg-colorMain" } py-4 px-6 rounded-full cursor-pointer border-2 border-colorMain transition-all duration-300 ease-out`} 
                onClick={ () => setData(prev => ({...prev, lang: LANG_CZECH}))}
            >
                <CzechFlag/>
                <p className="text-black mt-1">Čeština</p>
            </span>

            <span 
                className={`${ data.lang === LANG_ENGLISH && "bg-colorMain  " } py-4 px-6 rounded-full cursor-pointer border-2 border-colorMain transition-all duration-300 ease-out`} 
                onClick={ () => setData(prev => ({...prev, lang: LANG_ENGLISH}))}
            >
                <USFlag/>
                <p className="text-black mt-1">English</p>
            </span>

        </div>
      )}

        { stage === 1 && (
                <div className="flex items-center justify-center gap-10 text-white h-[40%] flex-col xs:flex-row">

                    <span 
                        className={`${ data.curr === CURR_CZECH && "bg-colorMain" } py-4 px-6 flex flex-col items-center justify-center rounded-full cursor-pointer border-2 border-colorMain transition-all duration-300 ease-out`}
                        onClick={ () => setData(prev => ({...prev, curr: CURR_CZECH}))}
                    >
                        <CurrencyIconCzech/>
                        <p className="text-black mt-1">CZK</p>
                    </span>

                    <span 
                        className={`${ data.curr === CURR_DOLLAR && "bg-colorMain" } py-4 px-6 flex flex-col items-center justify-center rounded-full cursor-pointer border-2 border-colorMain transition-all duration-300 ease-out`}
                        onClick={ () => setData(prev => ({...prev, curr: CURR_DOLLAR}))}
                    >
                        <CurrencyIconDollar/>
                        <p className="text-black mt-1">USD</p>
                    </span>

                    <span 
                        className={`${ data.curr === CURR_EURO && "bg-colorMain" } py-4 px-6 flex flex-col items-center justify-center rounded-full cursor-pointer border-2 border-colorMain transition-all duration-300 ease-out`}
                        onClick={ () => setData(prev => ({...prev, curr: CURR_EURO}))}
                    >
                        <CurrencyIconEuro/>
                        <p className="text-black mt-1">EUR</p>
                    </span>
                </div>
            )}

            { stage === 2 && (
                <div className="flex items-center justify-center flex-wrap gap-10 text-white h-[40%] w-[90%] mx-auto">

                    { userAvatars.map( (x) => {
                        return (
                            <div 
                                className={`${ data.avatarID === x.id && "ring-4 ring-colorMain rounded-full" } cursor-pointer w-[80px]`} 
                                key={x.id} 
                                onClick={ () => setData(prev => ({...prev, avatarID: x.id}))}
                            >
                                <img src={x.imageSrc} alt={x.title} className="" />
                            </div>
                        )
                    })}

                </div>
            )}

            <div className="my-10 flex items-center justify-center gap-10">
                
                <Button
                    disabled={(stage === 0 || stage === 3)}
                    onClick={handleDecStage}
                    variant="contained"
                >
                    {formatLang(data.lang, "Zpět", "Back")}
                </Button>

                <Button
                    onClick={ () => {
                        if(stage !== 2) handleIncStage()
                        if(stage === 2) {
                            handleCompleteProfile(data)
                            handleIncStage()
                        }
                    }}
                    variant="contained"
                    color="success"
                >
                    { stage === 2 && formatLang(data.lang, "Uložit", "Save") }
                    { stage !== 2 && formatLang(data.lang, "Další", "Next") }
                </Button>
                
            </div>




    </Container>
  );
};

export default NewUserStepper;
