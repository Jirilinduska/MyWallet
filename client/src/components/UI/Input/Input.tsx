import { useState } from "react"
import { IconEyeHide, IconEyeShow } from "../../../utils/icons/icons"

// TODO - Umístit do souboru Interfaces
export interface IInput {
    labelFor: string
    labelValue: string | ""
    inputType: string
    placeholder: string
    inputName: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    isPassword?: boolean
    wantDarkText?: boolean
}

const Input: React.FC<IInput> = ({ labelFor, labelValue, inputType, placeholder, inputName, value, onChange, isPassword, wantDarkText }) => {

    const [showPass, setShowPass] = useState(false)

    if(isPassword) {
        return (
            <div className="relative mb-4">

                <label 
                    htmlFor={labelFor}
                    className={`${ wantDarkText ? "text-black" : "text-white" } block mb-2 text-sm font-medium`}
                >
                    {labelValue}
                </label>

                <input 
                    type={ showPass ? "text" : "password"} 
                    id={labelFor}
                    className="bg-gray-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-white focus:border-blue-500" 
                    name={inputName}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />

                <span className="absolute top-1/2 right-2 icon text-white" onClick={() => setShowPass(!showPass)}>
                    { showPass ? <IconEyeHide/> : <IconEyeShow/> }
                </span>

        </div>
        )
    }

  return (
    <div>

        { labelValue &&  (
            <label 
                htmlFor={labelFor} 
                className="block mb-2 text-sm font-medium text-white"
            >
                { labelValue }
            </label>
        )}

        <input 
            type={inputType} 
            id={labelFor} 
            className="bg-gray-600 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-white focus:border-blue-500" 
            placeholder={placeholder}
            name={inputName}
            value={value}
            onChange={onChange}
        />
    </div>
  )
}

export default Input