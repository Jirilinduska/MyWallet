import { ReactElement } from "react"
import { ICategoryIcon } from "../../../utils/interfaces/interfaces"

interface IAvatarIcon {
  icon: ReactElement
  iconData: ICategoryIcon
  handleClick: (id: number) => void
  selectedIcon: number
}

const AvatarIcon = ({ icon, handleClick, iconData, selectedIcon } : IAvatarIcon ) => {
  return (
    <div 
      onClick={ () => handleClick(iconData.id) } 
      className={`${ selectedIcon === iconData.id ? "ring-colorGreen" : "ring-black" } w-10 h-10 p-1 rounded-full ring-2  flex items-center justify-center text-black text-2xl cursor-pointer
      hover:bg-colorGreen hover:text-white transition-all duration-100 ease-in-out`}
    >
        { icon }
    </div>
  )
}


export default AvatarIcon