import { useState } from "react"
import { IconCloseCircle, IconInfo } from "../../../utils/icons/icons"

interface SectionTitleProps {
    value: string
    wantInfo: boolean
    infoValue?: string
}

const SectionTitle = ({ value, wantInfo, infoValue } : SectionTitleProps ) => {

  const [seeMore, setSeeMore] = useState(false)

  const toggleSeeMore = () => setSeeMore(!seeMore)

  return (
    <div className="flex items-center gap-2 max-w-[100px] mb-10 relative">

      <h3 className="font-semibold">
        {value}
      </h3>

      { wantInfo && !seeMore && <IconInfo onClick={toggleSeeMore} className="cursor-pointer icon text-xl" /> }
      { wantInfo && seeMore && <IconCloseCircle onClick={toggleSeeMore} className="cursor-pointer icon text-xl" /> }

      { wantInfo && seeMore && 
        <div className="absolute top-full left-0 xs:left-full z-50 text-shadow-md bg-black text-white w-[200px] tracking-wide p-4 rounded-xl text-sm xs:text-base xs:w-[300px] sm:w-[400px]">
          {infoValue}
        </div>
      }
    </div>
  )
}

export default SectionTitle