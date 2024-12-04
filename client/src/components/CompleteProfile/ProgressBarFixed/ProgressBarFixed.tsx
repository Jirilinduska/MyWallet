import React from 'react'
import { CzechFlag, USFlag } from '../../../utils/icons/flags'
import { CurrencyIconCzech, CurrencyIconDollar, CurrencyIconEuro } from '../../../utils/icons/currency'
import { userAvatars } from '../../../utils/icons/avatars'
import { IconMail } from '../../../utils/icons/icons'
import { CURR_CZECH, CURR_DOLLAR, CURR_EURO, LANG_CZECH, LANG_ENGLISH } from '../../../config/globals'

export interface IProgressBarFixed {
    data: {
        lang: string, 
        curr: string, 
        avatarID: number
    }
}

const ProgressBarFixed: React.FC<IProgressBarFixed> = ({ data }) => {

  return (
    <div className="fixed top-0 left-0 w-[100px] p-6 flex flex-col items-center">

        <h3 className="font-bold mb-1">Language</h3>

        {/* Language */}
        <div className={`${data.lang ? "bg-colorGreenHover" : "bg-colorGray"} w-[80px] h-[80px] bg-colorGray rounded-full flex items-center justify-center transition-all duration-300 ease-out`}>
            { data.lang === LANG_CZECH && <CzechFlag/> }
            { data.lang === LANG_ENGLISH && <USFlag/> }
        </div>

        {/* Bar */}
        <div className={`${data.lang ? "bg-colorGreenHover" : "bg-colorGray"} w-[5px] h-[50px] my-6 transition-all duration-300 ease-out`}></div>

        <h3 className="font-bold mb-1">Currency</h3>

        {/* Currency */}
        <div className={`${data.curr ? "bg-colorGreenHover" : "bg-colorGray"} w-[80px] h-[80px] bg-colorGray rounded-full flex items-center justify-center`}>
            { data.curr === CURR_CZECH && <CurrencyIconCzech/> }
            { data.curr === CURR_DOLLAR && <CurrencyIconDollar/> }
            { data.curr === CURR_EURO && <CurrencyIconEuro/> }
        </div>

        {/* Bar */}
        <div className={`${data.curr ? "bg-colorGreenHover" : "bg-colorGray"} w-[5px] h-[50px] my-6 transition-all duration-300 ease-out`}></div>

        <h3 className="font-bold mb-1">Avatar</h3>

        {/* Avarar */}
        <div className={`${data.avatarID ? "bg-colorGreenHover" : "bg-colorGray"} w-[80px] h-[80px] bg-colorGray rounded-full flex items-center justify-center transition-all duration-300 ease-out`}>
            {userAvatars.map((x) => 
                x.id === data.avatarID 
                    ? ( <img src={x.imageSrc} alt={x.title} className="" /> ) : null
            )}
        </div>

        {/* Bar */}
        <div className={`${data.avatarID ? "bg-colorGreenHover" : "bg-colorGray"} w-[5px] h-[50px] my-6 transition-all duration-300 ease-out`}></div>

        <h3 className="font-bold mb-1">Confirm</h3>

        <div className="w-[80px] h-[80px] bg-colorGray rounded-full flex items-center justify-center transition-all duration-300 ease-out">
            <IconMail/>
        </div>

    </div>
  )
}

export default ProgressBarFixed