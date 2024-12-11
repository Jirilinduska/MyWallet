import React, { useEffect } from 'react'
import { IconClose } from '../../../../utils/icons/icons'
import { useUserContext } from '../../../../context/UserContext'
import { LANG_CZECH } from '../../../../config/globals'
import Button from '../../Button/Button'
import { formatLang } from '../../../../utils/functions/formatLang'


export interface IAreYouSureModal {
    handleYes: () => void
    handleNo: () => void
    textEN: string
    textCS: string
}

const AreYouSureModal = ({ handleNo, handleYes, textCS, textEN } : IAreYouSureModal) => {

    const { refreshUserData, userLangID } = useUserContext()

    useEffect(() => {
        if(!userLangID) refreshUserData()
    }, [] )

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-60">

        <div className="relative p-4 w-full max-w-md max-h-full">

            <div className="relative rounded-lg shadow bg-gray-700">


                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white">{ userLangID === LANG_CZECH ? textCS : textEN }</h3>
                    <IconClose onClick={handleNo} className="icon"/>
                </div>

                <div className="flex items-center justify-center h-[100px]">

                    <Button buttonValue={formatLang(userLangID, "Smazat", "Delete")} className='button-blue bg-red-500 hover:bg-red-600' handleClick={handleYes}/>
                    <Button buttonValue={formatLang(userLangID, "Zrušit", "Cancel")} className='button-blue' handleClick={handleNo}/>

                </div>

            </div>

        </div>

    </div>
  )
}

export default AreYouSureModal