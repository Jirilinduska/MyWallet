import { userAvatars } from "../../../utils/icons/avatars"
import { IAvatars } from "../../../utils/interfaces/interfaces"

const Avatars: React.FC<IAvatars> = ({ showAvatars, setIsEdited, setUserInfo, setShowAvatars }) => {
  return (
    <div className={`${ showAvatars ? "right-0" : "-right-full" } fixed top-0 w-[250px] h-screen flex flex-col items-center justify-center gap-4 transition-all bg-white shadow-xl duration-300 ease-in-out`}>

            <h3 className="">Select avatar</h3>
        
        { userAvatars && userAvatars.map( (x) => {
            return (
                <div 
                    className="cursor-pointer w-[70px]" 
                    key={x.id} 
                    onClick={ () => {
                        setUserInfo((prev) => ({...prev, avatarID: x.id}))
                        setIsEdited(true)
                        setShowAvatars(false)
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