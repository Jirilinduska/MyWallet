import { Link, useParams } from "react-router-dom"
import { sidebarData } from "../../../utils/data/sidebar-dara"
import { IconHome, IconLogout, IconUser } from "../../../utils/icons/icons"
import { handleLogOut } from "../../../utils/functions/handleLogOut"
import { useUserContext } from "../../../context/UserContext"
import { useEffect } from "react"
import { LANG_CZECH } from "../../../config/globals"

// TODO Dokončit reponsivitu!

const Sidebar = () => {

    const { pageID } = useParams()
    const { refreshUserData, userLangID } = useUserContext()

    useEffect(() => {
        if(!userLangID) refreshUserData()
    }, [] )

  return (
    <div className="bg-black hidden fixed top-0 left-0 w-[80%] sm:block sm:w-[50%] md:w-[250px] h-full p-4">

        <h3 className="font-bold text-white mb-10">Navigator</h3>

        <div className="flex flex-col justify-between h-[90%]">

            {/* Navigation */}
            <div className="">
                { sidebarData.map( x => (
                    <Link 
                        to={x.path}
                        className={
                            `${ pageID === x.titleEN.toLowerCase() ? "bg-white text-black" : "bg-black text-white"  } 
                            flex items-center gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out hover:bg-colorGrayHover hover:text-black`
                        }
                        key={x.id}
                    >
                        <span className="text-lg md:text-xl">{x.icon}</span>
                        <span className="text-base">{ userLangID === LANG_CZECH ? x.titleCS : x.titleEN }</span>
                    </Link>
                ))}
            </div>

            <div className="">

                <Link to="/" className="flex items-center gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out text-white hover:bg-colorGrayHover hover:text-black">
                    <IconHome/>
                    <span className="">{ userLangID === LANG_CZECH ? "Domů" : "Home" }</span>
                </Link>

                <Link to="/profile" className="flex items-center gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out text-white hover:bg-colorGrayHover hover:text-black">
                    <IconUser/>
                    <span className="">{ userLangID === LANG_CZECH ? "Profil" : "Profile" }</span>
                </Link>

                <button onClick={handleLogOut} className="flex items-center w-full gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out text-white hover:bg-colorGrayHover hover:text-black">
                    <IconLogout/>
                    <span className="">{ userLangID === LANG_CZECH ? "Odhlásit" : "Logout" }</span>
                </button>

            </div>


        </div>

    </div>
  )
}

export default Sidebar