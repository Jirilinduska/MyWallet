import { formatDistanceToNow } from "date-fns"
import { COLOR_BLUE, LANG_CZECH } from "../../../config/globals"
import { INotification } from "../../../context/NotifContext"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { IconClose } from "../../../utils/icons/icons"
import Button from "../../UI/Button/Button"
import NotifAfterRegister from "../NotifAfterRegister/NotifAfterRegister"
import { cs } from "date-fns/locale"
import NotifMonthlySummary from "../NotifMonthlySummary/NotifMonthlySummary"

interface NofitDetailsProps {
    data: INotification
    toggleDetails: () => void
}

const TYPE_REGISTER = "Registration"
const TYPE_MONTHLY_SUMMARY = "MonthlySummary"

const NofitDetails = ({ data, toggleDetails } : NofitDetailsProps ) => {

    const { userLangID } = useUserContext()

  return (
    <div className="fixed top-0 right-0 z-[60] flex justify-center items-center w-full sm:w-[90%] lg:w-[70%] xl:w-1/2 h-screen bg-black bg-opacity-60">

        <div className="bg-white w-full h-full shadow-2xl relative flex items-center justify-center">
            
            <IconClose onClick={toggleDetails} className="absolute top-3 right-3 text-4xl text-red-500 cursor-pointer"/>

            <div className="p-4 border-2 h-[90%] w-[90%] mx-auto rounded-xl">

                <div className="my-6 flex items-center justify-between flex-col-reverse gap-4 md:flex-row">
                    <h3 className="font-semibold text-sm sm:text-base">{formatLang(userLangID, data.titleCS, data.titleEN)}</h3>
                    <span className="text-xs text-gray-400">{formatDistanceToNow(data.createdAt, { addSuffix: true, locale: userLangID === LANG_CZECH ? cs : undefined })}</span>
                </div>

                { data.type === TYPE_REGISTER && <NotifAfterRegister messages={ userLangID == LANG_CZECH ? data.messageCS : data.messageEN }/> }

                { data.type === TYPE_MONTHLY_SUMMARY && <NotifMonthlySummary data={data} /> }

                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-1/3 flex items-center gap-2">
                    
                    <Button
                        color={COLOR_BLUE}
                        loading={false}
                        value={formatLang(userLangID, "Zavřít", "Close")}
                        handleClick={toggleDetails}
                        buttonType="button"
                    />
                </div>

            </div>


        </div>
    
    </div>
  )
}

export default NofitDetails