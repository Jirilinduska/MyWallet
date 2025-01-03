import { IconClose } from '../../../../utils/icons/icons'
import { COLOR_BLUE, COLOR_RED } from '../../../../config/globals'
import Button from '../../../../better_components/Common/Button/Button'


interface AreYouSureModalProps {
    handleYes: () => void
    handleNo: () => void
    titleValue: string
    buttonYesValue: string
    buttonNoValue: string
}

const AreYouSureModal = ({ handleNo, handleYes, titleValue, buttonNoValue, buttonYesValue } : AreYouSureModalProps) => {

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-60">

        <div className="relative p-4 w-full max-w-md max-h-full">

            <div className="relative rounded-lg shadow bg-gray-700">


                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white">{titleValue}</h3>
                    <IconClose onClick={handleNo} className="icon"/>
                </div>

                <div className="flex items-center justify-center h-[100px] p-4">
                    <Button value={buttonYesValue} color={COLOR_RED} loading={false} handleClick={handleYes} />
                    <Button value={buttonNoValue} color={COLOR_BLUE} loading={false} handleClick={handleNo}/>
                </div>

            </div>

        </div>

    </div>
  )
}

export default AreYouSureModal