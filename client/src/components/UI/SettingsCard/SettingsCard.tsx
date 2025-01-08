import { ChangeEvent } from "react"
import { IUserDataUpdate } from "../../../utils/interfaces/interfaces"
import SelectCurrency from "../SelectCurrency/SelectCurrency"
import SelectLanguage from "../SelectLanguage/SelectLanguage"

interface SettingsCartProps {
    userInfo: IUserDataUpdate
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const SettingsCard = ({ userInfo, handleInputChange } : SettingsCartProps) => {
  return (
    < div className="p-4 w-full lg:w-1/2">

        <div className="px-6 mb-4 flex flex-col gap-6">

            <SelectLanguage
                value={userInfo.language}
                handleChange={handleInputChange}  
            />

            <SelectCurrency
                value={userInfo.currency}
                handleChange={handleInputChange}
            />

        </div>

    </div>
  )
}

export default SettingsCard