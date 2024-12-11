
// TODO - Umístit do souboru Interfaces
export interface IInput {
    labelFor: string
    labelValue: string | ""
    inputType: string
    placeholder: string
    inputName: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<IInput> = ({ labelFor, labelValue, inputType, placeholder, inputName, value, onChange }) => {
  return (
    <div>

        { labelValue &&  (
            <label 
                htmlFor={labelFor} 
                className="block mb-2 text-sm font-medium dark:text-white"
            >
                { labelValue }
            </label>
        )}

        {/* <label 
            htmlFor={labelFor} 
            className="block mb-2 text-sm font-medium dark:text-white"
        >
            { labelValue }
        </label> */}

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