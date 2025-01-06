import { Link } from "react-router-dom"

interface SpeedDialItemProps {
    isLink: boolean
    linkPath: string | ""
    handleClick?: () => void
    icon: React.ReactElement
    value: string
}

const SpeedDialItem = ({ isLink, handleClick, linkPath, icon, value } : SpeedDialItemProps ) => {

    if(isLink) {
        return (
            <Link to={linkPath} className="relative bg-gray-400 p-2 rounded-full">
                { icon }
                <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-gray-700 text-white text-sm rounded px-2 py-1 w-[150px] text-center">
                    { value }
                </span>
            </Link>
        )
    }

    return (
        <button onClick={handleClick} className="relative bg-gray-400 p-2 rounded-full">
            { icon }
            <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-gray-700 text-white text-sm rounded px-2 py-1 w-[150px] text-center">
                { value }
            </span>
      </button>
    )
}

export default SpeedDialItem