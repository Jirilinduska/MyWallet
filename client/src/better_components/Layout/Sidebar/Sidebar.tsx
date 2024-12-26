import { Link, useParams } from "react-router-dom"
import { sidebarData } from "../../../utils/data/sidebar-dara"
import { IconHome, IconLogout, IconUser } from "../../../utils/icons/icons"
import { useUserContext } from "../../../context/UserContext"
import { LANG_CZECH } from "../../../config/globals"
import { handleLogoutUser } from "../../../API/Auth"
import { useUtilsContext } from "../../../context/UtilsContext"

const Sidebar = () => {

    const { pageID } = useParams()
    const { userLangID } = useUserContext()
    const { showNav, hideNav } = useUtilsContext()

  return (
    <div className={`
        ${showNav ? "left-0" : "-left-full"}  // Pro mobilní zařízení
        bg-black fixed top-0 z-50 h-full p-4 transition-all duration-300 ease-in-out 
        lg:left-0 lg:fixed lg:w-[250px]  // Od lg výše bude panel vždy zobrazený a fixní
        sm:w-[50%] md:w-[250px] // Responsivní šířka pro mobilní zařízení
    `}>
        <h3 className="font-bold text-white mb-10">Navigator</h3>

        <div className="flex flex-col justify-between h-[90%]">

            {/* Navigation */}
            <div className="">
                { sidebarData.map( x => (
                    <Link 
                        to={x.path}
                        onClick={hideNav}
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

                <Link to="/" onClick={hideNav} className="flex items-center gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out text-white hover:bg-colorGrayHover hover:text-black">
                    <IconHome/>
                    <span className="">{ userLangID === LANG_CZECH ? "Domů" : "Home" }</span>
                </Link>

                <Link to="/profile" onClick={hideNav} className="flex items-center gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out text-white hover:bg-colorGrayHover hover:text-black">
                    <IconUser/>
                    <span className="">{ userLangID === LANG_CZECH ? "Profil" : "Profile" }</span>
                </Link>

                <button onClick={handleLogoutUser} className="flex items-center w-full gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out text-white hover:bg-colorGrayHover hover:text-black">
                    <IconLogout/>
                    <span className="">{ userLangID === LANG_CZECH ? "Odhlásit" : "Logout" }</span>
                </button>

            </div>


        </div>

    </div>
  )
}

export default Sidebar