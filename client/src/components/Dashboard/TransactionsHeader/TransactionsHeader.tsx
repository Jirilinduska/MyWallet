import { useEffect } from "react"
import { useUserContext } from "../../../context/UserContext"
import PieGraph from "../../Graphs/PieGraph/PieGraph"
import Tabs from "../../UI/Tabs/Tabs"
import { IGraphBreakdownData } from "../../../utils/interfaces/interfaces"
import { COLOR_INFOITEM_WHITE, SHOW_CATEGORIES, SHOW_TABLE, SIZE_MEDIUM, SIZE_SMALL } from "../../../config/globals"
import TableHeaderSortable from "../../UI/Tables/TableHeaderSortable/TableHeaderSortable"
import { formatLang } from "../../../utils/functions/formatLang"
import InfoItem from "../../UI/InfoItem/InfoItem"
import { IconExpense } from "../../../utils/icons/icons"


interface TransactionsHeaderProps {
    wantSee: string
    toggleWantSee: (id: string) => void
    pageID: string
    graphData: IGraphBreakdownData[]
}

const TransactionsHeader = ({ wantSee, toggleWantSee, pageID, graphData } : TransactionsHeaderProps ) => {

    const { refreshUserData, userLangID } = useUserContext()

    const handleSort = () => {}

    useEffect(() => {
        if(!userLangID) refreshUserData()
    }, [])

  return (
    // <div className="h-[350px]">
    <div className="">


        <Tabs toggleWantSee={toggleWantSee} wantSee={wantSee}/>


        <div className="flex items-center justify-between">

            { wantSee === SHOW_TABLE &&  (
                <>
                    <PieGraph langID={userLangID} pageID={pageID} graphData={graphData}/>
                    <h3 className="">3000kč</h3>
                </>
            )}

            { wantSee === SHOW_CATEGORIES && (
                <div className="flex flex-wrap gap-2">

                    { graphData.map( (x) => {

                        // TODO const icon = ikonka kategorie!

                        return(
                            <InfoItem
                                amount={x.totalAmount}
                                color={COLOR_INFOITEM_WHITE}
                                desc={x.category}
                                icon={<IconExpense/>}
                                plannedAmount={null} // TODO - přidat kolik bylo naplanovano pro dany mesic pro danou kategorii
                            />
                        )
                    })}
                </div>
            )}  

        </div>

        <div className="">
                {/* // TODO - Výpis kategorii (graphData) */}
        </div>

    </div>
  )
}

export default TransactionsHeader