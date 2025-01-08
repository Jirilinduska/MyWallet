import { userAvatars } from "../../../utils/icons/avatars"
import { IconClose } from "../../../utils/icons/icons"
import { IUserDataUpdate } from "../../../utils/interfaces/interfaces"

interface IAvatarsProps {
    showAvatars: boolean
    setUserInfo: React.Dispatch<React.SetStateAction<IUserDataUpdate>>
    setIsEdited: (state: boolean) => void
    toggleAvatars: () => void
}


const Avatars: React.FC<IAvatarsProps> = ({ showAvatars, setIsEdited, setUserInfo, toggleAvatars }) => {
  return (
    <div className={`${ showAvatars ? "right-0" : "-right-full" } fixed top-0 w-[250px] z-[60] bg-black h-screen flex flex-col items-center justify-center gap-4 transition-all shadow-xl duration-300 ease-in-out`}>

        <h3 className="text-white mb-4">Select avatar</h3>

        <IconClose onClick={toggleAvatars} className="icon absolute top-3 right-3 text-4xl text-red-500"/>
        
        { userAvatars && userAvatars.map( (x) => {
            return (
                <div 
                    className="cursor-pointer w-[70px]" 
                    key={x.id} 
                    onClick={ () => {
                        setUserInfo((prev) => ({...prev, avatarID: x.id}))
                        setIsEdited(true)
                        toggleAvatars()
                    }}
                >
                    <img src={x.imageSrc} alt={x.title} className="" />
                </div>
            )
        })}
    </div>
  )
}

export default Avatars