import { COLOR_BLUE, COLOR_GREEN, COLOR_RED } from "../../../config/globals"
import "./ButtonLoading.css"

interface ButtonProps {
  value: string
  buttonType?: "button" | "submit" | "reset"
  loading: boolean
  color: string
  handleClick?: () => void
  // disabled?: boolean
}

// TODO Nahradit všechny buttony!

const Button = ({ value, loading, color, handleClick, buttonType }: ButtonProps) => {

    const handleColor = () => {
      if (color === COLOR_BLUE) return "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
      if (color === COLOR_GREEN) return "bg-[#10b981] text-white hover:bg-[#0ea573] focus:ring-green-400"
      if (color === COLOR_RED) return "bg-red-600 text-white hover:bg-red-800 focus:ring-red-400";
    }
  
    return (
      <button 
        onClick={handleClick} 
        type={buttonType || "button"}
        className={`${handleColor()} border-none rounded-full text-xs xs:text-sm px-5 flex items-center justify-center text-center mr-2 w-full mb-2 transition duration-300 ease-in-out focus:outline-none focus:ring-4 cursor-pointer`}
        style={{ minHeight: "40px" }}
        // disabled={disabled}
      >
        {!loading && value}
  
        {loading && (
          <div className="flex items-center justify-center">
            <div className="spinner">
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
              <div className="spinner-blade"></div>
            </div>
          </div>
        )}
      </button>
    )
  }
  
  export default Button
  
