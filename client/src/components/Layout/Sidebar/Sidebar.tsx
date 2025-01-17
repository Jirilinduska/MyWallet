import { Link, useLocation, useParams } from "react-router-dom"
import { sidebarData } from "../../../utils/data/sidebar-dara"
import { IconHome, IconLogout, IconNotification, IconUser } from "../../../utils/icons/icons"
import { useUserContext } from "../../../context/UserContext"
import { handleLogoutUser } from "../../../API/Auth"
import { useUtilsContext } from "../../../context/UtilsContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { useNotifContext } from "../../../context/NotifContext"

const Sidebar = () => {

    const { pageID } = useParams()
    const { userLangID } = useUserContext()
    const { showNav, hideNav } = useUtilsContext()
    const { findUnreadNotifs } = useNotifContext()
    const location = useLocation()

    const numberOfUnread = findUnreadNotifs()

  return (
    <div className={`
        ${showNav ? "left-0" : "-left-full"}
        bg-black fixed top-0 z-50 h-full p-4 transition-all duration-300 ease-in-out 
        lg:left-0 lg:fixed lg:w-[250px]
        w-[70%] xs:w-[60%] sm:w-[250px] md:w-[250px]
    `}>
        <h3 className="font-bold text-white mb-4 xs:mb-10">Navigator</h3>

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
                        <span className="text-sm xs:text-base">{formatLang(userLangID, x.titleCS, x.titleEN)}</span>
                    </Link>
                ))}
            </div>

            <div className="">

                {/* Domů */}
                <Link 
                    to="/" 
                    onClick={hideNav} 
                    className={`${ location.pathname === "/" ? "bg-white text-black" : "bg-black text-white"} flex items-center gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out hover:bg-colorGrayHover hover:text-black`}
                >
                    <IconHome/>
                    <span className="text-sm xs:text-base">{formatLang(userLangID, "Domů", "Home")}</span>
                </Link>

                {/* Profil */}
                <Link 
                    to="/profile" 
                    onClick={hideNav} 
                    className={`${ location.pathname === "/profile" ? "bg-white text-black" : "bg-black text-white"} flex items-center gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out hover:bg-colorGrayHover hover:text-black`}
                >
                    <IconUser/>
                    <span className="text-sm xs:text-base">{formatLang(userLangID, "Profil", "Profile")}</span>
                </Link>

                {/* Notifikace */}
                <Link 
                    to="/notifications" 
                    onClick={hideNav} 
                    className={`${ location.pathname === "/notifications" ? "bg-white text-black" : "bg-black text-white"} flex relative items-center gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out hover:bg-colorGrayHover hover:text-black`}
                >
                    <IconNotification className={`${numberOfUnread > 0 ? "text-red-500 animate__animated animate__bounce animate__infinite" : ""}`}/>
                    <span className="text-sm xs:text-base">{formatLang(userLangID, "Notifikace", "Notifications")}</span>
                </Link>

                {/* Logout */}
                <button onClick={handleLogoutUser} className="flex items-center w-full gap-4 cursor-pointer p-2 rounded-full mb-4 transition-all duration-300 ease-in-out text-white hover:bg-colorGrayHover hover:text-black">
                    <IconLogout/>
                    <span className="text-sm xs:text-base">{formatLang(userLangID, "Odhlásit se", "Logout")}</span>
                </button>

            </div>


        </div>

    </div>
  )
}

export default Sidebar